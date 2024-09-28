// Start Landing

let menuShowButton = <HTMLElement>document.getElementById("menu-btn");

let menuList = <HTMLElement>document.querySelector("section .menu-area");

let menuCloseButton = <HTMLElement>document.getElementById("close-menu");

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

const showProducts = <HTMLElement>(
  document.querySelector("footer div ul li.show-products")
);

showProducts.addEventListener("click", () => {
  let products = <HTMLElement>(
    document.querySelector("footer div ul li.show-products ul")
  );

  if (products.clientWidth > 1) {
    products.style.cssText = `height: 0px; width: 0px; opacity: 0;`;
  } else {
    products.style.cssText = `height: 150px; width: 100%; opacity: 1;`;
  }
});

// // End Footer

// Methods And Functions

// Get Css Property Value From Element

interface HTMLElement {
  /**
   * @param {string} property
   * @returns {string}
   * @example
   * // Assuming an element with id 'myDiv' has a width set in CSS
   * const div = document.getElementById('myDiv') as HTMLDivElement;
   * console.log(div.getElementStyle('width')); // Logs the computed width
   */

  getElementStyle(property: string): string;
}

HTMLElement.prototype.getElementStyle = function (property: string): string {
  return window.getComputedStyle(this).getPropertyValue(property);
};

console.log(document.body.getElementStyle("width"));

// Methods And Functions
