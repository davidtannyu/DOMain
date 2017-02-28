const DOMNodeCollection = require("./dom_node_collection");

const _loadedCallbacks = [];
let contentLoaded = false;

const _loadCallbacks = () => {
  contentLoaded = true;
  _loadedCallbacks.forEach((callback) => {
    callback();
  });
};
document.addEventListener("DOMContentLoaded", _loadCallbacks);

window.$l = (selector) => {
  if (selector instanceof HTMLElement) {
    return new DOMNodeCollection([selector]);
  } else if (typeof selector === "string") {
    let nodeList = document.querySelectorAll(selector);
    return new DOMNodeCollection(Array.from(nodeList));
  } else if (typeof selector === "function") {
    let tmp = contentLoaded ? selector() : _loadedCallbacks.push(selector);
  }
};

$l.extend =  function(target, ...sources) {
  return Object.assign(target, ...sources);
};

const defaults = {
  success: () => {},
  error: () => {},
  url: "",
  method: 'GET',
  data: {},
  contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
};

const _createPromise = (options) => {
  return new Promise( (resolve, reject) => {
    const request = new XMLHttpRequest();
    options = $l.extend({}, defaults, options);
    request.open(options.method, options.url);
    request.onload = function () {
      let tmp = (request.status === 200) ?
        resolve (request.response) : reject (request.response);
    };
    request.send(options.data);
    return request;
  });
};

$l.ajax = function(options) {
  const promise = _createPromise(options);
  return promise.then((response) => {
    options.success(response);
    return response;
  }, options.error);
};
