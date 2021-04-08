import {
  PlainObject,
  isUndefined,
  isObjectLike,
  toCamelCase,
  eachObject,
} from '../shared/core.js';
import { weakMap } from '../shared/data.js';

/**
 * 获取指定元素上的所有数据
 * @param element
 */
const getDataInElement = (element: Element | Document | Window) => {
  return weakMap.get(element) ?? {};
};

/**
 * 在元素上设置键值对数据
 * @param element
 * @param object
 */
const setObjectToElement = (
  element: Element | Document | Window,
  object: PlainObject,
): void => {
  const data = getDataInElement(element);

  eachObject(object, (key: string, value) => {
    data[toCamelCase(key)] = value;
  });

  weakMap.set(element, data);
};

/**
 * `value` 为 `undefined` 时，相当于 `data(element, key)`，即获取指定元素上存储的数据
 *
 * Note: 该方法不检索 `data-*` 属性
 *
 * @param element 用于存储数据的元素
 * @param key 数据键名
 * @param value `undefined`
 * @example
```js
data(document.body, 'type', undefined)
```
 */
function data(
  element: Element | Document | Window,
  key: string,
  value: undefined,
): any;

/**
 * 在指定元素上存储数据，返回存储的值。
 * @param element 用于存储数据的元素
 * @param key 数据键名
 * @param value 数据值
 * @example
```js
data(document.body, 'type', 'image')
// 'image'
```
 */
function data<T>(
  element: Element | Document | Window,
  key: string,
  value: T,
): T;

/**
 * 获取在指定元素上存储的数据
 *
 * Note: 该方法不检索 `data-*` 属性
 *
 * @param element 用于存储数据的元素
 * @param key 数据键名
 * @example
```js
data(document.body, 'key')
```
 */
function data(element: Element | Document | Window, key: string): any;

/**
 * 获取指定元素上存储的所有数据
 *
 * Note: 该方法不检索 `data-*` 属性
 *
 * @param element 用于存储数据的元素
 * @example
```js
data(document.body)
// { 'type': 'image', 'width': 1020, 'height': 680 }
```
 */
function data(element: Element | Document | Window): PlainObject;

/**
 * 在指定元素上存储数据，返回存储的键值对数据
 * @param element 用于存储数据的元素
 * @param data 键值对数据
 * @example
```js
data(document.body, { 'width': 1020, 'height': 680 })
// { 'width': 1020, 'height': 680 }
```
 */
function data<T extends PlainObject>(
  element: Element | Document | Window,
  data: T,
): T;

function data(
  element: Element | Document | Window,
  key?: string | PlainObject,
  value?: any,
): any {
  // 根据键值对设置值
  // data(element, { 'key' : 'value' })
  if (isObjectLike(key)) {
    setObjectToElement(element, key);
    return key;
  }

  // 根据 key、value 设置值
  // data(element, 'key', 'value')
  if (!isUndefined(value)) {
    setObjectToElement(element, { [key as string]: value });
    return value;
  }

  const data = getDataInElement(element);

  // 获取所有值
  // data(element)
  if (isUndefined(key)) {
    return data;
  }

  // 获取指定值
  // data(element, 'key')
  key = toCamelCase(key);

  if (key in data) {
    return data[key];
  }

  return undefined;
}

export default data;
