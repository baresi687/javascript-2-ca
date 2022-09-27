import {checkName, checkNoroffEmail, checkLength, checkConfirmPassword, validateString} from "./components/validation";
import {API_BASE_URL, apiSignUp} from "./api/endpoints";

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
  }
})

formInputs.forEach((item) => {
  item.onkeyup = function () {
    this.classList.remove('bg-red-50')
    this.nextElementSibling.innerHTML = ''
  }
})

async function signUp(url, postData) {
  document.querySelector('#general-error').innerHTML = ''
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    };
    const response = await fetch(url, options)
    const responseJSON = await response.json()
    if (!response.ok) {
      document.querySelector('#general-error').innerHTML = responseJSON.message;
      document.querySelector('#general-error').scrollIntoView({block: "center"})
    } else {
      location.href = '../login.html'
    }
  } catch (error) {
    console.log(error);
    document.querySelector('form').innerHTML += `<h1>Something went wrong.. please try again later</h1>`;
  }
}

/*const formTest = {
  'name': 'gfdffhgfgdhdfghsrrrrg',
  'email': 'gfdgsghfdggfhdfghfgfgd@noroff.no',
  'password': '55555555'
}

const profileExists = {
  'name': 'gfdfsrrrrg',
  'email': 'gfdgsgfgfgd@noroff.no',
  'password': '55555555'
}

signUp(API_BASE_URL+apiSignUp, formTest)*/
