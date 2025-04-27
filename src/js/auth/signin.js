const inputMail = document.getElementById("email")
const inputPassword = document.getElementById("password")
const btnSingin = document.getElementById("btnSignin")

btnSingin.addEventListener("click", checkCredentials)

function checkCredentials() {
  //Ici, il faudra appeler l'API pour vérifier les credentials en BDD

  if (inputMail.value == "test@mail.com" && inputPassword.value == "123") {
    //Il faudra récupérer le vrai token
    const token = "lkjsdngfljsqdnglkjsdbglkjqskjgkfjgbqslkfdgbskldfgdfgsdgf"
    setToken(token)
    //placer ce token en cookie
    alert("vous êtes connecté")

    //setCookie(RoleCookieName, "admin", 7)
    window.location.replace("/")
  } else {
    inputMail.classList.add("is-invalid")
    inputPassword.classList.add("is-invalid")
  }
}

function setCookie(name, value, days) {
  var expires = ""
  if (days) {
    var date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    expires = "; expires=" + date.toUTCString()
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/"
}

function getCookie(name) {
  var nameEQ = name + "="
  var ca = document.cookie.split(";")
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) == " ") c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

function eraseCookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"
}

const tokenCookieName = "accesstoken"

function setToken(token) {
  setCookie(tokenCookieName, token, 7)
}

function getToken() {
  return getCookie(tokenCookieName)
}

function isConnected() {
  if (getToken() == null || getToken == undefined) {
    return false
  } else {
    return true
  }
}
