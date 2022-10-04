import {CREATE_POST_URL} from "./api/endpoints";
import {getFromStorage} from "./utils/storage";
import {showErrorMsg} from "./utils/validation";

const createPostForm = document.querySelector('#create-post')
const postTitle = document.querySelector('#post-title')
const postBody = document.querySelector('#post-body')
const token = getFromStorage('accessToken')

createPostForm.addEventListener('submit', function (event) {
  event.preventDefault()
  const postData = {
    title: postTitle.value,
    body: postBody.value
  }
  createPost(CREATE_POST_URL, postData)
})

async function createPost(url, postData) {
  document.querySelector('#general-error').classList.add('hidden')
  try  {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(postData),
    };
    const response = await fetch(url, options)
    await response.json()
    if (response.ok) {
      location.href = '../main.html'
    } else {
      showErrorMsg(document.querySelector('#general-error'))
    }
  } catch (error) {
    showErrorMsg(document.querySelector('#general-error'))
  }
}
