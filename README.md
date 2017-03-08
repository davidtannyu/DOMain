#### DOMain
DOMain is a JavaScript library which handles HTML DOM manipulation, traversal,
event handling and Ajax requests similar to JQuery.

#### Setup
To use DOMain, download and webpack this library. This will generate a DOMain.js
file which you can find in the lib folder.

To install webpack: `npm install`

After installation, run webpack by using: `npm run ww`

```html
<head>
  ...
  <script type="text/javascript" src="./lib/DOMain.js"></script>
  ...
</head>
```


## API

#### $l
Upon a successful setup of DOMain, $l will be available on the global scope.
$l can take three arguments:
- An HTMLElement
  - Creates a DOMNodeCollection of the HTMLElement
  ```javascript
  $l(document.createElement("div"));
  ```
- A string
  - Creates a DOMNodeCollection of all elements that queried from the document
    selected by the string
  ```javascript
  $l("div");
  ```
- A function
  - Adds the function to the listener upon the document being loaded; if it is
    already loaded, simply invoke it
  ```javascript
  $l( () => console.log("Document Loaded!"));
  ```

### $DOMNodeCollection
A class that holds an array of HTMLElements utilized by used in conjunction with
$l.

#### html
Returns the innerHTML for the first element in the DOMNodeCollection if no
argument. Otherwise, it sets the innerHTML of all DOMNodeCollection elements to
the argument.

#### empty
Sets the innerHMTL of all DOMNodeCollection elements to empty string.

#### append
Appends a string, HTMLElement, or DOMNodeCollection to each element in the
DOMNodeCollection

#### remove
Remove all DOMNodeCollection element from the document.

#### attr
Gets the value of the attribute for the first element in the DOMNodeCollection
if one argument. Sets the value of the attribute to the given value if two
arguments.

#### addClass / removeClass
Adds or removes a class to each DOMNodeCollection element.


### EventListener

#### on
Adds event listener to each DOMNodeCollection element.

#### off
Removes event listener from each DOMNodeCollection element.

```javascript
$l("div").on("click", () => console.log("Clicked div!"));
$l("div").off("click");
```

### AJAX

#### $l.ajax
Creates and sends an HTTP request through an options argument,
returning a promise.

Keys of the options hash include:
- success: callback called upon success of the request
- error: callback called upon error of the request
- url: where the request is sent to
- method: type of request
- data: data sent along with the request
- contentType: type of content

```javascript
$l.ajax({
type: 'GET',
url: "http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=bcb83c4b54aee8418983c2aff3073b3b",
success(data) {
  console.log("We have your weather!")
  console.log(data);
},
error() {
  console.error("An error occurred.");
},
});
```
