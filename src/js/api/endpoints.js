import {name} from "../withToken";

const API_BASE_URL = 'https://nf-api.onrender.com/api/v1/social'
const apiSignUp = '/auth/register'
const apiLogin = '/auth/login'
const apiGetPosts = '/posts?_author=true&limit=12'
const apiCreatePost = '/posts'
const apiGetUserPosts = `/profiles/${name}?_posts=true`

export {API_BASE_URL, apiSignUp, apiLogin, apiGetPosts, apiCreatePost, apiGetUserPosts}
