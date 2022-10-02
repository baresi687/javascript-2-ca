import {API_BASE_URL, apiGetUserPosts} from "./api/endpoints";
import {getFromStorage} from "./utils/storage";
import {formatDateLong} from "./utils/dateFormat";
import {showErrorMsg} from "./utils/validation";

const userPostsContainer = document.querySelector('#user-posts-container')
const token = getFromStorage('accessToken')
let postId = ''
let apiDeletePost = API_BASE_URL + `/posts/`

async function getUserPosts(url) {
  document.querySelector('#general-error').classList.add('hidden')
  try  {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
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
      const posts = data.map(({title, body, id, owner, created}) => {
        const dateFormat = formatDateLong(created)
        return `<div class="flex justify-between p-6 my-2 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                  <div class="max-w-md">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${title}</h5>
                    <small class="font-normal text-gray-700 dark:text-gray-300 mb-1">By <span class="font-bold">${owner}</span> on ${dateFormat}</small>
                    <p class="py-4 font-normal text-gray-900 dark:text-white mb-1 whitespace-pre">${body}</p>
                  </div>
                  <div>
                    <button id="edit-post" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Edit</button>
                    <button id="delete-post-id-${id}" class="delete-btn text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Delete</button>
                  </div>
                </div>`
      })

      userPostsContainer.innerHTML += posts.join('')
    }

  } catch (error) {
    showErrorMsg(document.querySelector('#general-error'),
        'Something went wrong.. please try again later')
  } finally {
    const deleteBtn = document.querySelectorAll('.delete-btn')
    deleteBtn.forEach((btn) => {
      btn.onclick = function () {
        postId = this.id.substring(15)
        apiDeletePost += `${postId}`
        deletePost(apiDeletePost)
      }
    })
  }
}

getUserPosts(API_BASE_URL+apiGetUserPosts)

async function deletePost(url) {
  try {
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
    const response = await fetch(url, options)
    await response.json()
    location.reload()

  } catch (error) {
    showErrorMsg(document.querySelector('#general-error'),
        'Something went wrong.. please try again later')
  }
}
