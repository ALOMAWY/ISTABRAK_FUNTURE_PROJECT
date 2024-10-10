import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { getAllDocuments } from "./database.js";
function displayProducts(products) {
    products.forEach((prod) => {
        var _a;
        let product = document.createElement("div");
        product.classList.add("product", "col-sm-12", "col-md-5", "col-lg-2", "border", "border-gray", "rounded-3");
        let img = document.createElement("img");
        img.classList.add("img-fluid", "show-text-x-50", "show-text-x-50", "rounded-4");
        img.src = prod.imagePath;
        product.appendChild(img);
        (_a = document.getElementById(`${prod.type}-prod`)) === null || _a === void 0 ? void 0 : _a.prepend(product);
    });
}
async function getProductsAndDisplayIt() {
    try {
        let products = (await getAllDocuments());
        if (products)
            displayProducts(products);
    }
    catch (error) {
        console.log("Cannot Get Products ", error);
    }
}
getProductsAndDisplayIt();
const firebaseConfig = {
    apiKey: "AIzaSyAQmrPfxjnuUA__bkqzZF-gsj4F1JLNoOg",
    authDomain: "test-d09cc.firebaseapp.com",
    projectId: "test-d09cc",
    storageBucket: "test-d09cc.appspot.com",
    messagingSenderId: "546762745938",
    appId: "1:546762745938:web:f33924bbf13e82ddd6d78b",
    measurementId: "G-4S9NPQVMK6",
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// Initialize Firestore
const db = getFirestore(firebaseApp);
let products = Array.from(document.querySelectorAll(".products"));
function displaySpecifiedNumberOfProduct(productsHolder) {
    let uniecClass = productsHolder.getAttribute("data-un-class");
    let productsContainer = Array.from(document.querySelectorAll(`.${uniecClass} .holder .row div.product`));
    if (productsContainer)
        productsContainer.forEach((card, index) => {
            if (index >= 5) {
                card.classList.add("d-none");
            }
            else {
                card.classList.remove("d-none");
            }
        });
}
function getProductsNumber(productsHolder) {
    let uniecClass = productsHolder.getAttribute("data-un-class");
    let productsLength = document.querySelectorAll(`.${uniecClass} .holder .row div.product`).length;
    let productsLengthArea = document.querySelector(`.${uniecClass} .products-length`);
    if (productsLengthArea)
        productsLengthArea.innerHTML = `${productsLength} Products`;
}
function addShowingProductsNumber(productsHolder) {
    let uniecClass = productsHolder.getAttribute("data-un-class");
    let showMoreBtn = document.querySelector(`.${uniecClass} .show-more`);
    let showMoreLimit = 5;
    showMoreBtn === null || showMoreBtn === void 0 ? void 0 : showMoreBtn.addEventListener("click", () => {
        let products = document.querySelectorAll(`.${uniecClass} .holder .row div.product`);
        let productsLength = products.length;
        let showingProducts = Array.from(products).filter((prod) => !prod.classList.contains("d-none")).length;
        let productsContainer = Array.from(products);
        if (productsContainer)
            productsContainer.forEach((card, index) => {
                if (index >= showingProducts + showMoreLimit) {
                    card.classList.add("d-none");
                }
                else {
                    scalingShow(card);
                }
            });
        let productsLengthArea = document.querySelector(`.${uniecClass} .products-length`);
        if (productsLengthArea)
            productsLengthArea.innerHTML = `${showingProducts + showMoreLimit > productsLength
                ? productsLength
                : showingProducts + showMoreLimit}/${productsLength} Products `;
        if (showingProducts + showMoreLimit >= productsLength)
            return false;
    });
}
function setTheTitleFixedTopIfInProductScoope(productsContainer) {
    const uniecClass = productsContainer.getAttribute("data-un-class");
    const title = document.querySelector(`.${uniecClass} h1.big-title`);
    const titleHeight = title === null || title === void 0 ? void 0 : title.clientHeight;
    title === null || title === void 0 ? void 0 : title.remove();
    // Create Title Holder For Pin Title In Page Top
    const titleHolder = document.createElement("div");
    titleHolder.classList.add("big-title", "title-holder", "bg-white");
    if (title)
        titleHolder.appendChild(title);
    productsContainer.prepend(titleHolder);
    titleHolder.style.width = "100%";
    function updateProductTitlePosition(titleHolder) {
        let scrollY = window.scrollY;
        let offsetTop = productsContainer.offsetTop;
        let titleHeight = title.clientHeight;
        let productsHeight = productsContainer.clientHeight;
        let inProductsScope = scrollY >= offsetTop &&
            scrollY < offsetTop + (productsHeight - titleHeight);
        if (title)
            title.classList.toggle("position-fixed", inProductsScope);
        if (inProductsScope) {
            if (title)
                title.classList.add("start-0", "py-4", "px-2", "w-100", "z-3", "shadow-sm");
            const computedMarginTop = window.getComputedStyle(title).marginTop;
            if (title)
                title.style.top = `-${computedMarginTop}`;
        }
        else {
            if (title)
                title.classList.remove("start-0", "py-4", "px-2", "w-100", "z-3", "shadow-sm");
        }
    }
    window.addEventListener("scroll", () => updateProductTitlePosition(titleHolder));
}
function showClickedPictureMoreDetails(productsHolder) {
    let productsArray = Array.from(productsHolder.children);
    productsArray.forEach((card) => {
        card.addEventListener("click", () => {
            gallery.classList.remove("d-none");
            gallery.classList.add("d-flex");
            let clickedImage = card.children[0];
            if (clickedImage.tagName == "IMG")
                selectedImage.src = clickedImage.src;
            imageContainer.style.height = selectedImage.clientHeight + "px";
        });
    });
}
let imageContainer = document.querySelector(".gallery .image");
let gallery = document.getElementById("gallery");
let selectedImage = document.getElementById("selected-image");
selectedImage.style.scale = `1`;
let galleryCloseButton = document.querySelector(".gallery .close-gallery");
let toolsBox = document.querySelector(".gallery .tools");
let fullScreenImage = document.querySelector(".gallery .tools .full-screen");
let zoomInImage = document.querySelector(".gallery .tools .zoom-in");
let zoomOutImage = document.querySelector(".gallery .tools .zoom-out");
let closeGallery = document.querySelector(".gallery .tools .close");
let share = document.querySelector(".gallery .tools .share");
let whatsappShare = document.querySelector(".gallery .tools .whatsapp");
galleryCloseButton === null || galleryCloseButton === void 0 ? void 0 : galleryCloseButton.addEventListener("click", () => {
    gallery.classList.remove("d-flex");
    gallery.classList.add("d-none");
    document.exitFullscreen();
});
fullScreenImage === null || fullScreenImage === void 0 ? void 0 : fullScreenImage.addEventListener("click", () => {
    if (fullScreenImage.dataset.fullscreen == "true") {
        fullScreenImage.dataset.fullscreen = "false";
        fullScreenImage.innerHTML = `<i class="fa-solid fa-expand"></i>`;
        document.exitFullscreen();
    }
    else {
        fullScreenImage.dataset.fullscreen = "true";
        gallery.requestFullscreen();
        fullScreenImage.innerHTML = `<i class="fa-solid fa-compress"></i>`;
    }
});
zoomInImage === null || zoomInImage === void 0 ? void 0 : zoomInImage.addEventListener("click", () => {
    let currentScale = parseInt(window.getComputedStyle(selectedImage).scale);
    console.log(currentScale);
    if (currentScale <= 4) {
        selectedImage.style.scale = `${currentScale * 2}`;
    }
});
zoomOutImage === null || zoomOutImage === void 0 ? void 0 : zoomOutImage.addEventListener("click", () => {
    let currentScale = parseInt(window.getComputedStyle(selectedImage).scale);
    console.log(currentScale);
    if (currentScale > 1) {
        selectedImage.style.scale = `${currentScale / 2}`;
    }
});
function scalingShow(ele) {
    ele.style.scale = "0 1";
    ele.classList.remove("d-none");
    setTimeout(() => {
        ele.style.scale = "1 1";
    }, 0);
}
