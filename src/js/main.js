import "../css/style.css"

const formInputs = document.querySelectorAll('#form-inputs input')
const email = document.querySelector('#email-address')
const emailError = 'Email must be a noroff.no or stud.noroff.no adress'
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
  const regex = /^[\w\-.]+@(stud.)?noroff.no$/
  return regex.test(elem.value)
}

function checkName(elem) {
  const regex = /^[\w]+$/
  return regex.test(elem.trim())
}

console.log(checkName(' hesAf_ddsfsd'));

function checkLength(elem, length) {
  return elem.value.length >= length
}
