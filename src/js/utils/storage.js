function saveToStorage(key, value) {
  localStorage.setItem(key, value)
}

function getFromStorage(key) {
 return localStorage.getItem(key)
}

function clearStorage() {
  localStorage.clear()
  window.location.replace('/login.html')
}

export {saveToStorage, clearStorage, getFromStorage}
