import { getData } from "./productData.mjs";

async function createAlert() {
  const category = "alerts";
  const alertData = await getData(category);
  console.log("in creatAlert");
  console.log(alertData);

  if (alertData) {
    console.log("in if statement");
    const pageBody = document.querySelector("main");
    const alertModule = document.createElement("section");
    alertModule.className = "alert-list";

    alertData.forEach((data) => {
      console.log("in foreach");
      const alert = document.createElement("p");
      alert.textContent = data.message;
      alert.style.background = data.background;
      alert.style.color = data.color;

      alertModule.append(alert);
    });

    pageBody.prepend(alertModule);
  }
}

createAlert();
