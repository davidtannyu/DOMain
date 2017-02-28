class DOMNodeCollection {
  constructor(elements) {
    this.elements = elements;
  }

  html() {
    if (arguments[0]){
      this.elements.forEach((el) => el.innerHTML = arguments[0]);
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
