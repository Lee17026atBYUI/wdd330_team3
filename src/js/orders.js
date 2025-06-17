import { checkLogin } from "./auth.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import currentOrders from "./currentOrders.mjs";

const token = checkLogin();

loadHeaderFooter();

currentOrders("#orders", token);
