import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "./scss/main.scss"
import "./Router/Router.js"

export function afterPageLoad() {
  const btnSignout = document.getElementById("btn-signout")
  if (btnSignout) {
    btnSignout.addEventListener("click", (e) => {
      e.preventDefault()
      signout()
    })
  }
}

function signout() {
  console.log("signout function")
  eraseCookie(tokenCookieName)

  window.location.reload()
}

export function setCookie(name, value, days) {
  let expires = ""
  if (days) {
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    expires = "; expires=" + date.toUTCString()
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/"
}

export function getCookie(name) {
  const nameEQ = name + "="
  const ca = document.cookie.split(";")
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) == " ") c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

function eraseCookie(name) {
  const pathSegments = window.location.pathname.split("/").filter(Boolean)
  console.log("eraseCookie function")

  // Commence par effacer sur le chemin racine "/"
  const pathsToTry = ["/"]

  // Ajoute tous les chemins intermédiaires (ex: /connexion, /connexion/souspage)
  let currentPath = ""
  for (const segment of pathSegments) {
    currentPath += `/${segment}`
    pathsToTry.push(currentPath)
  }

  // Efface le cookie sur tous les chemins possibles
  pathsToTry.forEach((path) => {
    document.cookie = `${name}=; Path=${path}; Expires=Thu, 01 Jan 1970 00:00:00 GMT;`
  })
}

const tokenCookieName = "accesstoken"

export function setToken(token) {
  setCookie(tokenCookieName, token, 7)
}

export function getToken() {
  return getCookie(tokenCookieName)
}

export function isConnected() {
  if (getToken() == null || getToken == undefined) {
    return false
  } else {
    return true
  }
}

const RoleCookieName = "role"

export function getRole() {
  return getCookie(RoleCookieName)
}
