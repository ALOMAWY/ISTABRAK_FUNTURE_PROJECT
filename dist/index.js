// Import DB
import { getAllDocuments } from "./pages/database.js";
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
let products = document.querySelector(`#our-product .products .row`);
async function getProductsAndShowIt() {
    let docs = (await getAllDocuments());
    docs.forEach((product) => {
        let productDiv = document.createElement("div");
        productDiv.classList.add("col-sm-12", "col-md-6", "col-lg-3", "mb-5", "show-text-y", "blur-layer-hover");
        let productImage = document.createElement("img");
        productImage.classList.add("rounded", "img-fluid");
        productImage.src = product.imagePath;
        let productTitle = document.createElement("h3");
        productTitle.classList.add("text-center", "my-4", "text-capitalize");
        productTitle.innerText = product.model;
        productDiv.appendChild(productImage);
        productDiv.appendChild(productTitle);
        products === null || products === void 0 ? void 0 : products.appendChild(productDiv);
        let productWidth = productImage.clientWidth;
        console.log(productWidth);
        // productDiv.style.height = productWidth + "px";
    });
}
getProductsAndShowIt();
// - - - - - - - - - - - - - -
// End Product
//  Start Footer
const showProducts = document.querySelector("footer div ul li.show-products");
showProducts.addEventListener("click", () => {
    let products = document.querySelector("footer div ul li.show-products ul");
    if (products.clientWidth > 1) {
        products.style.cssText = `height: 0px; width: 0px; opacity: 0;`;
    }
    else {
        products.style.cssText = `height: 150px; width: 100%; opacity: 1;`;
    }
});
// End Footer
// Methods And Functions
// Methods And Functions
