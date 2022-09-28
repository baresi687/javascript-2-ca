import {
  checkNoroffEmail,
  checkLength,
  validateString,
  showErrorMsg

} from "./utils/validation";
import {API_BASE_URL, apiLogin} from "./api/endpoints";

const loginForm = document.querySelector('form')
const email = document.querySelector('#email-address')
const emailError = 'Email must be a noroff.no or stud.noroff.no adress'
const password = document.querySelector('#password')
const passwordError = 'Password must 8 characters or more'
const formInputs = document.querySelectorAll('#form-inputs input')

loginForm.addEventListener('submit', function (event)  {
  event.preventDefault()

  const isFormValid =
      validateString(email, email.value, checkNoroffEmail, null, emailError) &&
      validateString(password, password.value, checkLength, 8, passwordError)

  if (isFormValid) {
    const formData = {
      'email': email.value,
      'password': password.value
    }
    login(API_BASE_URL+apiLogin, formData)
  }
})

formInputs.forEach((item) => {
  item.onkeyup = function () {
    this.classList.remove('bg-red-50')
    this.nextElementSibling.innerHTML = ''
  }
})

async function login(url, postData) {
  document.querySelector('#general-error').classList.add('hidden')
  try  {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    };
    const response = await fetch(url, options)
    const responseJSON = await response.json()
    if (response.ok) {
      console.log(responseJSON);
      location.href = '../main.html'
    } else {
      showErrorMsg(document.querySelector('#general-error'), responseJSON.message)
    }
  } catch (error) {
    showErrorMsg(
        document.querySelector('#general-error'),
        'Something went wrong.. please try again later')
  }
}
