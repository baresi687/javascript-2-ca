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

      postDetailsContainer.innerHTML = `
           <div id="post-content-container" class="p-6 my-2 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
             <div id="post-text-img" class="block xl:flex justify-between w-full gap-16">
               <div class="basis-1/2 flex-grow">
                 <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${title}</h5>
                 <small class="font-normal text-gray-700 dark:text-gray-300 mb-1">By <span class="font-bold">${author.name}</span> on ${dateFormat}</small>
                 <p class="py-4 font-normal text-gray-900 dark:text-white mb-1 whitespace-pre-line">${body}</p>
               </div>                                                
             </div>                      
           </div>`

      const imageHtml = `<div class="basis-auto align-super"><img src="${media}" alt="Image" class="max-h-64 rounded-md"></div>`
      const tagsHtml = `<p class="block dark:text-white pt-6">Tags: <span class="italic">${tags.join(', ')}</span></p>`

      media.length ?
        postDetailsContainer.querySelector('#post-text-img').insertAdjacentHTML('beforeend', imageHtml) : null
      tags.length ?
        postDetailsContainer.querySelector('#post-content-container').insertAdjacentHTML('beforeend',tagsHtml) : null

    } else {
      showErrorMsg(document.querySelector('#general-error'))
    }

  } catch (error) {
    showErrorMsg(document.querySelector('#general-error'))
  }
}

getPostDetails(`${GET_POST_DETAILS}${postId}?_author=true`)
