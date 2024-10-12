import { getAllDocuments, Product } from "./database.js";

window.addEventListener("load", () => {
  getProductsAndDisplayIt();
});

let productHolders = Array.from(document.querySelectorAll(".products"));

let productsArray: Product[];

function displayProducts(products: Product[]) {
  products.forEach((prod) => {
    let product = document.createElement("div");

    product.classList.add(
      "product",
      "col-sm-12",
      "col-md-5",
      "col-lg-2",
      "border",
      "border-gray",
      "rounded-3"
    );

    product.setAttribute("prod-id", prod.id);

    let img = document.createElement("img") as HTMLImageElement;

    img.classList.add(
      "img-fluid",
      "show-text-x-50",
      "show-text-x-50",
      "rounded-4"
    );

    img.src = prod.imagePath;

    product.appendChild(img);

    document.getElementById(`${prod.type}-prod`)?.prepend(product);
  });

  productHolders.forEach((ele) => {
    let holder = ele as HTMLDivElement;

    displaySpecifiedNumberOfProduct(holder);

    getProductsNumber(holder);

    addShowingProductsNumber(holder);

    setTheTitleFixedTopIfInProductScoope(holder);

    showClickedPictureMoreDetails(holder);
  });
}

async function getProductsAndDisplayIt() {
  try {
    let products = (await getAllDocuments()) as Product[];

    productsArray = products;

    if (products) displayProducts(products);
  } catch (error) {
    console.log("Cannot Get Products ", error);
  }
}

function displaySpecifiedNumberOfProduct(productsHolder: HTMLDivElement) {
  let uniecClass = productsHolder.getAttribute("data-un-class");

  let productsContainer = Array.from(
    document.querySelectorAll(`.${uniecClass} .holder .row div.product`)
  );

  if (productsContainer)
    productsContainer.forEach((card, index) => {
      if (index >= 5) {
        card.classList.add("d-none");
      } else {
        card.classList.remove("d-none");
      }
    });
}

function getProductsNumber(productsHolder: HTMLDivElement) {
  let uniecClass = productsHolder.getAttribute("data-un-class");

  let productsLength = document.querySelectorAll(
    `.${uniecClass} .holder .row div.product`
  ).length;

  let productsLengthArea = document.querySelector(
    `.${uniecClass} .products-length`
  );

  if (productsLengthArea)
    productsLengthArea.innerHTML = `${productsLength} Products`;
}

function addShowingProductsNumber(productsHolder: HTMLDivElement) {
  let uniecClass = productsHolder.getAttribute("data-un-class");

  let showMoreBtn = document.querySelector(`.${uniecClass} .show-more`);

  let showMoreLimit = 5;

  showMoreBtn?.addEventListener("click", () => {
    let products = document.querySelectorAll(
      `.${uniecClass} .holder .row div.product`
    );

    let productsLength = products.length;

    let showingProducts = Array.from(products).filter(
      (prod) => !prod.classList.contains("d-none")
    ).length;

    let productsContainer = Array.from(products);

    if (productsContainer)
      productsContainer.forEach((card, index) => {
        if (index >= showingProducts + showMoreLimit) {
          card.classList.add("d-none");
        } else {
          scalingShow(card as HTMLElement);
        }
      });

    let productsLengthArea = document.querySelector(
      `.${uniecClass} .products-length`
    );

    if (productsLengthArea)
      productsLengthArea.innerHTML = `${
        showingProducts + showMoreLimit > productsLength
          ? productsLength
          : showingProducts + showMoreLimit
      }/${productsLength} Products `;

    if (showingProducts + showMoreLimit >= productsLength) return false;
  });
}

function setTheTitleFixedTopIfInProductScoope(
  productsContainer: HTMLDivElement
) {
  const uniecClass = productsContainer.getAttribute("data-un-class");
  const title = document.querySelector(
    `.${uniecClass} h1.big-title`
  ) as HTMLHeadingElement;
  const titleHeight = title?.clientHeight;

  title?.remove();

  // Create Title Holder For Pin Title In Page Top

  const titleHolder = document.createElement("div");

  titleHolder.classList.add("big-title", "title-holder", "bg-white");

  if (title) titleHolder.appendChild(title);

  productsContainer.prepend(titleHolder);

  titleHolder.style.width = "100%";

  function updateProductTitlePosition(titleHolder: HTMLDivElement) {
    let scrollY: number = window.scrollY;

    let offsetTop: number = productsContainer.offsetTop;

    let titleHeight: number = title.clientHeight;

    let productsHeight: number = productsContainer.clientHeight;

    let inProductsScope: boolean =
      scrollY >= offsetTop && scrollY < offsetTop + productsHeight;

    if (title) title.classList.toggle("position-fixed", inProductsScope);

    if (inProductsScope) {
      if (title)
        title.classList.add(
          "start-0",
          "py-4",
          "px-2",
          "w-100",
          "z-3",
          "shadow-sm"
        );

      const computedMarginTop = window.getComputedStyle(title).marginTop;

      if (title) title.style.top = `-${computedMarginTop}`;
    } else {
      if (title)
        title.classList.remove(
          "start-0",
          "py-4",
          "px-2",
          "w-100",
          "z-3",
          "shadow-sm"
        );
    }
  }
  window.addEventListener("scroll", () =>
    updateProductTitlePosition(titleHolder)
  );
}

function showClickedPictureMoreDetails(productsHolder: HTMLDivElement) {
  let uniecClass = productsHolder.getAttribute("data-un-class");

  let products = document.querySelectorAll(`.${uniecClass} .holder .row`);

  const emptyArea = document.getElementById("low-opacity-area");

  products.forEach((card) => {
    card.addEventListener("click", (clickedProduct) => {
      let clickedElement = clickedProduct.target as HTMLElement;
      let productsData: Product[] = productsArray;
      let productId: string;

      console.log(clickedElement);

      if (gallery.classList.contains("h-0")) {
        gallery.classList.remove("h-0");
        gallery.classList.add("h-100");
      }

      if (clickedElement.tagName == "IMG") {
        selectedImage.src = clickedElement.src;

        let productDiv = clickedElement.parentNode as HTMLDivElement;

        productId = productDiv.getAttribute("prod-id") || "";
      } else if (clickedElement.tagName === "DIV") {
        if (clickedElement.classList.contains("product"))
          selectedImage.src = clickedElement.children[0].src;

        productId = clickedElement.getAttribute("prod-id") || "";
      }
      let productData = productsData.filter((prod) => prod.id == productId)[0];

      console.log(productData);

      document.getElementById("prod-type")?.innerHTML = productData.type;
      document.getElementById("prod-model")?.innerHTML = productData.model;
      document.getElementById("prod-description")?.innerHTML =
        productData.description;
    });
  });

  emptyArea?.addEventListener("click", () => {
    if (!gallery.classList.contains("h-0")) {
      gallery.classList.add("h-0");
      gallery.classList.remove("h-100");
    }
  });
}
let selectedImage = document.getElementById(
  "selected-image"
) as HTMLImageElement;

let gallery = document.getElementById("gallery") as HTMLElement;

let galleryCloseButton = document.querySelector(".gallery .close-gallery");

let closeGallery = document.querySelector(".gallery .tools .close");

galleryCloseButton?.addEventListener("click", () => {
  gallery.classList.remove("w-25");
  gallery.classList.remove("w-50");

  gallery.classList.add("w-0");
});

function scalingShow(ele: HTMLElement) {
  ele.style.scale = "0 1";
  ele.classList.remove("d-none");
  setTimeout(() => {
    ele.style.scale = "1 1";
  }, 0);
}
