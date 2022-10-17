import {CREATE_POST_URL} from "./api/endpoints";
import {getFromStorage} from "./utils/storage";
import {isImage, showErrorMsg} from "./utils/validation";
import {addLoader, removeLoader} from "./utils/loader";

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

  if (postImage.value) {
    if (isImage(postImage.value)) {
      postData.media = postImage.value
      createPost(CREATE_POST_URL, postData)
    } else {
      showErrorMsg(document.querySelector('#general-error'),'Image URL must have a filename ending of .jpg, .gif, .png etc.')
    }
  } else {
    createPost(CREATE_POST_URL, postData)
  }
})

postImage.onkeyup = function () {
  document.querySelector('#general-error').classList.add('hidden')
}

async function createPost(url, postData) {
  addLoader(createPostForm.querySelector('#create-post-btn'))
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
    const responseJSON = await response.json()

    if (response.ok) {
      location.href = '../user-posts.html'
    } else {
      showErrorMsg(document.querySelector('#general-error'), responseJSON.errors[0].message)
    }
  } catch (error) {
    showErrorMsg(document.querySelector('#general-error'))
  } finally {
    removeLoader()
  }
}
