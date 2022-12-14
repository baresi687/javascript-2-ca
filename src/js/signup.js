import {
  checkName,
  checkNoroffEmail,
  checkLength,
  checkConfirmPassword,
  validateString,
  showErrorMsg,
  isImage,
} from "./utils/validation";
import { USER_SIGNUP_URL } from "./api/endpoints";
import { addLoader, removeLoader } from "./utils/loader";

const signUpform = document.querySelector("form");
const name = document.querySelector("#name");
const nameError =
  "Name must not contain punctuation symbols apart from underscore";
const email = document.querySelector("#email-address");
const emailError = "Email must be a noroff.no or stud.noroff.no address";
const password = document.querySelector("#password");
const passwordError = "Password must 8 characters or more";
const confirmPassword = document.querySelector("#confirm-password");
const conFirmPasswordError = "Confirmed password does not match password";
const avatar = document.querySelector("#avatar");
const avatarError =
  "Avatar must have image filename ending (.jpg .gif .png etc)";
const formInputs = document.querySelectorAll("#form-inputs input");

signUpform.addEventListener("submit", function (event) {
  event.preventDefault();

  const isFormValid =
    validateString(name, checkName, null, nameError) &&
    validateString(email, checkNoroffEmail, null, emailError) &&
    validateString(password, checkLength, 8, passwordError) &&
    validateString(
      confirmPassword,
      checkConfirmPassword,
      password,
      conFirmPasswordError
    ) &&
    (!avatar.value || validateString(avatar, isImage, null, avatarError));

  if (isFormValid) {
    const formData = {
      name: name.value,
      email: email.value,
      password: password.value,
    };
    avatar.value ? (formData.avatar = avatar.value) : null;
    signUp(USER_SIGNUP_URL, formData);
  }
});

formInputs.forEach((item) => {
  item.onkeyup = function () {
    this.classList.remove("bg-red-50");
    this.nextElementSibling.innerHTML = "";
  };
});

async function signUp(url, postData) {
  document.querySelector("#general-error").classList.add("hidden");
  addLoader(signUpform.querySelector("#sign-up-btn"));
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
      location.href = "../login.html";
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
