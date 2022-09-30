function formatDate(input) {
  return new Date(input).toLocaleDateString('en-us', {
    weekday: 'long',
  })
}

export {formatDate}
