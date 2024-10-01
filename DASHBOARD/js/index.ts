let from = document.getElementById("product-form") as HTMLFormElement;

const productCount = document.getElementById("products-length");

const deleteAll = document.getElementById("delete-all");

let productsArray: Product[] = [];

// Get The Products From Product.json

async function loadProducts() {
  let storegedProducts = window.localStorage.getItem("products");

  try {
    let response = await fetch("../products.json");

    let products = await response.json();

    productsArray = products;

    if (!productsArray.length)
      if (storegedProducts) productsArray = JSON.parse(storegedProducts);

    displayProducts(productsArray);
  } catch (error) {
    console.error(`Error Loading Data`, console.error);
  }
}

// Display The Products In The Page
interface Product {
  id: number;
  type: string;
  imgName: string;
  imgPath: string;
}

function displayProducts(products: Product[]) {
  let productsList = document.getElementById("products-list");

  if (productsList) {
    productsList.innerHTML = ``;

    products.forEach((prod) => {
      let productItem = document.createElement("li");

      productItem.classList.add("product-item", "list-group-item");

      productItem.innerHTML = `${prod.type}, ${prod.imgName}`;

      productsList.appendChild(productItem);
    });

    if (productCount) productCount.innerText = `${productsArray.length}`;
  }
}

// Add Product To The Products Array

function addProduct(products: Product[]) {
  const productId = document.getElementById("product-id") as HTMLInputElement;

  const productType = document.getElementById("prod-type") as HTMLSelectElement;

  const productPictureName = document.getElementById(
    "picture-name"
  ) as HTMLInputElement;

  if (productId.value) {
    let productIndex = products.findIndex(
      (prod) => prod.id == +productId.value
    );

    if (productIndex > -1) {
      products[productIndex].type = productType.value;
      products[productIndex].imgName = productPictureName.value;
    }
  } else {
    let imagePath = `../assets/images/`;
    const newProduct = {
      id: products.length ? products[products.length - 1].id + 1 : 1,
      type: productType.value,
      imgName: productPictureName.value,
      imgPath: `${imagePath}${productPictureName.value}`,
    } as Product;

    products.push(newProduct);
  }

  displayProducts(products);

  from?.reset();

  productPictureName.value = "";

  window.localStorage.setItem("products", JSON.stringify(products));
}

// Delete The Product From File

function deleteProduct(productId: number) {
  productsArray = productsArray.filter((prod: Product) => productId != prod.id);
  displayProducts(productsArray);
  saveJSONToFile(productsArray);
}

// Edit The Product

function editProduct(productId: number) {
  let productID = document.getElementById("product-id") as HTMLInputElement;
  let productType = document.getElementById("product-type") as HTMLInputElement;
  let productImageName = document.getElementById(
    "product-type"
  ) as HTMLSelectElement;

  fetch("../products.json")
    .then((res) => res.json())
    .then((data) => {
      let editingProduct = data.find(
        (prod: Product) => productId === prod.id
      ) as Product;

      productID.value = productID.id;

      productType.value = editingProduct.type;

      productImageName.value = editingProduct.imgName;
    });
}

// Save The Updated JSON File

function saveJSONToFile(products: Product[]) {
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

from?.addEventListener("submit", (e) => {
  e.preventDefault();
  addProduct(productsArray);
});

// Load The Product When The Page Loaded

window.addEventListener("load", () => {
  let storegedProducts = window.localStorage.getItem("products");

  loadProducts();
});

// Download The "Product.json" With Event Lisiener Click Download Button

document.getElementById("downloadJson")?.addEventListener("click", () => {
  saveJSONToFile(productsArray);
});

deleteAll?.addEventListener("click", () => {
  productsArray = [];

  displayProducts(productsArray);

});
