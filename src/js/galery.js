import Masonry from "masonry-layout"
import imagesLoaded from "imagesloaded"

// galery masonry
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
