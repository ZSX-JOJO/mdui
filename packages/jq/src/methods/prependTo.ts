import { HTMLString, Selector, TypeOrArray } from '@mdui/shared/helpers.js';
import './appendTo.js';

declare module '../shared/core.js' {
  interface JQ {
    /**
     * 把当前元素追加到指定元素内部的前面
     * @param target CSS 选择器、HTML 字符串、DOM 元素、DOM 元素数组、或 JQ 对象
     * @returns 由新插入的元素组成的集合
     * @example
```js
$('<p>Hello</p>').prependTo('<p>I would like to say: </p>')
// <p><p>Hello</p>I would like to say: </p>
```
     */
    prependTo(target: Selector | HTMLString | TypeOrArray<Element> | JQ): this;
  }
}
