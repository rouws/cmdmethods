let favoritesList = JSON.parse(localStorage.getItem("favorites"))
let cardList = document.querySelectorAll('.card')

for (card of cardList) {
  if (favoritesList.indexOf(card.id)<0) {
    card.classList.add('hidden')
  }
}
