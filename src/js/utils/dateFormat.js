function formatDate(input) {
  return new Date(input).toLocaleDateString("en-us", {
    weekday: "long",
  });
}

function formatDateLong(input) {
  return new Date(input).toLocaleDateString("en-us", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export { formatDate, formatDateLong };
