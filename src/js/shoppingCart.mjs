import { getLocalStorage } from "./utils.mjs";

export function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  const emptyCartHtml = `<h3>Empty Cart. It is so sad and lonely here. Please buy a tent to make it warm and cozy.</h3>`;
  // use optional chaining to check if this bad boy is empty
  const htmlItems = cartItems?.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems
    ? htmlItems.join("")
    : emptyCartHtml;

  // Will hide the total if cart is empty
  if (!cartItems || cartItems.length === 0) {
    document.querySelector(".cart-total").style.display = "none";
    return;
  }

  // Will display cart total if there is at least one item in cart
  const cartTotal = document.querySelector(".cart-total");
  cartTotal.style.display = "block";

  const totalPrice = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
  cartTotal.innerText = `Total: $${totalPrice.toFixed(2)}`;

  // Attach delete button listeners AFTER rendering
  document.querySelectorAll(".delete-btn").forEach((button, index) => {
    button.addEventListener("click", () => {
      // Remove the item at this index
      const updatedCart = cartItems.filter((_, i) => i !== index);
      localStorage.setItem("so-cart", JSON.stringify(updatedCart));
      renderCartContents(); // re-render the updated cart
    });
  });
}

export function cartItemTemplate(item) {
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
  <button class="delete-btn" aria-label="Remove item">&times;</button>
</li>`;
  return newItem;
}