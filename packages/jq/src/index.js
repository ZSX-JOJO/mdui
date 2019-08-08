import $ from './$';

import './methods/add';
import './methods/addClass';
import './methods/after';
import './methods/ajaxComplete';
import './methods/ajaxError';
import './methods/ajaxStart';
import './methods/ajaxSuccess';
import './methods/append';
import './methods/appendTo';
import './methods/attr';
import './methods/before';
import './methods/children';
import './methods/clone';
import './methods/closest';
import './methods/css';
import './methods/data';
import './methods/each';
import './methods/empty';
import './methods/eq';
import './methods/filter';
import './methods/find';
import './methods/first';
import './methods/get';
import './methods/has';
import './methods/hasClass';
import './methods/height';
import './methods/hide';
import './methods/html';
import './methods/index';
import './methods/innerHeight';
import './methods/innerWidth';
import './methods/insertAfter';
import './methods/insertBefore';
import './methods/is';
import './methods/last';
import './methods/map';
import './methods/next';
import './methods/nextAll';
import './methods/nextUntil';
import './methods/not';
import './methods/off';
import './methods/offset';
import './methods/offsetParent';
import './methods/on';
import './methods/one';
import './methods/parent';
import './methods/parents';
import './methods/parentUntil';
import './methods/position';
import './methods/prepend';
import './methods/prependTo';
import './methods/prev';
import './methods/prevAll';
import './methods/prevUntil';
import './methods/prop';
import './methods/remove';
import './methods/removeAttr';
import './methods/removeClass';
import './methods/removeData';
import './methods/removeProp';
import './methods/replaceAll';
import './methods/replaceWith';
import './methods/serialize';
import './methods/serializeArray';
import './methods/show';
import './methods/siblings';
import './methods/slice';
import './methods/text';
import './methods/toggle';
import './methods/toggleClass';
import './methods/trigger';
import './methods/val';
import './methods/width';

import ajax from './functions/ajax';
import ajaxSetup from './functions/ajaxSetup';
import contains from './functions/contains';
import data from './functions/data';
import each from './functions/each';
import map from './functions/map';
import merge from './functions/merge';
import param from './functions/param';
import removeData from './functions/removeData';
import unique from './functions/unique';

$.extend({
  ajax,
  ajaxSetup,
  contains,
  data,
  each,
  map,
  merge,
  param,
  removeData,
  unique,
});

export default $;
