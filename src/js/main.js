import "../css/style.css"
import {checkName, checkNoroffEmail, checkLength, checkConfirmPassword, validateString} from "./componoents/validation";

if (document.querySelector('form')) {

  const formInputs = document.querySelectorAll('#form-inputs input')

  const signUpform = document.querySelector('form')
  const name = document.querySelector('#name')
  const nameError = 'Name must not contain punctuation symbols apart from underscore'
  const email = document.querySelector('#email-address')
  const emailError = 'Email must be a noroff.no or stud.noroff.no adress'
  const password = document.querySelector('#password')
  const passwordError = 'Password must 8 characters or more'
  const confirmPassword = document.querySelector('#confirm-password')
  const conFirmPasswordError = 'Confirmed password does not match password'

  signUpform.addEventListener('submit', function (event)  {
    event.preventDefault()
    if (validateString(name, name.value, checkName,null, nameError) && validateString(email, email.value, checkNoroffEmail, null, emailError) && validateString(password, password.value, checkLength, 8, passwordError) && validateString(confirmPassword, confirmPassword.value, checkConfirmPassword, password.value, conFirmPasswordError)) {
      location.href = '../main.html'
    }
  })

  formInputs.forEach((item) => {
    item.onkeyup = function () {
      this.classList.remove('bg-red-50')
      this.nextElementSibling.innerHTML = ''
    }
  })
}
