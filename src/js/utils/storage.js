function saveToStorage(key, value) {
  localStorage.setItem(key, value)
}

function clearStorage() {
  localStorage.clear()
  window.location.replace('/login.html')
}

export {saveToStorage, clearStorage}
