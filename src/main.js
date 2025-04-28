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

const tokenCookieName = "accesstoken"
const RoleCookieName = "role"

function signout() {
  eraseCookie(tokenCookieName)
  eraseCookie(RoleCookieName)
  window.location.reload()
  window.location.replace("/connexion")
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

  const pathsToTry = ["/"]

  let currentPath = ""
  for (const segment of pathSegments) {
    currentPath += `/${segment}`
    pathsToTry.push(currentPath)
  }

  pathsToTry.forEach((path) => {
    document.cookie = `${name}=; Path=${path}; Expires=Thu, 01 Jan 1970 00:00:00 GMT;`
  })
}

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

// Handle role
export function getRole() {
  return getCookie(RoleCookieName)
}

export function showAndHideElementsForRoles() {
  const userConnected = isConnected()
  const role = getRole()

  let allElementsToEdit = document.querySelectorAll("[data-show]")

  allElementsToEdit.forEach((element) => {
    switch (element.dataset.show) {
      case "disconnected":
        if (userConnected) {
          element.classList.add("d-none")
        }
        break
      case "connected":
        if (!userConnected) {
          element.classList.add("d-none")
        }
        break
      case "admin":
        if (!userConnected || role != "ROLE_ADMIN") {
          element.classList.add("d-none")
        }
        break
      case "client":
        if (!userConnected || role != "ROLE_USER") {
          element.classList.add("d-none")
        }
        break
    }
  })
}
