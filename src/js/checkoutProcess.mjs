const checkoutProcess = {
    key: "",
    outputSelector: "",
    list: [],
    numberOfItems: 0,
    itemTotal: 0,
    shipping: 0,
    tax: 0,
    orderTotal: 0,
    init: function (key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = getLocalStorage(key);
        this.calculateItemSummary();
    },
  calculateItemSummary: function() {
    // calculate and display the total amount of the items in the cart, and the number of items.
    this.numberOfItems = this.list.length
    const itemLabel = document.querySelector("#items")
    itemLabel.textContent += `(${this.numberOfItems})`
    const totalPrice = this.list.reduce((sum, item) => sum + item.FinalPrice, 0);
    this.itemTotal = `${totalPrice.toFixed(2)}`;
  },
  calculateOrdertotal: function() {
    // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
    this.tax = this.itemTotal * 0.06
    this.shipping = 10 + ((this.numberOfItems.length - 1) * 2)
    this.orderTotal = this.itemTotal + this.tax + this.shipping
    // display the totals.
    this.displayOrderTotals();
  },
  displayOrderTotals: function() {
    // once the totals are all calculated display them in the order summary page
    const form = document.querySelector(".checkoutForm")
    const numberOfItems = document.querySelector("#items")
    numberOfItems.textContent += `(${this.numberOfItems})`
    form.subtotal.value = this.itemTotal
    form.shipping.value = this.shipping
    form.tax.value = this.tax
    form.orderTotal.value = this.orderTotal
  }
  
}
export default checkoutProcess;