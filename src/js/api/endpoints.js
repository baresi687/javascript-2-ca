import {getFromStorage} from "../utils/storage";

const API_BASE_URL = 'https://nf-api.onrender.com/api/v1/social'
const apiSignUp = '/auth/register'
const apiLogin = '/auth/login'
const apiGetPosts = '/posts?_author=true&limit=12'
const apiCreatePost = '/posts'
let apiGetUserPosts = `/profiles/`
if (localStorage.getItem('userKey')) {
  const user = getFromStorage('userKey')
  apiGetUserPosts += `${user.name}?_posts=true`
}

export {API_BASE_URL, apiSignUp, apiLogin, apiGetPosts, apiCreatePost, apiGetUserPosts}
