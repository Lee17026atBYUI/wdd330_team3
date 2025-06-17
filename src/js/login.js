import { loadHeaderFooter, getParam } from "./utils.mjs";
import { login } from "./auth.mjs";

loadHeaderFooter();

const redirect = getParam("redirect");

document.getElementById("login").addEventListener("click", async (event) => {
  event.preventDefault();
  const username = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const creds = { email: username, password: password };

  await login(creds, redirect);
});

const checkbox = document.getElementById("signupPasswordShow");
checkbox.addEventListener("change", showPassword);

function showPassword() {
  const id = "loginPassword";
  var x = document.getElementById(id);
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}
