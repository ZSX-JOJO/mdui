import fs from 'node:fs';
import path from 'node:path';

/**
 * 从 @material-design-icons/svg 项目中生成图标的 Web Components 文件
 *
 * 生成的文件位于 packages/icons/src 目录中，每个图标一个文件
 */

// 组件内部用到的图标，统一写入 @mdui/shared/src/icons 中
const toSharedIcons = [
  'check-box-outline-blank',
  'check-box',
  'indeterminate-check-box',
  'check',
  'clear',
  'arrow-right',
  'radio-button-unchecked',
  'circle',
  'error',
  'cancel--outlined',
  'visibility-off',
  'visibility',
];

// 字符串转驼峰，且首字母大写
const toCamelCase = (string) => {
  return string
    .replace(/^\S/, (s) => s.toUpperCase())
    .replace(/[-_]([a-z])/g, (_, letter) => letter.toUpperCase());
};

// 字符串转 - 分隔
const toKebabCase = (string) => {
  return string.replace(/_/g, '-');
};

// 原始 svg 文件（目录名 => 路径）的映射
const folders = ['filled', 'outlined', 'round', 'sharp', 'two-tone'];
const dirMap = new Map(
  folders.map((folder) => [
    folder === 'round' ? 'rounded' : folder,
    `./node_modules/@material-design-icons/svg/${folder}`,
  ]),
);

// 图标组件模板
// language=TypeScript
const template = `import { LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { style } from '@mdui/shared/icons/shared/style.js';
import { svgTag } from '@mdui/shared/icons/shared/svg-tag.js';
import type { TemplateResult, CSSResultGroup } from 'lit';

@customElement('TemplateTagName')
export class TemplateClassName extends LitElement {
  public static override styles: CSSResultGroup = style;

  protected override render(): TemplateResult {
    return svgTag(
      'TemplateSvgContent'
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'TemplateTagName': TemplateClassName;
  }
}
`;

// 用于在 @mdui/icons 包中引用 @mdui/shared 中的图标
// language=TypeScript
const templateRef = `export * from '@mdui/shared/icons/TemplateFilename.js';
`;

dirMap.forEach((dir, folder) => {
  const arr = fs.readdirSync(dir);

  arr.forEach((svgFilename) => {
    const filePath = path.join(dir, svgFilename);

    // 文件名，不含后缀
    const filenamePrefix = svgFilename.split('.')[0];

    // 类名: Icon + 文件名(驼峰) + _目录名(驼峰)
    const TemplateClassName = `Icon${toCamelCase(filenamePrefix)}${
      folder === 'filled' ? '' : `_${toCamelCase(folder)}`
    }`;

    // 组件文件名: 文件名(-) + --目录名(下划线；如果是 filled，则不含目录名)
    const componentFilename = `${toKebabCase(filenamePrefix)}${
      folder === 'filled' ? '' : `--${toKebabCase(folder)}`
    }`;

    // 读取 svg 文件中的 path 部分
    const [, svgContent] = fs
      .readFileSync(filePath)
      .toString()
      .match(/<svg.*?>([\s\S]*?)<\/svg>/);

    // 写入 packages/icons/src 中的文件
    const componentContent = template
      .replace(/TemplateClassName/g, TemplateClassName)
      .replace(/TemplateTagName/g, `mdui-icon-${componentFilename}`)
      .replace(/TemplateSvgContent/g, svgContent);

    // 公共图标，写到 @mdui/shared 中
    if (toSharedIcons.includes(componentFilename)) {
      fs.writeFileSync(
        `./packages/shared/src/icons/${componentFilename}.ts`,
        componentContent.replace(/\@mdui\/shared\/icons\//g, './'),
      );
      fs.writeFileSync(
        `./packages/icons/src/${componentFilename}.ts`,
        templateRef.replace(/TemplateFilename/g, componentFilename),
      );
    }
    // 非公共图标，写道 @mdui/icons 中
    else {
      fs.writeFileSync(
        `./packages/icons/src/${componentFilename}.ts`,
        componentContent,
      );
    }
  });
});
