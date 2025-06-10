import {
  productList,
  renderPageForCategory,
  setUpSort,
  attachQuickViewListeners
} from "./productList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

(async () => {
  loadHeaderFooter();
  const category = getParam("category");
  await productList(category, ".product-list");
  renderPageForCategory(category);
  setUpSort();
  attachQuickViewListeners();
})();

