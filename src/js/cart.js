import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  // Will hide the total if cart is empty
  if (!cartItems || cartItems.length === 0) {
    document.querySelector(".cart-total").style.display = "none";
    return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  // Will display cart total if there is at least one item in cart
  const cartTotal = document.querySelector(".cart-total");
  cartTotal.style.display = "block";

  const totalPrice = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
  cartTotal.innerText = `Total: $${totalPrice.toFixed(2)}`;
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
