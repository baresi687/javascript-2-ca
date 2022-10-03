import {getFromStorage} from "../utils/storage";

const API_BASE_URL = 'https://nf-api.onrender.com/api/v1/social'
const apiSignUp = '/auth/register'
const apiLogin = '/auth/login'
const apiGetPosts = '/posts?_author=true&limit=12'
const apiCreatePost = '/posts'
let apiGetUserPosts = `/profiles/`
if (localStorage.getItem('userKey')) {
  const user = getFromStorage('userKey')
  const userParsed = JSON.parse(user)
  apiGetUserPosts += `${userParsed.name}?_posts=true`
}
const EDIT_DELETE_USER_POST = API_BASE_URL + '/posts/'

export {API_BASE_URL, apiSignUp, apiLogin, apiGetPosts, apiCreatePost, apiGetUserPosts, EDIT_DELETE_USER_POST}
