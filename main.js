
var container = document.querySelector('.logo-row');

var carousel = new MultiCarousel({
  target: container,
  data: {
    items: Array.prototype.slice.call(container.children),
    // The rest of these are optional. Here are the defaults.
    delay: 1500, // Delay between slides.
    transition: 900, // Duration of slide transition.
    count: 5, // How many items to show at once.
    controls: []
  }
});
