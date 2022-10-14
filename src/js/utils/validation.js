/**
 * Checks the name value on Sign Up page with regex provided by API.
 * @param elem User name input value
 * @return {boolean}
 */
function checkName(elem) {
  const regex = /^\w+$/
  return regex.test(elem.value.trim())
}

/**
 * Checks the email value on Sign Up or Log In pages with regex provided by API
 * @param elem Email input value
 * @return {boolean}
 */
function checkNoroffEmail(elem) {
  const regex = /^[\w\-.]+@(stud.)?noroff.no$/
  return regex.test(elem.value)
}

/**
 * Checks the length of Password input values.
 * @param elem User password value.
 * @param {number} length The required length of passwords.
 * @return {boolean}
 */
function checkLength(elem, length) {
  return elem.value.trim().length >= length
}

/**
 * Checks if the Password matches the confirmed Password on Sign Up page.
 * @param elem The confirm Password value
 * @param password The Password value
 * @return {boolean}
 */
function checkConfirmPassword(elem, password) {
  return elem.value.trim() === password.value.trim();
}

/**
 * Checks if the input values on Sign Up or Log in pages passes validation
 * @param elem Input element
 * @param callBack Function to call. Returns true or false
 * @param length Checks length of Passwords
 * @param errorMsg Error message displayed to the user if input value returns false
 * @return {boolean} If return is false, elem value will display an error message.
 */
function validateString(elem, callBack, length, errorMsg) {
  if (!callBack(elem, length)) {
    elem.classList.add('bg-red-50')
    elem.nextElementSibling.innerHTML = errorMsg
    return false
  } else {
    return true
  }
}

/**
 * Checking whether Image URL is an Image or not.
 * Inspiration and regex from https://bobbyhadz.com/blog/javascript-check-if-url-is-image
 * @param url Image URL
 * @return {boolean}
 */
function isImage(url) {
  const imgRegex = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/
  return imgRegex.test(url.trim());
}

/**
 * General Error message for API Calls.
 * @param elem Hidden element
 * @param {string} [message] General Error message
 */
function showErrorMsg(elem, message = 'Something went wrong.. please try again later') {
  elem.classList.remove('hidden');
  elem.innerHTML = message;
  elem.scrollIntoView({block: "center"})
}

export {checkName, checkNoroffEmail, checkLength, checkConfirmPassword, validateString, isImage, showErrorMsg}
