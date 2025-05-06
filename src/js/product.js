import { getParam } from "./utils.mjs";
import productDetails from "./productDetails.mjs";

// get product id using getParam
const productId = getParam("product");
productDetails(productId);
console.log(productId);
