import {clearStorage} from "./utils/storage";

if(!localStorage.getItem('accessToken')) {location.href = '/'}

const token = localStorage.getItem('accessToken')
const user = JSON.parse(localStorage.getItem('userKey'))
const logOut = document.querySelector('#log-out')

logOut.addEventListener('click', function () {
  clearStorage()
})
