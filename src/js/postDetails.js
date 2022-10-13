import {GET_POST_DETAILS} from "./api/endpoints";
import {getFromStorage} from "./utils/storage";
import {formatDateLong} from "./utils/dateFormat";
import {showErrorMsg} from "./utils/validation";

const postId = new URLSearchParams(window.location.search).get('id')
const postDetailsContainer = document.querySelector('#post-details-container')
const titleOfPage = document.querySelector('title')
const commentsContainer = document.querySelector('#comments-container')
const commentForm = document.querySelector('#post-comment')
const token = getFromStorage('accessToken')

commentForm.onsubmit = function (event) {
  event.preventDefault()
  const commentBody = document.querySelector('#comment-body')
  const postData = {
    body: commentBody.value
  }
  commentPost(`${GET_POST_DETAILS}${postId}/comment`, postData)
  commentForm.reset()
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
      const {title, author, created, body, tags, media, comments, reactions} = responseJSON
      titleOfPage.innerHTML += title
      const dateFormat = formatDateLong(created)

      postDetailsContainer.innerHTML = `
           <div id="post-content-container" class="p-6 my-2 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 text-white">
             <div id="post-text-img" class="block xl:flex justify-between w-full gap-16">
               <div class="basis-1/2 flex-grow">
                 <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white capitalize">${title}</h2>
                 <small class="font-normal text-gray-700 dark:text-gray-300 mb-1">By <span class="font-bold">${author.name}</span> on ${dateFormat}</small>
                 <p class="py-4 font-normal text-gray-900 dark:text-white mb-1 whitespace-pre-line">${body}</p>
               </div>                                                
             </div>
             <div class="flex gap-4 pt-6 border-t-2 border-gray-700 mt-4">
               <span data-emoji="👍" class="emojis py-2 px-2.5 cursor-pointer rounded-full border-solid border-2 border-gray-600">👍</span>
               <span data-emoji="❤" class="emojis py-2 px-2.5 cursor-pointer rounded-full border-solid border-2 border-gray-600">❤</span>
               <span data-emoji="😂" class="emojis py-2 px-2.5 cursor-pointer rounded-full border-solid border-2 border-gray-600">😂</span>
               <span data-emoji="😢" class="emojis py-2 px-2.5 cursor-pointer rounded-full border-solid border-2 border-gray-600">😢</span>
             </div>                      
           </div>`

      const imageHtml = `<div class="basis-auto align-super"><img src="${media}" alt="Image" class="max-h-64 rounded-md"></div>`
      const tagsHtml = `<p class="block dark:text-white pt-6">Tags: <span class="italic">${tags.join(', ')}</span></p>`

      media.length ?
          postDetailsContainer.querySelector('#post-text-img').insertAdjacentHTML('beforeend', imageHtml) : null
      tags.length ?
          postDetailsContainer.querySelector('#post-text-img').insertAdjacentHTML('afterend',tagsHtml) : null

      if (reactions.length) {
        const reactionsContainer = `<div class="reactions flex gap-6 pt-6">Reactions:</div>`
        postDetailsContainer.querySelector('#post-content-container').insertAdjacentHTML('beforeend',reactionsContainer)
        reactions.forEach(({symbol, count}) => {
          postDetailsContainer.querySelector('.reactions').innerHTML +=
              `<span>${symbol} ${count}</span>`
        })
      }

      commentsContainer.innerHTML = ''
      commentForm.classList.remove('hidden')

      if (comments.length) {
        commentsContainer.innerHTML += `<h6 class="my-6 text-lg text-black font-semibold">Comments</h6>`
        const commentsAvailable = comments.map(({owner, body}) => {
          return `
           <div class="p-6 my-6 bg-white rounded-lg bg-gray-800 ">
             <div class="block xl:flex justify-between w-full gap-16 text-white">
               <div class="basis-1/2 flex-grow">                 
                 <small class="font-normal mb-1">By <span class="font-bold">${owner}</span> on ${dateFormat}</small>
                 <p class="py-4 font-normal mb-1 whitespace-pre-line">${body}</p>
               </div>                                                
             </div>                      
           </div>`
        }).join('')

        commentsContainer.classList.remove('hidden')
        commentsContainer.innerHTML += commentsAvailable
      }

    } else {
      showErrorMsg(document.querySelector('#general-error'))
    }

  } catch (error) {
    showErrorMsg(document.querySelector('#general-error'))

  } finally {
    const emojis = document.querySelectorAll('.emojis')
    emojis.forEach((emoji) => {
      emoji.onclick = function () {
        const selectEmoji = this.dataset.emoji
        reactOnPost(`${GET_POST_DETAILS}${postId}/react/${selectEmoji}`)
      }
    })
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

async function reactOnPost (url) {
  try {
    const options = {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
    const response = await fetch(url, options)
    if (response.ok) {
      getPostDetails(`${GET_POST_DETAILS}${postId}?_author=true&_comments=true&_reactions=true`)
    } else {
      showErrorMsg(document.querySelector('#general-error'))
    }

  } catch (error) {
    showErrorMsg(document.querySelector('#general-error'))
  }
}

getPostDetails(`${GET_POST_DETAILS}${postId}?_author=true&_comments=true&_reactions=true`)
