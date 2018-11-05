/* *********************************************************
* author: SE Rouwhorst
* Layout, filtering and sorting is done mainly bij using
* Isotope (https://isotope.metafizzy.co/)
*********************************************************** */

function setGridLayout() {

  let gridContainer = document.querySelector('.grid')

  // wait until all images are loaded
  imagesLoaded( gridContainer, function () {

    let currentCategory = document.querySelector('main').id
    let currentFilter = document.querySelector('main').getAttribute('data-filter')
    let currentSortby = document.querySelector('main').getAttribute('data-sort-value')

    // create an isotope grid layout
    let isotope = new Isotope( gridContainer, {
      // options
      itemSelector: '.grid-item',
      masonry: {
        columnWidth: 275,
        gutter: 14
      },
      stamp: '.stamp',
      getSortData: {
        id: function( itemElem) {
          return itemElem.id
        }
      }
    })


    // hide all category descriptions except the current category description
    let categoryDescriptions = document.querySelectorAll('.category-description')
    categoryDescriptions.forEach( description => {
      if (!description.classList.contains(currentCategory)) {
        description.classList.add('hidden')
      }
    })

    // Set default sorting to filtering and sorting on 'alphabetical on id'
    if (currentFilter === '*') {
      isotope.arrange({ filter: currentFilter, sortBy: currentSortby})
    } else {
      isotope.arrange({ filter: "."+currentFilter, sortBy: currentSortby})
    }

    // use isotope to sort and filter using the buttons in nav.categories
    let buttons = document.querySelectorAll('.categories button')
    buttons.forEach( button => {
      button.addEventListener('click', function() {
        // get filter en sort values
        let filterValue = this.getAttribute('data-filter')
        let sortValue = this.getAttribute('data-sort-value')
        // indicate (and animate) which filter is active in nav.categories
        let filterButtons = document.querySelectorAll('.categories button')
        filterButtons.forEach( filterbutton => {
          if (filterbutton.getAttribute("data-filter") === filterValue) {
            filterbutton.classList.add('active')
          } else {
            filterbutton.classList.remove('active')
          }
        })
        // hide all category descriptions except the current one
        let categoryDescriptions = document.querySelectorAll('.category-description')
        categoryDescriptions.forEach( description => {
          if (description.classList.contains('home') && filterValue == '*') {
            description.classList.remove('hidden')
          } else if (description.classList.contains(filterValue)) {
            description.classList.remove('hidden')
          } else {
            description.classList.add('hidden')
          }
        })
        // apply sort and filters
        if (filterValue === '*') {
          isotope.arrange({ filter: filterValue, sortBy: sortValue})
        } else {
          isotope.arrange({ filter: "."+filterValue, sortBy: sortValue})
        }
      })
    })

    // use isotope to shuffle cards
    let shuffleButton = document.querySelector('#shuffle')
    if (shuffleButton) {
      shuffleButton.addEventListener('click', function() {
        isotope.shuffle()
      })
    }
    // use isotope to sort cards alphabetically
    let alphabeticalButton = document.querySelector('#alphatical')
    if (alphabeticalButton) {
      alphabeticalButton.addEventListener('click', function() {
        isotope.arrange({ filter: '*', sortBy: currentSortby})
      })
    }
  })
}

document.addEventListener("DOMContentLoaded", setGridLayout)
