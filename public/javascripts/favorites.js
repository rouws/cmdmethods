// create empty array where favorites can be stored
function createLocalStorage() {
  let favorites = []
  localStorage.setItem("favorites", JSON.stringify(favorites))
}

// add a card to favorites
function addToFavorites(event) {
  event.preventDefault()
  let favorites = JSON.parse(localStorage.getItem("favorites"))
  if (favorites.indexOf(this.id)<0) {
    favorites.push(this.id)
  }
  localStorage.setItem("favorites", JSON.stringify(favorites))
  location.href = this.href;
}

function changeTextIfFavorite (button) {
  let favorites = JSON.parse(localStorage.getItem("favorites"))
  if (favorites.indexOf(button.id)>=0) {
    button.innerHTML = "Saved to favorites"
    button.classList.add('call-to-action')
  }
}

// create local storage if it doesn't exist yet
if(!localStorage.getItem('favorites')) {
  createLocalStorage();
}

// get all button elements with class 'favorites'
let buttonList = document.getElementsByClassName("favorites")
for (let button of buttonList) {
  button.addEventListener('click',addToFavorites)
  changeTextIfFavorite( button)
}

// change favorites icon if local storage contains favorites
let favorites = JSON.parse(localStorage.getItem("favorites"))
if (favorites.length > 0) {
  let littleNumber = document.querySelector('#favorites-number')
  littleNumber.innerHTML = favorites.length
}
