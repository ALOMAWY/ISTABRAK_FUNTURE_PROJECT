import { getAllDocuments, Product } from "../pages/database.js";
let loaded = false;

window.addEventListener("load", () => {
  getProductsAndDisplayIt();
});

let productHolders = Array.from(document.querySelectorAll(".products"));

let productsArray: Product[];

let selectedImage = document.getElementById(
  "selected-image"
) as HTMLImageElement;

let privewProduct = document.getElementById("privew") as HTMLElement;

async function getProductsAndDisplayIt() {
  try {
    let products = (await getAllDocuments()) as Product[];

    productsArray = products;

    if (products) displayProducts(products);
    loaded = true;
  } catch (error) {
    console.log("No Product In Database");
    console.error(error);

    productHolders.forEach((holder) =>
      displayFakeProducts(holder as HTMLDivElement)
    );

    loaded = false;
  }
  applyFunctions();
}

function applyFunctions() {
  productHolders.forEach((ele) => {
    let holder = ele as HTMLDivElement;
    if (loaded) {
      holder.classList.remove("empty");
    } else {
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

function displayProducts(products: Product[]) {
  products.forEach((prod) => {
    let product = document.createElement("div");

    product.classList.add(
      "product",
      "col-sm-12",
      "col-md-5",
      "col-lg-2",
      "flex-grow-1",
      "border",
      "border-gray",
      "rounded-3"
    );

    product.setAttribute("prod-id", prod.id);

    let img = document.createElement("img") as HTMLImageElement;

    img.classList.add("img-fluid", "show-text-x-30", "rounded-4");

    img.src = prod.imagePath;

    product.appendChild(img);

    document.getElementById(`${prod.type}-prod`)?.prepend(product);
  });
}

function displayFakeProducts(productsHolder: HTMLDivElement) {
  let uniecClass = productsHolder.getAttribute("data-un-class");

  let holder = document.querySelector(
    `.${uniecClass} .holder .row`
  ) as HTMLDivElement;

  let prodNums: number = 1;

  if (document.documentElement.clientWidth < 768) {
    prodNums = 2;
  } else if (
    document.documentElement.clientWidth > 768 &&
    document.documentElement.clientWidth < 991
  ) {
    prodNums = 6;
  } else {
    prodNums = 10;
  }

  for (let i = 0; i < prodNums; i++) {
    let fakeProduct = document.createElement("div");

    fakeProduct.classList.add(
      "product",
      "fake-product",
      "col-sm-12",
      "col-md-5",
      "col-lg-2",
      "flex-grow-1",
      "border",
      "border-gray",
      "rounded-3"
    );

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

function displaySpecifiedNumberOfProduct(productsHolder: HTMLDivElement) {
  let uniecClass = productsHolder.getAttribute("data-un-class");

  let productsContainer = Array.from(
    document.querySelectorAll(`.${uniecClass} .holder .row div.product`)
  );

  if (productsHolder.classList.contains("empty")) return false;

  if (productsContainer)
    productsContainer.forEach((card, index) => {
      let showLimit = 5;

      if (document.documentElement.clientWidth < 768) {
        showLimit = 2;
      } else if (
        document.documentElement.clientWidth > 768 &&
        document.documentElement.clientWidth < 991
      ) {
        showLimit = 4;
      } else {
        showLimit = 5;
      }

      if (index >= showLimit) {
        card.classList.add("d-none");
      } else {
        card.classList.remove("d-none");
      }
    });
}

function getProductsNumber(productsHolder: HTMLDivElement) {
  let uniecClass = productsHolder.getAttribute("data-un-class");

  if (productsHolder.classList.contains("empty")) return false;

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

  if (document.documentElement.clientWidth < 768) {
    showMoreLimit = 2;
  } else if (
    document.documentElement.clientWidth > 768 &&
    document.documentElement.clientWidth < 991
  ) {
    showMoreLimit = 4;
  } else {
    showMoreLimit = 5;
  }

  let products = document.querySelectorAll(
    `.${uniecClass} .holder .row div.product`
  );

  let productsLength = products.length;

  showMoreBtn?.addEventListener("click", () => {
    let currentShowingProducts = Array.from(products).filter(
      (prod) => !prod.classList.contains("d-none")
    ).length;

    let nextShowingProducts = currentShowingProducts + showMoreLimit;

    if (currentShowingProducts == productsLength) return false;

    if (nextShowingProducts >= productsLength)
      showMoreBtn.classList.add("d-none");
    showMoreBtn.classList.remove("d-block");

    let productsLengthArea = document.querySelector(
      `.${uniecClass} .products-length`
    );

    if (nextShowingProducts > productsLength) {
      if (productsLengthArea)
        productsLengthArea.innerHTML = `${productsLength}/${productsLength} Products`;
    } else {
      if (productsLengthArea)
        productsLengthArea.innerHTML = `${nextShowingProducts}/${productsLength} Products`;
    }

    products.forEach((card, index) => {
      if (index + 1 <= nextShowingProducts) {
        scalingShow(card as HTMLElement);
      } else {
        card.classList.add("d-none");
      }
    });
  });
}

function fixedTheTitleOnFocusIt(productsContainer: HTMLDivElement) {
  const uniecClass = productsContainer.getAttribute("data-un-class");

  const title = document.querySelector(
    `.${uniecClass} h1.big-title`
  ) as HTMLHeadingElement;

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

    titleHolder.style.height = titleHeight + "px";

    let productsHeight: number = productsContainer.clientHeight;

    let inProductsScope: boolean =
      scrollY > offsetTop && scrollY < offsetTop + productsHeight;

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

  if (productsHolder.classList.contains("empty")) return false;

  products.forEach((card) => {
    card.addEventListener("click", (clickedProduct) => {
      if (card.classList.contains("fake-product")) {
        return false;
      }

      let clickedElement = clickedProduct.target as HTMLElement;
      let productsData: Product[] = productsArray;
      let productId: string;

      if (privewProduct.classList.contains("h-0")) {
        privewProduct.classList.remove("h-0");
        privewProduct.classList.add("h-100");
      }

      if (clickedElement.tagName == "IMG") {
        let privewImage = clickedElement as HTMLImageElement;
        selectedImage.src = privewImage.src;

        let productDiv = clickedElement.parentNode as HTMLDivElement;

        productId = productDiv.getAttribute("prod-id") || "";
      } else if (clickedElement.tagName === "DIV") {
        if (clickedElement.classList.contains("product")) {
          let privewImage = clickedElement.children[0] as HTMLImageElement;
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

  emptyArea?.addEventListener("click", () => {
    if (!privewProduct.classList.contains("h-0")) {
      privewProduct.classList.add("h-0");
      privewProduct.classList.remove("h-100");
    }
  });
}

function addMoreButtonControl(productsHolder: HTMLDivElement) {
  let uniecClass = productsHolder.getAttribute("data-un-class");

  let products = document.querySelectorAll(
    `.${uniecClass} .holder .row .product`
  );

  let showMoreBtn = document.querySelector(`.${uniecClass} .show-more`);

  let productsNumber = 5;

  if (document.documentElement.clientWidth < 768) {
    productsNumber = 2;
  } else if (
    document.documentElement.clientWidth > 768 &&
    document.documentElement.clientWidth < 991
  ) {
    productsNumber = 4;
  } else {
    productsNumber = 5;
  }

  if (products.length <= productsNumber) {
    showMoreBtn?.classList.add("d-none");
  } else {
    showMoreBtn?.classList.remove("d-none");
  }
}

function scalingShow(ele: HTMLElement) {
  ele.style.scale = "0 1";
  ele.classList.remove("d-none");
  setTimeout(() => {
    ele.style.scale = "1 1";
  }, 0);
}
