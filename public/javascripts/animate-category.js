function animate(event) {
  // get all elements with class 'active'
  var list = document.getElementsByClassName('active')
  for (var i=0; i<list.length; i++ ) {
    // apply a css animation defined in css class growAnim
    list[i].classList.add('growAnim')
  }
}

document.addEventListener("DOMContentLoaded", animate)
