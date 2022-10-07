import {GET_POSTS_URL} from "./api/endpoints";
import {getFromStorage} from "./utils/storage";
import {showErrorMsg} from "./utils/validation";
import {formatDate} from "./utils/dateFormat";

const postsContainer = document.querySelector('#posts-container')
const token = getFromStorage('accessToken')
const searchField = document.querySelector('#search-posts')
const searchBtn = document.querySelector('#search-btn')

searchBtn.onclick = function () {
  if (document.querySelector('#search-result')) {
    document.querySelector('#search-result').remove()
  }
  getPosts(GET_POSTS_URL, searchField.value)
  postsContainer.insertAdjacentHTML('beforebegin',
      `<div id="search-result">
              <h3 class="text-xl pb-6">Search Results</h3>
              <a href="../main.html" class="block underline text-sm pb-6">Back to main Posts page</a>
            </div>`)
}

searchField.onkeypress = function (event) {
  if (event.key === 'Enter' && searchField.value) {
    searchBtn.onclick()
  }
}

async function getPosts(url, searchValue = '') {
  postsContainer.innerHTML = ''
  try  {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, options)
    const responseJSON = await response.json()
    const filterPosts = responseJSON
        .filter(({title, body}) => title.toLowerCase().includes(searchValue) || body.toLowerCase().includes(searchValue))
    let data
    if (filterPosts.length) {
      data = filterPosts
          .map(({id,title, author, created}) => {
            const dateFormat = formatDate(created)
            return `<a href="/post-details.html?id=${id}" class="basis-full p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${title}</h5>
                    <p class="font-normal text-gray-700 dark:text-gray-300 mb-1">By ${author.name}</p>
                    <p class="font-normal text-gray-700 dark:text-gray-300 mb-1">On ${dateFormat}</p>
                  </a>`
          }).join('')
    } else {
      data = `<h2 class="text-2xl">No results found</h2>`
    }

    postsContainer.innerHTML += data
  } catch (error) {
    showErrorMsg(document.querySelector('#general-error'))
  }
}

getPosts(GET_POSTS_URL)
