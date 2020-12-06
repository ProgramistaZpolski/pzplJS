# pzplJS
![Version 1.1](https://img.shields.io/badge/Version-1.1-success) ![Tested on Firefox 83 and Chromium 88](https://img.shields.io/badge/Tested%20on-Firefox%2083%20%2B%20Chromium%2088-informational)<br>
A light JavaScript libary, that makes developing websites faster <br>
The base size is 3.7 KB, but you can freely delete functions from the file, and make it as small as 61 bytes.
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
