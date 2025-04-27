import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "./scss/main.scss"
import "./Router/Router.js"
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

// login
// document
//   .getElementById("login-form")
//   .addEventListener("submit", async (event) => {
//     event.preventDefault()

//     const email = document.getElementById("email").value
//     const password = document.getElementById("password").value

//     try {
//       const data = await login(email, password)
//       console.log("data.apiToken", data.apiToken)

//       if (data && data.apiToken) {
//         // Si la connexion est réussie, rediriger l'utilisateur vers la page d'accueil ou autre page sécurisée
//         window.location.href = "/" // Remplacer par la page de redirection après la connexion
//       } else {
//         throw new Error("Connexion échouée")
//       }
//     } catch (error) {
//       // Afficher un message d'erreur si la connexion échoue
//       document.getElementById("error-message").classList.remove("d-none")
//     }
//   })
