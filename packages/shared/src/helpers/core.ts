/**
 * 键名为字符串的对象
 */
export type PlainObject<T = unknown> = {
  [key: string]: T;
};

/**
 * HTML 字符串类型
 */
export type HTMLString = string;

/**
 * CSS 选择器类型
 */
export type Selector = string;

/**
 * 一个类型、或该类型组成的数组
 */
export type TypeOrArray<T> = T | ArrayLike<T>;

export const isNodeName = (element: Element, name: string): boolean => {
  return element.nodeName.toLowerCase() === name.toLowerCase();
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const isFunction = (target: unknown): target is Function => {
  return typeof target === 'function';
};

export const isString = (target: unknown): target is string => {
  return typeof target === 'string';
};

export const isNumber = (target: unknown): target is number => {
  return typeof target === 'number';
};

export const isBoolean = (target: unknown): target is boolean => {
  return typeof target === 'boolean';
};

export const isUndefined = (target: unknown): target is undefined => {
  return typeof target === 'undefined';
};

export const isNull = (target: unknown): target is null => {
  return target === null;
};

export const isWindow = (target: unknown): target is Window => {
  return target instanceof Window;
};

export const isDocument = (target: unknown): target is Document => {
  return target instanceof Document;
};

export const isElement = (target: unknown): target is Element => {
  return target instanceof Element;
};

export const isNode = (target: unknown): target is Node => {
  return target instanceof Node;
};

export const isArrayLike = (target: unknown): target is ArrayLike<unknown> => {
  return (
    !isFunction(target) &&
    !isWindow(target) &&
    isNumber((target as ArrayLike<unknown>).length)
  );
};

export const isObjectLike = (
  target: unknown,
): target is Record<string, unknown> => {
  return typeof target === 'object' && target !== null;
};

export const toElement = (target: Element | Document): Element => {
  return isDocument(target) ? target.documentElement : target;
};

/**
 * 把用 - 分隔的字符串转为驼峰（如 box-sizing 转换为 boxSizing）
 * @param string
 */
export const toCamelCase = (string: string): string => {
  return string.replace(/-([a-z])/g, (_, letter: string) => {
    return letter.toUpperCase();
  });
};

/**
 * 把驼峰法转为用 - 分隔的字符串（如 boxSizing 转换为 box-sizing）
 * @param string
 */
export const toKebabCase = (string: string): string => {
  return string.replace(/[A-Z]/g, (replacer) => {
    return '-' + replacer.toLowerCase();
  });
};

/**
 * 始终返回 false 的函数
 */
export const returnFalse = (): boolean => {
  return false;
};

/**
 * 遍历数组
 * @param target
 * @param callback
 */
export const eachArray = <T>(
  target: ArrayLike<T>,
  callback: (this: T, value: T, index: number) => unknown,
): ArrayLike<T> => {
  for (let i = 0; i < target.length; i += 1) {
    if (callback.call(target[i], target[i], i) === false) {
      return target;
    }
  }

  return target;
};

/**
 * 遍历对象
 * @param target
 * @param callback
 */
export const eachObject = <T extends PlainObject, K extends keyof T>(
  target: T,
  callback: (this: T[K], key: K, value: T[K]) => unknown | void,
): T => {
  const keys = Object.keys(target) as K[];

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];

    if (callback.call(target[key], key, target[key]) === false) {
      return target;
    }
  }

  return target;
};
