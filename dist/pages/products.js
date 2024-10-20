import { getAllDocuments } from "./database.js";
let loaded = false;
window.addEventListener("load", () => {
    getProductsAndDisplayIt();
});
let productHolders = Array.from(document.querySelectorAll(".products"));
let productsArray;
let selectedImage = document.getElementById("selected-image");
let privewProduct = document.getElementById("privew");
async function getProductsAndDisplayIt() {
    try {
        let products = (await getAllDocuments());
        productsArray = products;
        if (products)
            displayProducts(products);
        loaded = true;
    }
    catch (error) {
        console.log("No Product In Database");
        console.error(error);
        productHolders.forEach((holder) => displayFakeProducts(holder));
        loaded = false;
    }
    applyFunctions();
}
function applyFunctions() {
    productHolders.forEach((ele) => {
        let holder = ele;
        if (loaded) {
            holder.classList.remove("empty");
        }
        else {
            holder.classList.add("empty");
        }
        displaySpecifiedNumberOfProduct(holder);
        getProductsNumber(holder);
        addShowingProductsNumber(holder);
        fixedTheTitleOnFocusIt(holder);
        showClickedPictureMoreDetails(holder);
        addMoreButtonControl(holder);
    });
}
function displayProducts(products) {
    products.forEach((prod) => {
        var _a;
        let product = document.createElement("div");
        product.classList.add("product", "col-sm-12", "col-md-5", "col-lg-2", "flex-grow-1", "border", "border-gray", "rounded-3");
        product.setAttribute("prod-id", prod.id);
        let img = document.createElement("img");
        img.classList.add("img-fluid", "show-text-x-30", "rounded-4");
        img.src = prod.imagePath;
        product.appendChild(img);
        (_a = document.getElementById(`${prod.type}-prod`)) === null || _a === void 0 ? void 0 : _a.prepend(product);
    });
}
function displayFakeProducts(productsHolder) {
    let uniecClass = productsHolder.getAttribute("data-un-class");
    let holder = document.querySelector(`.${uniecClass} .holder .row`);
    let prodNums = 1;
    if (document.documentElement.clientWidth < 768) {
        prodNums = 2;
    }
    else if (document.documentElement.clientWidth > 768 &&
        document.documentElement.clientWidth < 991) {
        prodNums = 6;
    }
    else {
        prodNums = 10;
    }
    for (let i = 0; i < prodNums; i++) {
        let fakeProduct = document.createElement("div");
        fakeProduct.classList.add("product", "fake-product", "col-sm-12", "col-md-5", "col-lg-2", "flex-grow-1", "border", "border-gray", "rounded-3");
        let fakeImage = document.createElement("img");
        fakeImage.src = "../assets/images/theme-plugin-placeholder.webp";
        fakeImage.classList.add("img-fluid", "rounded-4");
        fakeProduct.appendChild(fakeImage);
        holder.appendChild(fakeProduct);
        fakeProduct.addEventListener("click", () => {
            return false;
        });
    }
}
function displaySpecifiedNumberOfProduct(productsHolder) {
    let uniecClass = productsHolder.getAttribute("data-un-class");
    let productsContainer = Array.from(document.querySelectorAll(`.${uniecClass} .holder .row div.product`));
    if (productsHolder.classList.contains("empty"))
        return false;
    if (productsContainer)
        productsContainer.forEach((card, index) => {
            let showLimit = 5;
            if (document.documentElement.clientWidth < 768) {
                showLimit = 2;
            }
            else if (document.documentElement.clientWidth > 768 &&
                document.documentElement.clientWidth < 991) {
                showLimit = 4;
            }
            else {
                showLimit = 5;
            }
            if (index >= showLimit) {
                card.classList.add("d-none");
            }
            else {
                card.classList.remove("d-none");
            }
        });
}
function getProductsNumber(productsHolder) {
    let uniecClass = productsHolder.getAttribute("data-un-class");
    if (productsHolder.classList.contains("empty"))
        return false;
    let productsLength = document.querySelectorAll(`.${uniecClass} .holder .row div.product`).length;
    let productsLengthArea = document.querySelector(`.${uniecClass} .products-length`);
    if (productsLengthArea)
        productsLengthArea.innerHTML = `${productsLength} Products`;
}
function addShowingProductsNumber(productsHolder) {
    let uniecClass = productsHolder.getAttribute("data-un-class");
    let showMoreBtn = document.querySelector(`.${uniecClass} .show-more`);
    let showMoreLimit = 5;
    if (document.documentElement.clientWidth < 768) {
        showMoreLimit = 2;
    }
    else if (document.documentElement.clientWidth > 768 &&
        document.documentElement.clientWidth < 991) {
        showMoreLimit = 4;
    }
    else {
        showMoreLimit = 5;
    }
    let products = document.querySelectorAll(`.${uniecClass} .holder .row div.product`);
    let productsLength = products.length;
    showMoreBtn === null || showMoreBtn === void 0 ? void 0 : showMoreBtn.addEventListener("click", () => {
        let currentShowingProducts = Array.from(products).filter((prod) => !prod.classList.contains("d-none")).length;
        let nextShowingProducts = currentShowingProducts + showMoreLimit;
        if (currentShowingProducts == productsLength)
            return false;
        if (nextShowingProducts >= productsLength)
            showMoreBtn.classList.add("d-none");
        showMoreBtn.classList.remove("d-block");
        let productsLengthArea = document.querySelector(`.${uniecClass} .products-length`);
        if (nextShowingProducts > productsLength) {
            if (productsLengthArea)
                productsLengthArea.innerHTML = `${productsLength}/${productsLength} Products`;
        }
        else {
            if (productsLengthArea)
                productsLengthArea.innerHTML = `${nextShowingProducts}/${productsLength} Products`;
        }
        products.forEach((card, index) => {
            if (index + 1 <= nextShowingProducts) {
                scalingShow(card);
            }
            else {
                card.classList.add("d-none");
            }
        });
    });
}
function fixedTheTitleOnFocusIt(productsContainer) {
    const uniecClass = productsContainer.getAttribute("data-un-class");
    const title = document.querySelector(`.${uniecClass} h1.big-title`);
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
        titleHolder.style.height = titleHeight + "px";
        let productsHeight = productsContainer.clientHeight;
        let inProductsScope = scrollY > offsetTop && scrollY < offsetTop + productsHeight;
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
    if (productsHolder.classList.contains("empty"))
        return false;
    products.forEach((card) => {
        card.addEventListener("click", (clickedProduct) => {
            if (card.classList.contains("fake-product")) {
                return false;
            }
            let clickedElement = clickedProduct.target;
            let productsData = productsArray;
            let productId;
            if (privewProduct.classList.contains("h-0")) {
                privewProduct.classList.remove("h-0");
                privewProduct.classList.add("h-100");
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
        if (!privewProduct.classList.contains("h-0")) {
            privewProduct.classList.add("h-0");
            privewProduct.classList.remove("h-100");
        }
    });
}
function addMoreButtonControl(productsHolder) {
    let uniecClass = productsHolder.getAttribute("data-un-class");
    let products = document.querySelectorAll(`.${uniecClass} .holder .row .product`);
    let showMoreBtn = document.querySelector(`.${uniecClass} .show-more`);
    if (products.length <= 5) {
        showMoreBtn === null || showMoreBtn === void 0 ? void 0 : showMoreBtn.classList.add("d-none");
    }
    else {
        showMoreBtn === null || showMoreBtn === void 0 ? void 0 : showMoreBtn.classList.remove("d-none");
    }
}
function scalingShow(ele) {
    ele.style.scale = "0 1";
    ele.classList.remove("d-none");
    setTimeout(() => {
        ele.style.scale = "1 1";
    }, 0);
}
