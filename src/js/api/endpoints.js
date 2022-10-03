import {getFromStorage} from "../utils/storage";

const API_BASE_URL = 'https://nf-api.onrender.com/api/v1/social'
const USER_SIGNUP_URL = API_BASE_URL + '/auth/register'
const USER_LOGIN_URL = API_BASE_URL+ '/auth/login'
const GET_POSTS_URL = API_BASE_URL + '/posts?_author=true&limit=12'
const CREATE_POST_URL = API_BASE_URL + '/posts'
let GET_USER_POSTS_URL = API_BASE_URL + `/profiles/`
if (localStorage.getItem('userKey')) {
  const user = getFromStorage('userKey')
  const userParsed = JSON.parse(user)
  GET_USER_POSTS_URL += `${userParsed.name}?_posts=true`
}
const EDIT_DELETE_USER_POST = API_BASE_URL + '/posts/'

export {API_BASE_URL, USER_SIGNUP_URL, USER_LOGIN_URL, GET_POSTS_URL, CREATE_POST_URL, GET_USER_POSTS_URL, EDIT_DELETE_USER_POST}
