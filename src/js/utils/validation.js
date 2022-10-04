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

function checkConfirmPassword(elem, password) {
  return elem.value.trim() === password.value.trim();
}

function validateString(elem, callBack, length, errorMsg) {
  if (!callBack(elem, length)) {
    elem.classList.add('bg-red-50')
    elem.nextElementSibling.innerHTML = errorMsg
    return false
  } else {
    return true
  }
}

function showErrorMsg(elem, message = 'Something went wrong.. please try again later') {
  elem.classList.remove('hidden');
  elem.innerHTML = message;
  elem.scrollIntoView({block: "center"})
}

export {checkName, checkNoroffEmail, checkLength, checkConfirmPassword, validateString, showErrorMsg}
