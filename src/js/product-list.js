import {
  productList,
  renderPageForCategory,
  setUpSort,
  searchProductList,
} from "./productList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();
const category = getParam("category");
const search = getParam("search");
if (category) {
  productList(category, ".product-list");
  renderPageForCategory(category, "Top Products: ");
} else if (search) {
  searchProductList(search, ".product-list");
  renderPageForCategory(search, "All Products Containing: ");
}
setUpSort();
