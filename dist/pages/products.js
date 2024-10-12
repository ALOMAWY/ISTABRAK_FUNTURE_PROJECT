import { getAllDocuments } from "./database.js";
window.addEventListener("load", () => {
    getProductsAndDisplayIt();
});
let productHolders = Array.from(document.querySelectorAll(".products"));
let productsArray;
function displayProducts(products) {
    products.forEach((prod) => {
        var _a;
        let product = document.createElement("div");
        product.classList.add("product", "col-sm-12", "col-md-5", "col-lg-2", "border", "border-gray", "rounded-3");
        product.setAttribute("prod-id", prod.id);
        let img = document.createElement("img");
        img.classList.add("img-fluid", "show-text-x-50", "show-text-x-50", "rounded-4");
        img.src = prod.imagePath;
        product.appendChild(img);
        (_a = document.getElementById(`${prod.type}-prod`)) === null || _a === void 0 ? void 0 : _a.prepend(product);
    });
    productHolders.forEach((ele) => {
        let holder = ele;
        displaySpecifiedNumberOfProduct(holder);
        getProductsNumber(holder);
        addShowingProductsNumber(holder);
        setTheTitleFixedTopIfInProductScoope(holder);
        showClickedPictureMoreDetails(holder);
    });
}
async function getProductsAndDisplayIt() {
    try {
        let products = (await getAllDocuments());
        productsArray = products;
        if (products)
            displayProducts(products);
    }
    catch (error) {
        console.error("No Product In Database", error);
        productHolders.forEach((ele) => {
            let holder = ele;
            displaySpecifiedNumberOfProduct(holder);
            getProductsNumber(holder);
            addShowingProductsNumber(holder);
            setTheTitleFixedTopIfInProductScoope(holder);
            showClickedPictureMoreDetails(holder);
        });
    }
}
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
        let inProductsScope = scrollY >= offsetTop && scrollY < offsetTop + productsHeight;
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
    let uniecClass = productsHolder.getAttribute("data-un-class");
    let products = document.querySelectorAll(`.${uniecClass} .holder .row`);
    const emptyArea = document.getElementById("low-opacity-area");
    products.forEach((card) => {
        card.addEventListener("click", (clickedProduct) => {
            let clickedElement = clickedProduct.target;
            let productsData = productsArray;
            let productId;
            console.log(clickedElement);
            if (gallery.classList.contains("h-0")) {
                gallery.classList.remove("h-0");
                gallery.classList.add("h-100");
            }
            if (clickedElement.tagName == "IMG") {
                let privewImage = clickedElement;
                selectedImage.src = privewImage.src;
                let productDiv = clickedElement.parentNode;
                productId = productDiv.getAttribute("prod-id") || "";
            }
            else if (clickedElement.tagName === "DIV") {
                if (clickedElement.classList.contains("product")) {
                    let privewImage = clickedElement.children[0];
                    selectedImage.src = privewImage.src;
                }
                productId = clickedElement.getAttribute("prod-id") || "";
            }
            let productData = productsData.filter((prod) => prod.id == productId)[0];
            console.log(productData);
            // Privew Product Detailes
            let prodType = document.getElementById("prod-type");
            let prodModel = document.getElementById("prod-model");
            let prodDescription = document.getElementById("prod-description");
            if (prodType && prodModel && prodDescription) {
                prodType.innerHTML = productData.type;
                prodModel.innerHTML = productData.model;
                prodDescription.innerHTML = productData.description;
            }
        });
    });
    emptyArea === null || emptyArea === void 0 ? void 0 : emptyArea.addEventListener("click", () => {
        if (!gallery.classList.contains("h-0")) {
            gallery.classList.add("h-0");
            gallery.classList.remove("h-100");
        }
    });
}
let selectedImage = document.getElementById("selected-image");
let gallery = document.getElementById("gallery");
let galleryCloseButton = document.querySelector(".gallery .close-gallery");
let closeGallery = document.querySelector(".gallery .tools .close");
galleryCloseButton === null || galleryCloseButton === void 0 ? void 0 : galleryCloseButton.addEventListener("click", () => {
    gallery.classList.remove("w-25");
    gallery.classList.remove("w-50");
    gallery.classList.add("w-0");
});
function scalingShow(ele) {
    ele.style.scale = "0 1";
    ele.classList.remove("d-none");
    setTimeout(() => {
        ele.style.scale = "1 1";
    }, 0);
}
