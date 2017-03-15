/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(elements) {
    this.elements = elements;
  }

  index(idx) {
    return this.elements[idx];
  }

  first() {
    return this.elements[0];
  }

  html(replace) {
    if (replace){
      this.elements.forEach((el) => el.innerHTML = replace);
      return this.elements;
    } else {
      return this.elements[0].innerHTML;
    }
  }

  empty(){
    this.elements.forEach((el) => el.innerHTML = "");
    return this.elements;
  }

  append(element){
    if (typeof element === "string") {
      this.elements.forEach( el => el.innerHTML += element);
    } else if (element instanceof HTMLElement) {
      this.elements.forEach( el => el.innerHTML += element.outerHTML);
    } else if (element instanceof DOMNodeCollection) {
      this.elements.forEach( el => {
        element.elements.forEach( item => {
          el.appendChild(item);
        });
      });
    }
    return this.elements;
  }

  attr(attr_name, ...attr_value){
    if (attr_value.length > 0){
      this.elements.forEach( el => el.setAttribute(attr_name, attr_value));
    } else {
      return this.elements[0].getAttribute(attr_name);
    }
  }

  addClass(className){
    this.elements.forEach( el => el.className += ` ${className}`);
    return this.elements;
  }

  removeClass(className) {
    this.elements.forEach( el => {
      el.className = el.className.replace(className, '').trim();
    });
    return this.elements;
  }

  toggleClass(className) {
    this.elements.forEach( el => {
      const isThere = el.className.split(" ").includes(className);
      if (isThere) {
        el.className = el.className.replace(className, '').trim();
      } else {
        el.className += ` ${className}`;
      }
    });
    return this.elements;
  }

  children() {
    let children = [];

    this.elements.forEach( el => {
      Array.from(el.children).forEach(child => {
        if (!children.includes(child)) {
          children.push(child);
        }
      });
    });

    return new DOMNodeCollection(children);
  }

  parent() {
    let parents = [];

    this.elements.forEach( el => {
      let parent = el.parentNode;
      if (!parents.includes(parent)) {
        parents.push(parent);
      }
    });

    return new DOMNodeCollection(parents);
  }

  find(selector) {
    let found = [];
    this.elements.forEach (el => {
      found = found.concat(Array.from(el.querySelectorAll(selector)));
    });

    return new DOMNodeCollection(found);
  }

  remove() {
    this.elements.forEach(el => {
      el.outerHTML = "";
    });
    return this.elements;
  }

  on(event, callback){
    this.elements.forEach(el => {
      el.addEventListener(event, callback);
      el.callbacks = el.callbacks || {};
      el.callbacks[event] = el.callbacks[event] || [];
      el.callbacks[event].push(callback);
    });
    return this.elements;
  }

  off(event){
    this.elements.forEach(el => {
      el.callbacks[event].forEach(listener => {
        el.removeEventListener(event, listener);
      });
    });
    return this.elements;
  }
}


module.exports = DOMNodeCollection;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(0);
const Interaction = __webpack_require__(2);

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
    if(options.success) {
      options.success(response);
    }
    return JSON.parse(response).data;
  }, options.error);
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

function changeTextDisplay() {
  $l("form.text-display").first().addEventListener("submit", (event) => {
    event.preventDefault();
    const text = $l("form.text-display input.text").first().value;
    $l("p.text-display").html(text);
  });
  $l("form.clear-display").first().addEventListener("submit", (event) => {
    event.preventDefault();
    $l("p.text-display").empty();
  });
}

function appendRemoveDisplay() {
  $l("form.append-tail").first().addEventListener("submit", (event) => {
    event.preventDefault();
    $l("p.donkey").append("<p class='tail'>tail</p>");
  });
  $l("form.remove-tails").first().addEventListener("submit", (event) => {
    event.preventDefault();
    $l("p.tail").remove();
  });
}

function classDisplay() {
  $l("form.add-class").first().addEventListener("submit", (event) => {
    event.preventDefault();
    const face = $l("img.class-face");
    face.addClass("classy");
    face.attr('src','./assets/images/classface.png');
  });
  $l("form.remove-class").first().addEventListener("submit", (event) => {
    event.preventDefault();
    const face = $l("img.class-face");
    face.removeClass("classy");
    face.attr('src','./assets/images/noclassface.png');
  });
}

function onOffDisplay() {
  $l("form.on").first().addEventListener("submit", (event) => {
    event.preventDefault();
    const lightswitch = $l("img.lightswitch");
    const light = $l("img.light");
    if ( !lightswitch.first().className.includes("connected")) {
      lightswitch.addClass("connected");
      lightswitch.on("click", () => {
        if (light.first().className.includes("off")) {
          light.attr('src','./assets/images/lightbulb-on.png');
        } else {
          light.attr('src','./assets/images/lightbulb-off.png');
        }
        light.toggleClass("off");
      });
    }
  });
  $l("form.off").first().addEventListener("submit", (event) => {
    event.preventDefault();
    const lightswitch = $l("img.lightswitch");
    lightswitch.off("click");
    lightswitch.removeClass("connected");
    lightswitch.on("click", () => {
      lightswitch.toggleClass("toggled");
    });
  });
}

const fetchSearchGiphys = searchTerm => (
  $l.ajax({
    method: 'GET',
    url: `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=dc6zaTOxFJmzC&limit=1`
  })
);

function ajaxDisplay() {
  $l("form.ajax").first().addEventListener("submit", (event) => {
    event.preventDefault();
    const searchTerm = $l("form.ajax input.query").first().value;
    fetchSearchGiphys(searchTerm).then(data => {
      $l("img.giphy").attr("src", data[0].images.fixed_height.url);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  changeTextDisplay();
  appendRemoveDisplay();
  classDisplay();

  $l("img.lightswitch").on("click", () => {
    $l("img.lightswitch").toggleClass("toggled");
  });
  onOffDisplay();
  ajaxDisplay();
});


/***/ })
/******/ ]);
//# sourceMappingURL=DOMain.js.map
