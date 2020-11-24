# pzplJS
A JavaScript libary, made for learning.<br>
It makes working with the Web easier.<br>
Check out the documentation in the Wiki secition.<br>
Some example code:
```html
<body data-pzpljs-sdata='{ "body": "i can supply data!" }'>
    <h1>Hello World</h1>
    <div data-pzpljs-html="./hello.html" data-pzpljs-sdata='{ "loaded": "this data has been supplied from the div with the data-pzpljs-html function" }'></div>
    <button onclick="pzpljs.fadeOut(50, this);" id="mynicebutton">Click to fade out</button>
    <button onclick="pzpljs.fadeIn(50, document.querySelector('#mynicebutton'));">Click to fade in</button>
    <div data-pzpljs-dlayer="ferie"></div>
    <div data-pzpljs-dlayer="lato"></div>
    <script src="pzpl.js"></script>
</body>
```
