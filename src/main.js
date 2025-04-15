import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "./scss/main.scss"
import "./Router/Router.js"
import Masonry from "masonry-layout"
import imagesLoaded from "imagesloaded"

window.addEventListener("DOMContentLoaded", () => {
  const grids = document.querySelectorAll(".grid")
  grids.forEach((grid) => {
    imagesLoaded(grid, function () {
      console.log("Masonry lancé")
      new Masonry(grid, {
        itemSelector: ".grid-item",
        percentPosition: true,
      })
    })
  })
})
