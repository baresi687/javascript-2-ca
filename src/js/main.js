import "../css/style.css"

const formInputs = document.querySelectorAll('#form-inputs input')
const email = document.querySelector('#email-address')
const emailError = 'Email must be a valid noroff.no adress'
const password = document.querySelector('#password')
const passwordError = 'Password must 8 characters or more'
const form = document.querySelector('form')

formInputs.forEach((item) => {
  item.onkeyup = function () {
    this.classList.remove('bg-red-50')
    this.nextElementSibling.innerHTML = ''
  }
})

form.addEventListener('submit', function (event)  {
  event.preventDefault()
  if (validateString(email, email.value, checkNoroffEmail, null, emailError) && validateString(password, password.value, checkLength, 8, passwordError)) {
    location.href = '../main.html'
  }
})

function validateString(elem, value, callBack, length, errorMsg) {
  if (!callBack(elem, length)) {
    elem.classList.add('bg-red-50')
    elem.nextElementSibling.innerHTML = errorMsg
    return false
  } else {
    return true
  }
}

function checkNoroffEmail(elem) {
  return elem.value.endsWith('noroff.no')
}

function checkLength(elem, length) {
  return elem.value.length >= length
}
