import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const emptyCartHtml = `<h3>Empty Cart. It is so sad and lonely here. Please buy a tent to make it warm and cozy.</h3>`;
  // use optional chaining to check if this bad boy is empty
  const htmlItems = cartItems?.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems ? htmlItems.join("") : emptyCartHtml;
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
