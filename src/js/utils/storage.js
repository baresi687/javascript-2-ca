function saveToStorage(key, value) {
  localStorage.setItem(key, value)
}

function clearStorage() {
  localStorage.clear()
  location.href = '/login.html'
}

export {saveToStorage, clearStorage}
