# pzplJS
A light JavaScript libary, that makes developing websites faster <br>
The base size is 1.73 KB, but you can freely delete functions from the file, and make it as small as 61 bytes.
Check out the documentation in the Wiki secition.<br>
Use this libary from a CDN: https://www.jsdelivr.com/package/gh/programistazpolski/pzpljs <br>
Some example code:
```html
<body data-pzpljs-sdata='{ "body": "i can supply data!" }'>
    <h1>Hello World</h1>
    <div data-pzpljs-html="./hello.html"></div>
    <button onclick="pzpljs.fadeOut(50, this);" id="mynicebutton">Click to fade out</button>
    <div data-pzpljs-dlayer="ferie"></div>
    <div data-pzpljs-dlayer="lato"></div>
    <script src="pzpl.js"></script>
    <script>
        pzpljs.includeHTML();
        pzpljs.dataLayer = {
            "ferie": "<i>luty</i>",
            "lato": "sierpień"
        }
        pzpljs.useDataLayer("html");     
    </script>
</body>
```
