import {checkName, checkNoroffEmail, checkLength, checkConfirmPassword, validateString, showErrorMsg} from "./utils/validation";
import {USER_SIGNUP_URL} from "./api/endpoints";

const signUpform = document.querySelector('form')
const name = document.querySelector('#name')
const nameError = 'Name must not contain punctuation symbols apart from underscore'
const email = document.querySelector('#email-address')
const emailError = 'Email must be a noroff.no or stud.noroff.no adress'
const password = document.querySelector('#password')
const passwordError = 'Password must 8 characters or more'
const confirmPassword = document.querySelector('#confirm-password')
const conFirmPasswordError = 'Confirmed password does not match password'
const formInputs = document.querySelectorAll('#form-inputs input')

signUpform.addEventListener('submit', function (event)  {
  event.preventDefault()

  const isFormValid =
      validateString(name, name.value, checkName,null, nameError) &&
      validateString(email, email.value, checkNoroffEmail, null, emailError) &&
      validateString(password, password.value, checkLength, 8, passwordError) &&
      validateString(confirmPassword, confirmPassword.value, checkConfirmPassword, password.value, conFirmPasswordError);

  if (isFormValid) {
    const formData = {
      'name': name.value,
      'email': email.value,
      'password': password.value
    }
    signUp(USER_SIGNUP_URL, formData)
  }
})

formInputs.forEach((item) => {
  item.onkeyup = function () {
    this.classList.remove('bg-red-50')
    this.nextElementSibling.innerHTML = ''
  }
})

async function signUp(url, postData) {
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
      location.href = '../login.html'
    } else {
      showErrorMsg(document.querySelector('#general-error'), responseJSON.message)
    }
  } catch (error) {
    showErrorMsg(document.querySelector('#general-error'))
  }
}
