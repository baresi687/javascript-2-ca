function checkName(elem) {
  const regex = /^[\w]+$/
  return regex.test(elem.value.trim())
}

function checkNoroffEmail(elem) {
  const regex = /^[\w\-.]+@(stud.)?noroff.no$/
  return regex.test(elem.value)
}

function checkLength(elem, length) {
  return elem.value.trim().length >= length
}

function checkConfirmPassword(value, password) {
  return value.value.trim() === password.trim();
}

function validateString(elem, value, callBack, length, errorMsg) {
  if (!callBack(elem, length)) {
    elem.classList.add('bg-red-50')
    elem.nextElementSibling.innerHTML = errorMsg
    return false
  } else {
    return true
  }
}

export {checkName, checkNoroffEmail, checkLength, checkConfirmPassword, validateString}
