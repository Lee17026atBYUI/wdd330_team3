import { getOrders } from "./externalServices.mjs";

export default async function currentOrders(selector, token) {
  try {
    const order = await getOrders(token.accessToken);
    const parent = document.querySelector(`${selector} tbody`);
    parent.innerHTML = order.map(orderTemplate).join("");
  } catch (err) {
    console.log(err);
  }
}

function orderTemplate(order) {
  return `<tr><td>${order.id}</td>
  <td>${new Date(order.orderDate).toLocaleDateString("en-US")}</td>
  <td>${order.orderTotal}</td></tr>`;
}
