import {GET_USER_POSTS_URL, EDIT_DELETE_USER_POST} from "./api/endpoints";
import {getFromStorage} from "./utils/storage";
import {formatDateLong} from "./utils/dateFormat";
import {showErrorMsg} from "./utils/validation";

const userPostsContainer = document.querySelector('#user-posts-container')
const postEditModal = document.querySelector('#modal')
const token = getFromStorage('accessToken')
let postId = ''

async function getUserPosts(url) {
  userPostsContainer.innerHTML = ''
  try  {
    const options = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    };
    const response = await fetch(url, options)
    const responseJSON = await response.json()
    const data = responseJSON.posts

    if (data.length === 0) {
      userPostsContainer.innerHTML +=
          `<h2 class="text-1.5xl">Nothing here</h2>
           <p class="my-4">Why not <a class="font-semibold underline hover:text-blue-800 dark:hover:text-blue-900" href="../create-post.html">Create a Post?</a></p>`
    } else {
      const posts = data
          .map(({title, body, id, owner, created}) => {
            const dateFormat = formatDateLong(created)
            return `<div class="flex justify-between p-6 my-2 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                      <div class="max-w-md">
                        <h5 id="post-title-${id}" class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${title}</h5>
                        <small class="font-normal text-gray-700 dark:text-gray-300 mb-1">By <span class="font-bold">${owner}</span> on ${dateFormat}</small>
                        <p id="post-body-${id}" class="py-4 font-normal text-gray-900 dark:text-white mb-1 whitespace-pre-line">${body}</p>
                      </div>
                      <div>
                        <button data-id="${id}" class="edit-btn text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Edit</button>
                        <button data-id="${id}" class="delete-btn text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-700 dark:hover:bg-red-600 focus:outline-none dark:focus:ring-blue-800">Delete</button>
                      </div>
                    </div>`
          }).reverse()

      userPostsContainer.innerHTML += posts.join('')
    }

  } catch (error) {
    showErrorMsg(document.querySelector('#general-error'))
  } finally {
    const editBtn = document.querySelectorAll('.edit-btn')
    editBtn.forEach((btn) => {
      btn.onclick = function () {
        postId = this.dataset.id
        const getPostTitle = document.querySelector(`#post-title-${postId}`).textContent
        const getPostBody = document.querySelector(`#post-body-${postId}`).textContent
        document.querySelector('#post-title').value = getPostTitle
        document.querySelector('#post-body').value = getPostBody
        const editPostBtn = document.querySelector('#edit-post')

        postEditModal.classList.remove('hidden')

        editPostBtn.onsubmit = function (event) {
          event.preventDefault()
          const putData = {
            title: document.querySelector('#post-title').value,
            body: document.querySelector('#post-body').value,
          }
          editPost(`${EDIT_DELETE_USER_POST}${postId}`, putData)
          postEditModal.classList.add('hidden')
        }
      }
    })
    const deleteBtn = document.querySelectorAll('.delete-btn')
    deleteBtn.forEach((btn) => {
      btn.onclick = function () {
        postId = this.dataset.id
        deletePost(`${EDIT_DELETE_USER_POST}${postId}`)
      }
    })
  }
}

window.onclick = function (event) {
  if (event.target === postEditModal) {
    postEditModal.classList.add('hidden')
  }
}

getUserPosts(GET_USER_POSTS_URL)

async function editPost(url, putData) {
  try {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(putData)
    };
    const response = await fetch(url, options)
    if (response.ok) {
      await response.json()
      getUserPosts(GET_USER_POSTS_URL)
    } else {
      showErrorMsg(document.querySelector('#general-error-edit'))
    }

  } catch (error) {
    showErrorMsg(document.querySelector('#general-error-edit'))
  }
}

async function deletePost(url) {
  try {
    const options = {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    };
    const response = await fetch(url, options)
    if (response.ok) {
      await response.json()
      getUserPosts(GET_USER_POSTS_URL)
    } else {
      showErrorMsg(document.querySelector('#general-error'))
    }

  } catch (error) {
    showErrorMsg(document.querySelector('#general-error'))
  }
}
