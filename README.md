# pzplJS
a very simple javascript libary for my own purposes
## Usage
### Select a DOM element by:
- class name
```js
$(".myclass");
```
- id
```js
$("#myid");
```
- tag
```js
$("header");
```
Example:
```js
$(".card").style.display = "flex";
```
### Fetch JSON data
```js
fetcher("link to your api");
```
Example:
```js
let deeta = fetcher('https://api.jsonbin.io/b/5f95924cbd69750f00c35a19');
$('#card-title').innerHTML = deeta[1].title;
```
