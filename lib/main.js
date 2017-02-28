const DOMNodeCollection = require("./dom_node_collection");

window.$l = (selector) => {
  this.loadedCallbacks = [];
  if (selector instanceof HTMLElement) {
    return new DOMNodeCollection([selector]);
  } else if (typeof selector === "string") {
    let nodeList = document.querySelectorAll(selector);
    return new DOMNodeCollection(Array.from(nodeList));
  } else if (typeof selector === "function") {
    this.loadedCallbacks.push(selector);
  }

  const loadCallbacks = function (){
    loadedCallbacks.forEach((callback) => {
      callback();
    });
  };
  document.addEventListener("DOMContentLoaded", loadCallbacks);
};


//
$l.extend =  function(target, ...sources) {
  return Object.assign(target, ...sources);
};

$l.ajax = function(options){
  const request = new XMLHttpRequest();
  const defaults = {
    success: () => {},
    error: () => {},
    url: "",
    method: 'GET',
    data: {},
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  };
  options = $l.extend({}, defaults, options);
  request.open(options.method, options.url);
  request.onload = function() {
    if (request.status === 200) {
      options.success(request.response);
    } else {
      options.error(request.response);
    }
  };
  request.send(options.data);
  return new Promise (request);
};
