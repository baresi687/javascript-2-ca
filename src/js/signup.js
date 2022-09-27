async function signUp(url, options) {
  try {
    const postData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options),
    };
    const response = await fetch(url, postData)
    const responseJSON = await response.json()
    if (!response.ok) {
      document.querySelector('form').innerHTML += `<h2 class="py-3.5 text-red-500 text-center">${responseJSON.message}</h2>`;
    } else {
      location.href = '../login.html'
    }
  } catch (error) {
    console.log(error);
    document.querySelector('body').innerHTML += `<h1>WRONG</h1>`;
  }
}

export {signUp}
