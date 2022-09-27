import "../css/style.css"
import {checkName, checkNoroffEmail, checkLength, checkConfirmPassword, validateString} from "./components/validation";
import {signUp} from "./signup";
import {API_BASE_URL, apiSignUp} from "./api/endpoints";

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

      const formData = {
        'name': name.value,
        'email': email.value,
        'password': password.value
      }
      signUp(API_BASE_URL+apiSignUp, formData)
      location.href = '../login.html'
    }
  })

  formInputs.forEach((item) => {
    item.onkeyup = function () {
      this.classList.remove('bg-red-50')
      this.nextElementSibling.innerHTML = ''
    }
  })
}

const formTest = {
  'name': 'gfdffhgdhdfghsrrrrg',
  'email': 'gfdgsghfdghdfghfgfgd@noroff.no',
  'password': '55555555'
}

const profileExists = {
  'name': 'gfdfsrrrrg',
  'email': 'gfdgsgfgfgd@noroff.no',
  'password': '55555555'
}

signUp(API_BASE_URL+apiSignUp, profileExists)
