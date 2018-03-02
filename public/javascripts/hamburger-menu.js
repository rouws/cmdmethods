function toggleHamburgerMenu() {
    document.querySelector('#hamburger-icon').classList.toggle('close-icon')
    document.querySelector('#hamburger-menu').classList.toggle('show')
    document.querySelector('body').classList.toggle('move-right')
}

function hamburgerMenu(event) {
    document.querySelector('#hamburger-icon').onclick = toggleHamburgerMenu
    document.querySelector('#hamburger-menu').onclick = toggleHamburgerMenu
}

document.addEventListener("DOMContentLoaded", hamburgerMenu)
