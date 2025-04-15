import Masonry from "masonry-layout"
import imagesLoaded from "imagesloaded"

export function initMasonry() {
  const grids = document.querySelectorAll(".grid")
  grids.forEach((grid) => {
    imagesLoaded(grid, () => {
      new Masonry(grid, {
        itemSelector: ".grid-item",
        percentPosition: true,
      })
    })
  })
}
