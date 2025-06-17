import { loginRequest } from "./externalServices.mjs";
import { alertMessage, getLocalStorage } from "./utils.mjs";
import { jwtDecode } from "jwt-decode";

const tokenKey = "so-token";

export async function login(creds, redirect = "/") {
  try {
    const token = await loginRequest(creds);
    localStorage.setItem(tokenKey, JSON.stringify(token));
    window.location = redirect;
  } catch (err) {
    alertMessage(err.message.message);
  }
}

function isTokenValid(token) {
  if (token) {
    const decoded = jwtDecode(token.accessToken);
    let currentDate = new Date();
    if (decoded.exp * 1000 < currentDate.getTime()) {
      console.log("Token had expired.");
      return false;
    } else {
      console.log("Valid token.");
      return true;
    }
  } else {
    return false;
  }
}

export function checkLogin() {
  const token = getLocalStorage(tokenKey);

  const validToken = isTokenValid(token);

  if (!validToken) {
    localStorage.removeItem(tokenKey);
    const currentWindow = window.location;
    window.location = `login/index.html?redirect=${currentWindow.pathname}`;
  } else {
    return token;
  }
}
