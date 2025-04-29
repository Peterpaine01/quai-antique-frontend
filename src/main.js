import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "./scss/main.scss"
import "./Router/Router.js"

const tokenCookieName = "accesstoken"
const RoleCookieName = "role"
const errorMessage = document.getElementById("error-message")
const successMessage = document.getElementById("success-message")

export function afterPageLoad() {
  const btnSignout = document.getElementById("btn-signout")
  const btnSignoutMobile = document.getElementById("btn-signout-mobile")

  if (btnSignout || btnSignoutMobile) {
    btnSignout.addEventListener("click", (e) => {
      e.preventDefault()
      signout()
    })
    btnSignoutMobile.addEventListener("click", (e) => {
      e.preventDefault()
      signout()
    })
  }
}

function hideMessages() {
  errorMessage.style.display = "none"
  successMessage.style.display = "none"
  errorMessage.innerText = ""
  successMessage.innerText = ""
}

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

export async function getInfosUser() {
  let myHeaders = new Headers()
  myHeaders.append("X-AUTH-TOKEN", getToken())

  let requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  }

  return fetch(`${import.meta.env.VITE_API_URL}/api/account/me`, requestOptions)
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        console.log("Impossible de récupérer les informations utilisateur")
        return null
      }
    })
    .catch((error) => {
      console.error(
        "Erreur lors de la récupération des données utilisateur",
        error
      )
      return null
    })
}

export function sanitizeHTML(string) {
  const temp = document.createElement("div")
  temp.textContent = string
  return temp.textContent
}
