// pzplJS 1.2 - New Generation Javascript - Licensed under MIT
"use strict";

let pzplJS = function (selector) {
    let el, elHTML;

    let obj = {
        getEl(selector) {
            if (el) {
                return el;
            };
            return document.querySelector(selector);
        },
        addClass(className) {
            el.classList.add(className);
            return this;
        },
        removeClass(className) {
            el.classList.remove(className);
            return this;
        },
        fadeOut(fast) {
            let fade = setInterval(function () {
                if (!el.style.opacity) {
                    el.style.opacity = 1;
                }
                if (el.style.opacity > 0) {
                    el.style.opacity -= 0.1;
                } else {
                    clearInterval(fade);
                }
            }, fast);
        },
        fadeIn(fast) {
            let fade = setInterval(function () {
                if (!el.style.opacity) {
                    el.style.opacity = 0;
                }
                if (el.style.opacity < 1) {
                    el.style.opacity = parseFloat(el.style.opacity) + 0.1;
                } else {
                    clearInterval(fade);
                }
            }, fast);
        },
        attr(prop, newValue) {
            if (newValue) {
                if (newValue == "") {
                    return elHTML.removeAttribute(prop);
                } else {
                    return elHTML.setAttribute(prop, newValue);
                };
            } else {
                return el.getAttribute(prop);
            };
        },
        css(propName, newValue) {
            if (newValue) {
                elHTML.style[propName] = newValue;
            } else {
                return elHTML.style[propName];
            };
        },
        empty() {
            if (elHTML.hasChildNodes()) {
                elHTML.innerHTML = "";
            } else {
                elHTML.remove();
            };
        },
        after(elem) {
            elHTML.insertAdjacentElement("afterend", elem);
        },
        before(elem) {
            elHTML.insertAdjacentElement("beforebegin", elem);
        }
    };

    el = obj.getEl(selector);
    elHTML = el;
    return obj;
};

pzplJS.includeHTML = function () {
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
                    };
                }
            );
            element.removeAttribute("data-pzpljs-html");
        };
    };
};

pzplJS.isFunction = function (obj) {
    return typeof obj === "function" && typeof obj.nodeType !== "number";
};

pzplJS.useDataLayer = function (dataLayerMode) {
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
pzplJS.updateDataLayer = function (newData, dataIndex, mode) {
    this.dataLayer[dataIndex] = newData;
    pzpljs.useDataLayer(mode);
};


pzplJS.dynamicWebsiteElementLoad = function (type, url, target) {
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

pzpljs.noFalse = function (arr) {
    return arr.filter(Boolean);
};

pzpljs.noXSS = function (val) {
    const lt = /</g,
        gt = />/g,
        ap = /'/g,
        ic = /"/g;
    return val.toString().replace(lt, "&lt;").replace(gt, "&gt;").replace(ap, "&#39;").replace(ic, "&#34;");
};


pzplJS.fn = pzplJS.prototype;
pzplJS.fn.version = "1.2";