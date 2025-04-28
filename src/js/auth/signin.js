import { setToken, setCookie } from "../../main"

const inputMail = document.getElementById("email")
const inputPassword = document.getElementById("password")
const btnSignin = document.getElementById("btnSignin")

btnSignin.addEventListener("click", checkCredentials)

const RoleCookieName = "role"

function checkCredentials() {
  let dataForm = new FormData(signinForm)

  let myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")

  let raw = JSON.stringify({
    email: dataForm.get("email"),
    password: dataForm.get("password"),
  })

  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  }

  fetch(`${import.meta.env.VITE_API_URL}/api/login`, requestOptions)
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        inputMail.classList.add("is-invalid")
        inputPassword.classList.add("is-invalid")
      }
    })
    .then((result) => {
      console.log(result)

      const token = result.apiToken
      setToken(token)

      setCookie(RoleCookieName, result.roles[0], 7)
      window.location.replace("/")
    })
    .catch((error) => console.log("error", error))
}
