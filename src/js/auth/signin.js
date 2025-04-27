import { setToken, setCookie } from "../../main"

const inputMail = document.getElementById("email")
const inputPassword = document.getElementById("password")
const btnSingin = document.getElementById("btnSignin")

btnSingin.addEventListener("click", checkCredentials)

const RoleCookieName = "role"

function checkCredentials() {
  //Ici, il faudra appeler l'API pour vérifier les credentials en BDD

  if (inputMail.value == "test@mail.com" && inputPassword.value == "123") {
    //Il faudra récupérer le vrai token
    const token = "lkjsdngfljsqdnglkjsdbglkjqskjgkfjgbqslkfdgbskldfgdfgsdgf"
    setToken(token)
    //placer ce token en cookie

    setCookie(RoleCookieName, "admin", 7)
    window.location.replace("/")
  } else {
    inputMail.classList.add("is-invalid")
    inputPassword.classList.add("is-invalid")
  }
}
