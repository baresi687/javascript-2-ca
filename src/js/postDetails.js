import {GET_POST_DETAILS} from "./api/endpoints";
import {getFromStorage} from "./utils/storage";
import {formatDateLong} from "./utils/dateFormat";
import {showErrorMsg} from "./utils/validation";

const postId = new URLSearchParams(window.location.search).get('id')
const postDetailsContainer = document.querySelector('#post-details-container')
const titleOfPage = document.querySelector('title')
const token = getFromStorage('accessToken')

async function getPostDetails(url) {
  try {
    const options = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
    const response = await fetch(url, options)

    if (response.ok) {
      const responseJSON = await response.json()
      const {title, author, created, body, tags, media} = responseJSON
      titleOfPage.innerHTML += title
      const dateFormat = formatDateLong(created)
      postDetailsContainer.innerHTML =
          `<div class="p-6 my-2 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">                     
             <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${title}</h5>
             <small class="font-normal text-gray-700 dark:text-gray-300 mb-1">By <span class="font-bold">${author.name}</span> on ${dateFormat}</small>
             <p class="py-4 font-normal text-gray-900 dark:text-white mb-1 whitespace-pre-line">${body}</p>                                                                     
           </div>`
      const imageHtml = `<div><img src="${media}" alt='Image'></div>`
      const tagsHtml = `<div><p class="dark:text-white pt-6">Tags: ${tags}</p></div>`
      if (media.length) {
        postDetailsContainer.querySelector('div').insertAdjacentHTML('beforeend', imageHtml)
      }
      if (tags.length) {
        postDetailsContainer.querySelector('div').insertAdjacentHTML('beforeend', tagsHtml)
      }

    } else {
      showErrorMsg(document.querySelector('#general-error'))
    }

  } catch (error) {
    showErrorMsg(document.querySelector('#general-error'))
  }
}

getPostDetails(`${GET_POST_DETAILS}${postId}?_author=true`)
