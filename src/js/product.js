import { getParam } from "./utils.mjs";
import productDetails from "./productDetails.mjs";

// get product id using getParam
const productId = getParam("product");
productDetails(productId);

// Update cart counter on page load
const items = JSON.parse(localStorage.getItem("so-cart")) || [];
const counterEl = document.getElementById("cartCounter");
if (counterEl) {
  counterEl.textContent = items.length > 0 ? items.length : "";
}
