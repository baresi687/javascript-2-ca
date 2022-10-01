function saveToStorage(key, value) {
  localStorage.setItem(key, value)
}

function getFromStorage(key) {
  const value = localStorage.getItem(key)
  return JSON.parse(value)
}

function clearStorage() {
  localStorage.clear()
  window.location.replace('/login.html')
}

export {saveToStorage, clearStorage, getFromStorage}
