let products = Array.from(document.querySelectorAll(".products"));
async function getProducts() {
  let requset = await fetch(".././products/products.json");

  let data = await requset.json();

  console.log(Array.isArray(data));

  interface product {
    imgPath: string;
    type: string;
  }

  data.forEach((e: product) => {
    let div = document.createElement("div");

    div.classList.add(
      "product",
      "col-sm-12",
      "col-md-5",
      "col-lg-2",
      "border",
      "border-gray",
      "rounded-3"
    );

    let img = document.createElement("img") as HTMLImageElement;

    img.classList.add(
      "img-fluid",
      "show-text-x-50",
      "show-text-x-50",
      "rounded-4"
    );

    img.src = e.imgPath;

    div.appendChild(img);

    document.getElementById(`${e.type}-prod`)?.prepend(div);
  });

  products.forEach((e) => {
    let event = e as HTMLDivElement;
    // Show All Products Length
    getProductsNumber(event);

    // display Specified Products In Page
    displaySpecifiedNumberOfProduct(event);

    // Add More Products On Click Show More Button
    addShowingProductsNumber(event);

    // Fix The Products Title In Top If It In Them Products Scoope !
    setTheTitleFixedTopIfInProductScoope(event);

    // Review The Clicked Image In Advance Scoope
    showClickedPictureMoreDetails(event);
  });
}
getProducts();

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
      scrollY >= offsetTop &&
      scrollY < offsetTop + (productsHeight - titleHeight);
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
  let productsArray = Array.from(productsHolder.children);
  productsArray.forEach((card) => {
    card.addEventListener("click", () => {
      gallery.classList.remove("d-none");
      gallery.classList.add("d-flex");

      let clickedImage = card.children[0] as HTMLImageElement;

      if (clickedImage.tagName == "IMG") selectedImage.src = clickedImage.src;

      imageContainer.style.height = selectedImage.clientHeight + "px";
    });
  });
}

let imageContainer = document.querySelector(".gallery .image") as HTMLElement;

let gallery = document.getElementById("gallery") as HTMLElement;

let selectedImage = document.getElementById(
  "selected-image"
) as HTMLImageElement;

selectedImage.style.scale = `1`;

let galleryCloseButton = document.querySelector(".gallery .close-gallery");

let toolsBox = document.querySelector(".gallery .tools");

let fullScreenImage = document.querySelector(
  ".gallery .tools .full-screen"
) as HTMLElement;

let zoomInImage = document.querySelector(".gallery .tools .zoom-in");

let zoomOutImage = document.querySelector(".gallery .tools .zoom-out");

let closeGallery = document.querySelector(".gallery .tools .close");

let share = document.querySelector(".gallery .tools .share");

let whatsappShare = document.querySelector(".gallery .tools .whatsapp");

galleryCloseButton?.addEventListener("click", () => {
  gallery.classList.remove("d-flex");

  gallery.classList.add("d-none");

  document.exitFullscreen();
});

fullScreenImage?.addEventListener("click", () => {
  if (fullScreenImage.dataset.fullscreen == "true") {
    fullScreenImage.dataset.fullscreen = "false";

    fullScreenImage.innerHTML = `<i class="fa-solid fa-expand"></i>`;

    document.exitFullscreen();
  } else {
    fullScreenImage.dataset.fullscreen = "true";

    gallery.requestFullscreen();

    fullScreenImage.innerHTML = `<i class="fa-solid fa-compress"></i>`;
  }
});

zoomInImage?.addEventListener("click", () => {
  let currentScale = parseInt(window.getComputedStyle(selectedImage).scale);
  console.log(currentScale);
  if (currentScale <= 4) {
    selectedImage.style.scale = `${currentScale * 2}`;
  }
});

zoomOutImage?.addEventListener("click", () => {
  let currentScale = parseInt(window.getComputedStyle(selectedImage).scale);

  console.log(currentScale);
  if (currentScale > 1) {
    selectedImage.style.scale = `${currentScale / 2}`;
  }
});

function scalingShow(ele: HTMLElement) {
  ele.style.scale = "0 1";
  ele.classList.remove("d-none");
  setTimeout(() => {
    ele.style.scale = "1 1";
  }, 0);
}
