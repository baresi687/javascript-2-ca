import {CREATE_POST_URL} from "./api/endpoints";
import {getFromStorage} from "./utils/storage";
import {showErrorMsg} from "./utils/validation";

const createPostForm = document.querySelector('#create-post')
const postTitle = document.querySelector('#post-title')
const postBody = document.querySelector('#post-body')
const postImage = document.querySelector('#post-img')
const token = getFromStorage('accessToken')

createPostForm.addEventListener('submit', function (event) {
  event.preventDefault()
  const postData = {
    title: postTitle.value,
    body: postBody.value,
  }
  postImage.value ? postData.media = postImage.value : null
  createPost(CREATE_POST_URL, postData)
})

async function createPost(url, postData) {
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
      if (response.status === 400) {
        showErrorMsg(document.querySelector('#general-error'),
            'Image must a valid and a fully formed URL that links to a live and publicly accessible image')
      } else {
        showErrorMsg(document.querySelector('#general-error'))
      }
    }
  } catch (error) {
    showErrorMsg(document.querySelector('#general-error'))
  }
}
