"use strict";
// Start Landing
let menuShowButton = document.getElementById("menu-btn");
let menuList = document.querySelector("section .menu-area");
let menuCloseButton = document.getElementById("close-menu");
let navBar = document.querySelector("header nav");
menuShowButton.addEventListener("click", (e) => {
    menuList.classList.remove("d-none");
    setTimeout(() => {
        menuList.style.opacity = "0.99";
    }, 0);
});
menuCloseButton.addEventListener("click", (e) => {
    menuList.style.opacity = "0";
    setTimeout(() => {
        menuList.classList.add("d-none");
    }, 300);
});
// Start Product
/// - - - - - - - - - - - - - -
// End Product
// // Start Footer
const showProducts = (document.querySelector("footer div ul li.show-products"));
showProducts.addEventListener("click", () => {
    let products = (document.querySelector("footer div ul li.show-products ul"));
    if (products.clientWidth > 1) {
        products.style.cssText = `height: 0px; width: 0px; opacity: 0;`;
    }
    else {
        products.style.cssText = `height: 150px; width: 100%; opacity: 1;`;
    }
});
HTMLElement.prototype.getElementStyle = function (property) {
    return window.getComputedStyle(this).getPropertyValue(property);
};
console.log(document.body.getElementStyle("width"));
// Methods And Functions
