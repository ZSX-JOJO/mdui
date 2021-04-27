import { PlainObject } from '@mdui/shared/helpers.js';
import $ from '../$.js';
import { JQ } from '../shared/core.js';
import { parse } from '../shared/event.js';
import './each.js';

declare module '../shared/core.js' {
  interface JQ {
    /**
     * 触发指定的事件
     * @param type 事件名
     * @param extraParameters 传给事件处理函数的额外参数
     * @example ````触发 .box 元素上的 click 事件
```js
$('.box').trigger('click');
```
     * @example ````触发 .box 元素上的 click 事件，并给事件处理函数传入额外参数
```js
$('.box').trigger('click', {key1: 'value1', key2: 'value2'});
```
     */
    trigger(
      type: string,
      extraParameters?: unknown[] | PlainObject | string | number | boolean,
    ): this;
  }
}

// eslint-disable-next-line
$.fn.trigger = function (this: JQ, type: string, extraParameters: any): JQ {
  type EventParams = {
    // eslint-disable-next-line
    detail?: any;
    bubbles: boolean;
    cancelable: boolean;
  };

  const event = parse(type);
  let eventObject: MouseEvent | CustomEvent;
  const eventParams: EventParams = {
    bubbles: true,
    cancelable: true,
  };
  const isMouseEvent = ['click', 'mousedown', 'mouseup', 'mousemove'].includes(
    event.type,
  );

  if (isMouseEvent) {
    // Note: MouseEvent 无法传入 detail 参数
    eventObject = new MouseEvent(event.type, eventParams);
  } else {
    eventParams.detail = extraParameters;
    eventObject = new CustomEvent(event.type, eventParams);
  }

  // @ts-ignore
  eventObject._detail = extraParameters;

  // @ts-ignore
  eventObject._ns = event.ns;

  return this.each((_, element) => {
    element.dispatchEvent(eventObject);
  });
};
