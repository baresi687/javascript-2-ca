import {GET_POSTS_URL} from "./api/endpoints";
import {getFromStorage} from "./utils/storage";
import {showErrorMsg} from "./utils/validation";
import {formatDate} from "./utils/dateFormat";

const postsContainer = document.querySelector('#posts-container')
const token = getFromStorage('accessToken')
async function getPosts(url) {
  document.querySelector('#general-error').classList.add('hidden')
  try  {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, options)
    const responseJSON = await response.json()

    const data = responseJSON
        .filter(({title}) => title)
        .map(({id,title, author, created}) => {
          const dateFormat = formatDate(created)
          return `<a href="/post-details?id=${id}" class="basis-full p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${title}</h5>
                    <p class="font-normal text-gray-700 dark:text-gray-300 mb-1">By ${author.name}</p>
                    <p class="font-normal text-gray-700 dark:text-gray-300 mb-1">On ${dateFormat}</p>
                  </a>`
        })

    postsContainer.innerHTML += data.join('')
  } catch (error) {
    showErrorMsg(document.querySelector('#general-error'))
  }
}

getPosts(GET_POSTS_URL)
