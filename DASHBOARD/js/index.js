"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
let from = document.getElementById("product-form");
const productCount = document.getElementById("products-length");
const deleteAll = document.getElementById("delete-all");
let productsArray = [];
// Get The Products From Product.json
function loadProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        let storegedProducts = window.localStorage.getItem("products");
        try {
            let response = yield fetch("../products.json");
            let products = yield response.json();
            productsArray = products;
            if (!productsArray.length)
                if (storegedProducts)
                    productsArray = JSON.parse(storegedProducts);
            displayProducts(productsArray);
        }
        catch (error) {
            console.error(`Error Loading Data`, console.error);
        }
    });
}
function displayProducts(products) {
    let productsList = document.getElementById("products-list");
    if (productsList) {
        productsList.innerHTML = ``;
        products.forEach((prod) => {
            let productItem = document.createElement("li");
            productItem.classList.add("product-item", "list-group-item");
            productItem.innerHTML = `${prod.type}, ${prod.imgName}`;
            productsList.appendChild(productItem);
        });
        if (productCount)
            productCount.innerText = `${productsArray.length}`;
    }
}
// Add Product To The Products Array
function addProduct(products) {
    const productId = document.getElementById("product-id");
    const productType = document.getElementById("prod-type");
    const productPictureName = document.getElementById("picture-name");
    if (productId.value) {
        let productIndex = products.findIndex((prod) => prod.id == +productId.value);
        if (productIndex > -1) {
            products[productIndex].type = productType.value;
            products[productIndex].imgName = productPictureName.value;
        }
    }
    else {
        let imagePath = `../assets/images/`;
        const newProduct = {
            id: products.length ? products[products.length - 1].id + 1 : 1,
            type: productType.value,
            imgName: productPictureName.value,
            imgPath: `${imagePath}${productPictureName.value}`,
        };
        products.push(newProduct);
    }
    displayProducts(products);
    from === null || from === void 0 ? void 0 : from.reset();
    productPictureName.value = "";
    window.localStorage.setItem("products", JSON.stringify(products));
}
// Delete The Product From File
function deleteProduct(productId) {
    productsArray = productsArray.filter((prod) => productId != prod.id);
    displayProducts(productsArray);
    saveJSONToFile(productsArray);
}
// Edit The Product
function editProduct(productId) {
    let productID = document.getElementById("product-id");
    let productType = document.getElementById("product-type");
    let productImageName = document.getElementById("product-type");
    fetch("../products.json")
        .then((res) => res.json())
        .then((data) => {
        let editingProduct = data.find((prod) => productId === prod.id);
        productID.value = productID.id;
        productType.value = editingProduct.type;
        productImageName.value = editingProduct.imgName;
    });
}
// Save The Updated JSON File
function saveJSONToFile(products) {
    let stringJSON = JSON.stringify(products);
    let blobedProducts = new Blob([stringJSON], { type: "application/json" });
    let blobURL = URL.createObjectURL(blobedProducts);
    let downloadButton = document.createElement("a");
    downloadButton.href = blobURL;
    downloadButton.download = "products.json";
    downloadButton.click();
    URL.revokeObjectURL(blobURL);
}
// Form Submition
from === null || from === void 0 ? void 0 : from.addEventListener("submit", (e) => {
    e.preventDefault();
    addProduct(productsArray);
});
// Load The Product When The Page Loaded
window.addEventListener("load", () => {
    let storegedProducts = window.localStorage.getItem("products");
    loadProducts();
});
// Download The "Product.json" With Event Lisiener Click Download Button
(_a = document.getElementById("downloadJson")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    saveJSONToFile(productsArray);
});
deleteAll === null || deleteAll === void 0 ? void 0 : deleteAll.addEventListener("click", () => {
    productsArray = [];
    displayProducts(productsArray);
});
