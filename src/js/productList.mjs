import { getProductsByCategory } from "./externalServices.mjs";
import {getParam} from "./utils.mjs";

export async function productList(category, htmlElement){
  const product = await getProductsByCategory(category);
  renderProductList(product, htmlElement);
}

function renderProductList(products, htmlElement) {
  products.forEach((data) => {
    const template = productCardTemplate(data);
    const element = document.querySelector(htmlElement);
    const li = document.createElement("li");
    li.innerHTML = template;
    element.append(li);
  });
}

function productCardTemplate(product){
    return `<li class="product-card">
            <a href="../product_pages/index.html?product=${product.Id}">
              <img
                src="${product.Images.PrimaryMedium}"
                alt="Image of ${product.Name}"
              />
              <h3 class="card__brand">${product.Brand.Name}</h3>
              <h2 class="card__name">${product.NameWithoutBrand}</h2>
              <p class="product-card__price">${product.FinalPrice}</p></a>
            </li>`;
}

export function renderPageForCategory(category, text) {
  const h2_title = document.getElementById("product_title");
  const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);
  h2_title.textContent = `${text} ${capitalizedCategory}`;
  document.title = `Sleep Outside | ${text} ${capitalizedCategory}`;
}

export function setUpSort() {
  async function sortHandler(e) {
    sortProducts(e.target.value);
  }
  document.getElementById("product_sort").addEventListener("change", sortHandler);
}

async function sortProducts(order) {
  // start by getting the data
  const category = getParam("category");
  const search = getParam("search");
  let product = [];
  if (category) {
    product = await getProductsByCategory(category);
  } else if (search) {
    product = await searchAllProducts(search);
  }

  // sort options match with values in product_list/index.html #product_sort
  switch (order) {
    case "name_asc": // name a - z
      product.sort((a, b) => a.NameWithoutBrand.localeCompare(b.NameWithoutBrand));
      break;
    case "name_desc":
      product.sort((a, b) => b.NameWithoutBrand.localeCompare(a.NameWithoutBrand));
      break;
    case "price_asc": // price low to high
      product.sort((a, b) => a.FinalPrice - b.FinalPrice);
      break;
    case "price_desc":
      product.sort((a, b) => b.FinalPrice - a.FinalPrice);
      break;
    default:
      break;
  }

  // wipe the grid of products
  const element = document.querySelector(".product-list");
  element.innerHTML = "";

  // rebuild the display
  renderProductList(product, ".product-list");
}

export async function searchProductList(search, htmlElement) {
  const foundProducts = await searchAllProducts(search);
  renderProductList(foundProducts, htmlElement);
}

async function searchAllProducts(search) {
  const allCategories = ["tents", "backpacks", "sleeping-bags", "hammocks"];
  let foundProducts = [];
  for await (const category of allCategories) {
    // get all products for this category
    const products = await getProductsByCategory(category);
    products.forEach((product) => {
      // only keep the products that match the search term
      // for now it's just in the name (with brand)
      if (product.Name.toLowerCase().includes(search.toLowerCase())) {
        foundProducts.push(product);
      }
    });
  }
  return foundProducts;
}

// Optional function: renderList - move adding to the document to its own funciton
