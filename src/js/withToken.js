import {clearStorage} from "./utils/storage";

if(!localStorage.getItem('accessToken')) {location.href = '/login.html'}

const token = localStorage.getItem('accessToken')
const {name, email} = JSON.parse(localStorage.getItem('userKey'))
const userGreeting = document.querySelector('#user-greeting')
const logOut = document.querySelector('#log-out')

userGreeting.innerHTML = `Hi ${name}`
logOut.addEventListener('click', function () {
  clearStorage()
})

export {token, name, email}
