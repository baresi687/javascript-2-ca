import "../css/style.css";

const {pathname} = window.location

if ((pathname === '/login.html' || pathname === '/') &&
    localStorage.getItem('accessToken') !== null &&
    localStorage.getItem('userKey') !== null) {
  location.href = '../main.html'
}
