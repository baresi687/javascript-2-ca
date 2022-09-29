import "../css/style.css";

if (window.location.pathname !== '/main.html' &&
    localStorage.getItem('accessToken') !== null &&
    localStorage.getItem('userKey') !== null) {
  location.href = '../main.html'
}
