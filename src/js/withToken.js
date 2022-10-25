import { clearStorage, getFromStorage } from "./utils/storage";

if (!localStorage.getItem("accessToken")) {
  location.href = "/login.html";
}

const { name } = getFromStorage("userKey");
const userGreeting = document.querySelector("#user-greeting");
const logOut = document.querySelector("#log-out");

userGreeting.innerHTML = `Hi ${name}`;
logOut.addEventListener("click", function () {
  clearStorage();
});
