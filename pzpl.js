// pzplJS 1.0 - Licensed under the MIT license - by ProgramistaZpolski
"use strict";
let pzpljs = {};
function $(h) {
    return document.querySelector(h);
}
pzpljs.includeHTML = function () {
    let tags = document.getElementsByTagName("*");
    for (let i = 0; i < tags.length; i++) {
        let element = tags[i];
        let htmlFile = element.getAttribute("data-pzpljs-html");
        if (htmlFile) {
            fetch(htmlFile).then(
                async function (resp) {
                    if (!resp.ok) {
                        element.innerHTML = "pzplJS Error: Failed to fetch data";
                    } else {
                        element.innerHTML = await resp.text();
                    }
                }
            );
            element.removeAttribute("data-pzpljs-html");
        };
    }
}

pzpljs.fadeOut = function (fast, target) {
    let fade = setInterval(function () {
        if (!target.style.opacity) {
            target.style.opacity = 1;
        }
        if (target.style.opacity > 0) {
            target.style.opacity -= 0.1;
        } else {
            clearInterval(fade);
        }
    }, fast);
}

pzpljs.fadeIn = function (fast, target) {
    let fade = setInterval(function () {
        if (!target.style.opacity) {
            target.style.opacity = 0;
        }
        if (target.style.opacity < 1) {
            target.style.opacity = parseFloat(target.style.opacity) + 0.1;
        } else {
            clearInterval(fade);
        }
    }, fast);
}

pzpljs.dataLayer = {};

pzpljs.useDataLayer = function (dataLayerMode) {
    let tags = document.getElementsByTagName("*");
    if (dataLayerMode != "html" && dataLayerMode != "text") {
        console.log("dataLayerMode not specified! Resorting to text mode...")
    }
    for (let i = 0; i < tags.length; i++) {
        let dlayer = tags[i].getAttribute("data-pzpljs-dlayer");
        let supplied_data = tags[i].getAttribute("data-pzpljs-sdata");
        if (supplied_data) {
            let converted_data = JSON.parse(supplied_data);
            this.dataLayer = {...this.dataLayer, ...converted_data};
        }
        if (dlayer) {
            if (dataLayerMode == "html") {
                tags[i].innerHTML = this.dataLayer[dlayer];
            } else {
                tags[i].textContent = this.dataLayer[dlayer];
            }
        }
    }
}


pzpljs.dynamicWebsiteElementLoad = function (type, url) {
    if (type == "css") {
        document.querySelector('head').innerHTML += `<link rel="stylesheet" href="${url}">`;
    } else if (type == "js") {
        document.querySelector('head').innerHTML += `<script src="${url}">`;
    }
}
