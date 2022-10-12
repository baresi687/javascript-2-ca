import {GET_POST_DETAILS} from "./api/endpoints";
import {getFromStorage} from "./utils/storage";
import {formatDateLong} from "./utils/dateFormat";
import {showErrorMsg} from "./utils/validation";

const postId = new URLSearchParams(window.location.search).get('id')
const postDetailsContainer = document.querySelector('#post-details-container')
const titleOfPage = document.querySelector('title')
const commentsContainer = document.querySelector('#comments-container')
const commentForm = document.querySelector('#post-comment')
const commentAsUser = document.querySelector('#comment-as')
const token = getFromStorage('accessToken')
const {name} = getFromStorage('userKey')

commentForm.onsubmit = function (event) {
  event.preventDefault()
  const commentBody = document.querySelector('#comment-body')
  const postData = {
    body: commentBody.value
  }
  commentPost(`${GET_POST_DETAILS}${postId}/comment`, postData)
}

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
      const {title, author, created, body, tags, media, comments} = responseJSON
      titleOfPage.innerHTML += title
      const dateFormat = formatDateLong(created)

      postDetailsContainer.innerHTML = `
           <div id="post-content-container" class="p-6 my-2 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
             <div id="post-text-img" class="block xl:flex justify-between w-full gap-16">
               <div class="basis-1/2 flex-grow">
                 <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white capitalize">${title}</h5>
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

      commentAsUser.innerHTML += name
      commentsContainer.innerHTML = ''

      if (comments.length) {
        commentsContainer.innerHTML += `<h6 class="my-6 text-lg dark:text-black">Comments</h6>`
        const commentsAvailable = comments.map(({owner, body}) => {
          return `
           <div class="p-6 my-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
             <div class="block xl:flex justify-between w-full gap-16">
               <div class="basis-1/2 flex-grow">                 
                 <small class="font-normal text-gray-700 dark:text-gray-300 mb-1">By <span class="font-bold">${owner}</span> on ${dateFormat}</small>
                 <p class="py-4 font-normal text-gray-900 dark:text-white mb-1 whitespace-pre-line">${body}</p>
               </div>                                                
             </div>                      
           </div>`
        }).join('')

        commentsContainer.classList.remove('hidden')
        commentsContainer.innerHTML += commentsAvailable
      }

    } else {
      commentForm.classList.add('hidden')
      showErrorMsg(document.querySelector('#general-error'))
    }

  } catch (error) {
    showErrorMsg(document.querySelector('#general-error'))
  }
}

async function commentPost(url, postData) {
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(postData)
    };

    const response = await fetch(url, options)

    if (response.ok) {
      getPostDetails(`${GET_POST_DETAILS}${postId}?_author=true&_comments=true&_reactions=true`)
    } else {
      showErrorMsg(document.querySelector('#general-error-comment'))
    }
  } catch (error) {
    showErrorMsg(document.querySelector('#general-error-comment'))
  }
}

getPostDetails(`${GET_POST_DETAILS}${postId}?_author=true&_comments=true&_reactions=true`)
