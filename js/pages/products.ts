let products = Array.from(document.querySelectorAll(".product"));

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

products.forEach((ele: Element, index: number) => {
  let prod = ele as HTMLElement;

  let showMore = document.querySelector(`${prod.dataset.showmore}`);

  let showLimit = 4;

  let productsHolder = Array.from(
    document.querySelectorAll(`.holder-${index + 1} .row > div`)
  );

  let productTitle = document.querySelector(
    `.product > h1.big-title`
  ) as HTMLElement;

  productTitle?.classList.add("bg-white");

  let titleHeight = productTitle?.clientHeight;

  productTitle?.remove();

  let titleHolder = document.createElement("div");

  titleHolder.classList.add("title-holder", "big-title", "bg-white");

  if (productTitle) {
    titleHolder.appendChild(productTitle);
  }

  prod.prepend(titleHolder);

  titleHolder.style.height = `${titleHeight}px`;

  titleHolder.style.width = `100%`;

  // Function to update the position of the product title

  function updateProductTitlePosition() {
    let scrollY: number = window.scrollY;

    let offsetTop: number = prod.offsetTop;

    // let titleHeight: number = productTitle.clientHeight;

    let productsHeight: number = prod.clientHeight;

    let inProductsScope: boolean =
      scrollY >= offsetTop &&
      scrollY < offsetTop + (productsHeight - titleHeight);

    productTitle.classList.toggle("position-fixed", inProductsScope);

    if (inProductsScope) {
      productTitle.classList.add(
        "start-0",
        "py-4",
        "px-2",
        "w-100",
        "z-3",
        "shadow-sm"
      );
      const computedMarginTop = window.getComputedStyle(productTitle).marginTop;

      productTitle.style.top = `-${computedMarginTop}`;
    } else {
      productTitle.classList.remove(
        "start-0",
        "py-4",
        "px-2",
        "w-100",
        "z-3",
        "shadow-sm"
      );

      productTitle.style.top = ` `;
    }
  }

  // Event listener for scroll
  window.addEventListener("scroll", updateProductTitlePosition);

  showMore?.addEventListener("click", () => {
    let productsHolder = Array.from(
      document.querySelectorAll(`.holder-${index + 1} .row > div`)
    );

    let startShowingCards = Array.from(productsHolder).filter((crd) => {
      let card = crd;
      return !card.classList.contains("d-none");
    }).length;

    if (startShowingCards < productsHolder.length) {
      productsHolder.forEach((e, i) => {
        if (i >= startShowingCards && i < startShowingCards + showLimit) {
          scalingShow(e as HTMLElement);

          if (startShowingCards + showLimit >= productsHolder.length)
            showMore?.classList.add("d-none");
        }
      });
    } else {
      showMore?.classList.add("d-none");
    }

    let endShowingCards = Array.from(productsHolder).filter((crd) => {
      let card = crd;
      return !card.classList.contains("d-none");
    }).length;

    let sizeLabel = document.querySelector(`${prod.dataset.sizelabel}`);
    if (sizeLabel) {
      sizeLabel.innerHTML =
        `${endShowingCards} Of ${productsHolder.length}` || "0 Items ";
    }
  });

  productsHolder.forEach((card, index) => {
    if (index >= 8) {
      card.classList.add("d-none");
    }
  });

  let sizeLabel = document.querySelector(`${prod.dataset.sizelabel}`);

  if (sizeLabel) {
    sizeLabel.innerHTML =
      ` All Items Is : ${productsHolder.length}` || "0 Items ";
  }

  productsHolder.forEach((card) => {
    card.addEventListener("click", () => {
      gallery.classList.remove("d-none");
      gallery.classList.add("d-flex");

      let clickedImage = card.children[0] as HTMLImageElement;

      if (clickedImage.tagName == "IMG") selectedImage.src = clickedImage.src;

      imageContainer.style.height = selectedImage.clientHeight + "px";
    });
  });
});

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

// card.addEventListener("click", () => {
//   let img = card.firstElementChild as HTMLImageElement;

//   gallery.classList.remove("d-none");

//   gallery.classList.add("d-flex");

//   imageContainer.style.maxWidth = "75%";

//   // imageContainer.style.maxHeight = imageContainer.clientHeight + "px";

//   imageContainer.style.overflow = "hidden";

//   selectedImage.src = img.src;

//   let scale = 1;
//   let originX = 0;
//   let originY = 0;

//   selectedImage.addEventListener("wheel", (event) => {
//     event.preventDefault();
//     scale += event.deltaY * -0.01;
//     scale = Math.min(Math.max(1, scale), 3);
//     selectedImage.style.transform = `scale(${scale}) translate(${originX}px, ${originY}px)`;
//   });

//   let isDragging = false;
//   let startX: number, startY: number;

//   selectedImage.addEventListener("mousedown", (event) => {
//     isDragging = true;
//     startX = event.clientX;
//     startY = event.clientY;
//     selectedImage.style.cursor = "grabbing";
//   });

//   selectedImage.addEventListener("mouseup", () => {
//     isDragging = false;
//     selectedImage.style.cursor = "grab";
//   });

//   selectedImage.addEventListener("mousemove", (event) => {
//     if (isDragging) {
//       let dx = (event.clientX - startX) / scale;
//       let dy = (event.clientY - startY) / scale;
//       originX += dx;
//       originY += dy;
//       startX = event.clientX;
//       startY = event.clientY;
//       selectedImage.style.transform = `scale(${scale}) translate(${originX}px, ${originY}px)`;
//     }
//   });

//   fullScreenImage?.addEventListener("click", () => {
//     console.log("fullscreen");
//     gallery.requestFullscreen();
//     selectedImage.style.maxWidth = "90%";
//   });

//   zoomInImage?.addEventListener("click", () => {
//     let currentScale = parseInt(window.getComputedStyle(selectedImage).scale);

//     if (currentScale <= 10) {
//       selectedImage.style.scale = ` ${currentScale * 2}`;
//     }
//   });

//   zoomOutImage?.addEventListener("click", () => {
//     let currentScale = parseInt(window.getComputedStyle(selectedImage).scale);

//     if (currentScale > 1) {
//       // selectedImage.style.scale = ` ${currentScale / 2}`;
//     }
//   });
// });
