function showOnlyFavorites(event) {

  // get all card elements from document
  let cardList = document.querySelectorAll('.card')
  // get the list of favorites from local storage
  let favorites = JSON.parse(localStorage.getItem("favorites"))
  // determine which cards to show and which to hide
  for (card of cardList) {
    if (favorites.indexOf(card.id)<0) {
      card.classList.add('hidden')
    }
  }
  // if favorites is empty, show a message
  if (favorites.length == 0) {
    let newParagraph = document.createElement('p')
    let paragraphContent = document.createTextNode("Your list of favorites is still empty.")
    newParagraph.appendChild(paragraphContent)
    document.querySelector(".overview").append(newParagraph)
  }
}

document.addEventListener("DOMContentLoaded", showOnlyFavorites)
