function saveToStorage(key, value) {
  localStorage.setItem(key, value)
}

function clearStorage() {
  localStorage.clear()
  location.href = '/'
}

export {saveToStorage, clearStorage}
