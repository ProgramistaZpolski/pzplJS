// pzplJS 1.1.2 - New Generation JavaScript
// Licensed under the MIT license - by ProgramistaZpolski
"use strict";
let pzpljs = {};
function $(selector) {
    return document.querySelector(selector);
};
function $$(selector) {
    return document.querySelectorAll(selector);
};
pzpljs.info = {
    "version": "1.1.2",
    "config": {
        "logging": true,
        "allowDataLayerUsage": true
    },
    "thanks": "for using pzplJS"
};
pzpljs.includeHTML = function () {
    let tags = document.getElementsByTagName("*");
    for (let i = 0; i < tags.length; i++) {
        let element = tags[i];
        let htmlFile = element.getAttribute("data-pzpljs-html");
        if (htmlFile) {
            fetch(htmlFile).then(
                async function (resp) {
                    if (!resp.ok) {
                        if (this.info.config.logging === true) {
                            element.innerHTML = "pzplJS Error: Failed to fetch data";
                        };
                        console.log("pzplJS Error: Failed to fetch data. Traceback: pzpljs.includeHTML();");
                    } else {
                        element.innerHTML = await resp.text();
                    }
                }
            );
            element.removeAttribute("data-pzpljs-html");
        };
    }
};

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
};

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
};

pzpljs.dataLayer = {};

pzpljs.useDataLayer = function (dataLayerMode) {
    if (pzpljs.info.allowDataLayerUsage === true) {
        let tags = document.getElementsByTagName("*");
        if (dataLayerMode !== "html" && dataLayerMode !== "text") {
            console.log("dataLayerMode not specified! Resorting to text mode...");
        };
        for (let i = 0; i < tags.length; i++) {
            let dlayer = tags[i].getAttribute("data-pzpljs-dlayer");
            let supplied_data = tags[i].getAttribute("data-pzpljs-sdata");
            if (supplied_data) {
                let converted_data = JSON.parse(supplied_data);
                this.dataLayer = { ...this.dataLayer, ...converted_data };
            };
            if (dlayer) {
                if (dataLayerMode === "html") {
                    tags[i].innerHTML = this.dataLayer[dlayer];
                } else {
                    tags[i].textContent = this.dataLayer[dlayer];
                };
            };
        };
    };
};
pzpljs.updateDataLayer = function (newData, dataIndex, mode) {
    if (this.info.config.allowDataLayerUsage === true) {
        this.dataLayer[dataIndex] = newData;
        pzpljs.useDataLayer(mode);
    };
};


pzpljs.dynamicWebsiteElementLoad = function (type, url, target) {
    if (!target && type !== "html") {
        target = "head";
    };
    if (type == "css") {
        document.querySelector(target).innerHTML += `<link rel="stylesheet" href="${url}">`;
    } else if (type == "js") {
        let script = document.createElement('script');
        script.src = url;
        document.querySelector(target).appendChild(script);
    } else if (type == "html") {
        fetch(url).then(
            async function (resp) {
                if (!resp.ok) {
                    if (this.info.config.logging === true) {
                        document.querySelector(target).innerHTML = "pzplJS Error: Failed to fetch data" + document.querySelector(target).innerHTML;
                    };
                    console.log(`pzplJS Error: Failed to fetch data. Traceback: pzpljs.dynamicWebsiteElementLoad(${type}, ${url}, ${target})`);
                } else {
                    document.querySelector(target).innerHTML = await resp.text();
                };
            }
        );
    };
};

pzpljs.isFunction = function (obj) {
    return typeof obj === "function" && typeof obj.nodeType !== "number";
};

pzpljs.attr = function (obj, prop, action, newValue) {
    if (!obj || !prop || !action) {
        console.log(`pzplJS Error: Not all arguments passed! Traceback: pzpljs.attr(${obj}, ${prop}, ${action})`);
    } else {
        if (action === "get" || action === "GET") {
            return obj.getAttribute(prop);
        } else if (action === "set" || action === "SET") {
            return obj.setAttribute(prop, newValue);
        } else if (action === "delete" || action === "DELETE") {
            return obj.removeAttribute(prop);
        };
    };
};

pzpljs.css = function (obj, propName, newValue) {
    if (!obj || !propName) {
        console.log(`pzplJS Error: Required parameters not specified! Traceback: pzpljs.css(${obj}, ${propName})`);
    } else {
        if (newValue) {
            obj.style[propName] = newValue;
        } else {
            return obj.style[propName];
        };
    };
};

pzpljs.empty = function (obj) {
    if (obj.hasChildNodes()) {
        obj.innerHTML = "";
    } else {
        obj.remove();
    };
};

pzpljs.array = {};
pzpljs.array.noFalse = function (arr) {
    return arr.filter(Boolean);
};

pzpljs.after = function (elem, target) {
    target.insertAdjacentElement("afterend", elem);
};
pzpljs.before = function (elem, target) {
    target.insertAdjacentElement("beforebegin", elem);
};

pzpljs.noXSS = function (val) {
    const lt = /</g,
        gt = />/g,
        ap = /'/g,
        ic = /"/g;
    return val.toString().replace(lt, "&lt;").replace(gt, "&gt;").replace(ap, "&#39;").replace(ic, "&#34;");
}