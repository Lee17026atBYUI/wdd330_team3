import { setLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

export default async function productDetails(productId) {
  addToCart();
  const productData = await findProductById(productId);
  renderProductDetails(productData);
}

function addToCart() {
  function addProductToCart(product) {
    setLocalStorage("so-cart", product);
  }

  // add to cart button event handler
  async function addToCartHandler(e) {
    const product = await findProductById(e.target.dataset.id);
    addProductToCart(product);
  }

  // add listener to Add to Cart button
  document
    .getElementById("addToCart")
    .addEventListener("click", addToCartHandler);
}

function renderProductDetails(productData) {
  // get elements from HTML
  const productName = document.getElementById("productName");
  const productNameWithoutBrand = document.getElementById(
    "productNameWithoutBrand",
  );
  const productImage = document.getElementById("productImage");
  const productFinalPrice = document.getElementById("productFinalPrice");
  const productColorName = document.getElementById("productColorName");
  const productDescriptionHtmlSimple = document.getElementById(
    "productDescriptionHtmlSimple",
  );
  const cartBtn = document.getElementById("addToCart");

  // get product information
  productName.textContent = productData.Brand.Name;
  productNameWithoutBrand.textContent = productData.NameWithoutBrand;
  productImage.src = productData.Image;
  productImage.alt = "Image of " + productData.Name;
  productFinalPrice.textContent = productData.FinalPrice;
  productColorName.textContent = productData.Colors[0].ColorName;
  productDescriptionHtmlSimple.innerHTML = productData.DescriptionHtmlSimple;
  cartBtn.setAttribute("data-id", productData.Id);
}
