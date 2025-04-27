import Route from "./Route.js"
import { allRoutes, websiteName } from "./allRoutes.js"
import { initMasonry } from "../utils/initMasonry.js"
import { afterPageLoad, showAndHideElementsForRoles } from "../main.js"

const route404 = new Route("404", "Page introuvable", "/pages/404.html")

// Trouver la route correspondant à l'URL
const getRouteByUrl = (url) => {
  return (
    allRoutes.find(
      (route) => route.url === url || route.url === url.replace(/\/$/, "")
    ) || route404
  )
}

// Charger les pages via glob
const pages = import.meta.glob("/pages/**/*.html", {
  query: "?raw",
  import: "default",
})
// console.log("pages ->", pages)

const fragments = import.meta.glob("/fragments/*.html", {
  query: "?raw",
  import: "default",
})

// Charger le contenu complet (header + page + footer) dans #app
const loadPageIntoApp = async () => {
  const path = window.location.pathname
  const currentRoute = getRouteByUrl(path)

  // Utilisation de glob pour récupérer la page demandée
  const pageLoader = pages[`${currentRoute.pathHtml}`]
  const headerLoader = fragments["/fragments/header.html"]
  const footerLoader = fragments["/fragments/footer.html"]

  const [headerHTML, footerHTML] = await Promise.all([
    headerLoader(),
    footerLoader(),
  ])
  const pageHTML = pageLoader ? await pageLoader() : "<h1>Page introuvable</h1>"

  const app = document.getElementById("app")
  app.innerHTML = `
    ${headerHTML}
    ${pageHTML}
    ${footerHTML}
  `

  initMasonry()
  console.log(currentRoute)

  // Chargement JS
  if (currentRoute.pathJS) {
    const script = document.createElement("script")
    script.type = "module" // Type module pour Vite
    script.src = currentRoute.pathJS
    document.body.appendChild(script)
  }

  document.title = `${currentRoute.title} - ${websiteName}`
  showAndHideElementsForRoles()
  afterPageLoad()
}

// Gestion des clics sur les liens internes
const routeEvent = (event) => {
  event.preventDefault()
  const target = event.currentTarget
  window.history.pushState({}, "", target.href)
  loadPageIntoApp()
}

// Support retour navigateur
window.onpopstate = loadPageIntoApp
window.route = routeEvent

// Chargement initial de la page
window.addEventListener("DOMContentLoaded", loadPageIntoApp)
