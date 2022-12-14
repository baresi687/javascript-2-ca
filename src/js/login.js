import {
  checkNoroffEmail,
  checkLength,
  validateString,
  showErrorMsg,
} from "./utils/validation";
import { saveToStorage } from "./utils/storage";
import { USER_LOGIN_URL } from "./api/endpoints";
import { addLoader, removeLoader } from "./utils/loader";

const loginForm = document.querySelector("form");
const email = document.querySelector("#email-address");
const emailError = "Email must be a noroff.no or stud.noroff.no address";
const password = document.querySelector("#password");
const passwordError = "Password must 8 characters or more";
const formInputs = document.querySelectorAll("#form-inputs input");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const isFormValid =
    validateString(email, checkNoroffEmail, null, emailError) &&
    validateString(password, checkLength, 8, passwordError);

  if (isFormValid) {
    const formData = {
      email: email.value,
      password: password.value,
    };
    login(USER_LOGIN_URL, formData);
  }
});

formInputs.forEach((item) => {
  item.onkeyup = function () {
    this.classList.remove("bg-red-50");
    this.nextElementSibling.innerHTML = "";
  };
});

async function login(url, postData) {
  document.querySelector("#general-error").classList.add("hidden");
  addLoader(loginForm.querySelector("#login-btn"));
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    };
    const response = await fetch(url, options);
    const responseJSON = await response.json();
    if (response.ok) {
      saveToStorage("accessToken", responseJSON.accessToken);

      const userKey = {
        name: responseJSON.name,
        email: responseJSON.email,
      };

      saveToStorage("userKey", userKey);
      location.href = "../main.html";
    } else {
      showErrorMsg(
        document.querySelector("#general-error"),
        responseJSON.errors[0].message
      );
    }
  } catch (error) {
    showErrorMsg(document.querySelector("#general-error"));
  } finally {
    removeLoader();
  }
}
