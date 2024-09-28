"use strict";
let counters = document.querySelectorAll(".counter");
let countersContainer = document.querySelector(".counters");
let countStart = true;
let scrollHandler = () => {
    if (window.scrollY + document.documentElement.clientHeight >=
        countersContainer.offsetTop + countersContainer.clientHeight &&
        countStart) {
        countStart = false;
        counters.forEach((e) => {
            var _a;
            countStart = false;
            let element = e;
            let count = +((_a = element.dataset.count) !== null && _a !== void 0 ? _a : 0);
            let counter = 0;
            let updater = setInterval(() => {
                if (count >= counter) {
                    element.dataset.type == "percent"
                        ? (element.innerHTML = `${counter}%`)
                        : (element.innerHTML = `${counter}`);
                    counter++;
                }
                else {
                    clearInterval(updater);
                }
            }, 500 / count);
        });
        window.removeEventListener("scroll", scrollHandler);
    }
};
window.addEventListener("scroll", scrollHandler);
