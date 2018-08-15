var gridContainer = document.querySelector('.grid');
// use Masonry to layout in a grid-like way
// but wait until all images and fonts are loaded
imagesLoaded( gridContainer, function () {
  var msnry = new Masonry( gridContainer, {
    // options
    itemSelector: '.grid-item',
    columnWidth: 275,
    gutter: 14,
    stagger: 30
  })
})
