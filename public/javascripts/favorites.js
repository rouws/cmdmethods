// create empty array where favorites can be stored in local storage
function createLocalStorage() {
  let favorites = []
  localStorage.setItem("favorites", JSON.stringify(favorites))
}

// look up the dom tree to find the first element that has an id and return this
function getId(el) {
  while(el = el.parentElement) {
    if (el.id) {
      return el.id
    }
  }
}

// add a card to favorites
function addToFavorites(event) {
  event.preventDefault()
  let favorites = JSON.parse(localStorage.getItem("favorites"))
  let id = getId(this)
  if (favorites.indexOf(id)<0) {
    favorites.push(id)
  }
  localStorage.setItem("favorites", JSON.stringify(favorites))
  changeTextIfFavorite(this)
  updateLittleNumber()
}

// remove a card from favorites
function removeFromFavorites(event) {
  event.preventDefault()
  let favorites = JSON.parse(localStorage.getItem("favorites"))
  let id = getId(this)
  let index = favorites.indexOf(id)
  if (index>=0) {
    favorites.splice(index,1)
  }
  localStorage.setItem("favorites", JSON.stringify(favorites))
  location.href = this.href;
}


// when an item is saved to favorites, change the text of the button
function changeTextIfFavorite (button) {
  let favorites = JSON.parse(localStorage.getItem("favorites"))
  let id = getId(button)
  if (favorites.indexOf(id)>=0) {
    button.innerHTML = "Saved to favorites"
    button.classList.add('call-to-action')
  }
}

// change favorites icon if local storage contains favorites
function updateLittleNumber() {
  let favorites = JSON.parse(localStorage.getItem("favorites"))
  if (favorites.length > 0) {
    let littleNumber = document.querySelector('#favorites-number')
    littleNumber.innerHTML = favorites.length
  }
}
function favorites(event) {

  // create local storage if it doesn't exist yet
  if(!localStorage.getItem('favorites')) {
    createLocalStorage();
  }

  // get all button elements with class 'add-to-favorites'
  let addButtons = document.getElementsByClassName("add-to-favorites")
  for (let button of addButtons) {
    button.addEventListener('click',addToFavorites)
    changeTextIfFavorite( button)
  }

  // get all button elements with class 'remove-from-favorites'
  let removeButtons = document.getElementsByClassName("remove-from-favorites")
  for (let button of removeButtons) {
    button.addEventListener('click',removeFromFavorites)
  }

  updateLittleNumber()

}

document.addEventListener("DOMContentLoaded", favorites)
