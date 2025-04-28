const inputNom = document.getElementById("nom")
const inputPreNom = document.getElementById("prenom")
const inputMail = document.getElementById("email")
const inputPassword = document.getElementById("password")
const inputValidationPassword = document.getElementById("validate-password")
const btnValidation = document.getElementById("btn-validation-inscription")

const errorMessage = document.getElementById("error-message")
const successMessage = document.getElementById("success-message")

const signupForm = document.getElementById("signupForm")

inputNom.addEventListener("keyup", validateForm)
inputPreNom.addEventListener("keyup", validateForm)
inputMail.addEventListener("keyup", validateForm)
inputPassword.addEventListener("keyup", validateForm)
inputValidationPassword.addEventListener("keyup", validateForm)
btnValidation.addEventListener("click", signupUser)

function handleInputChange() {
  validateForm()
  hideMessages()
}

function validateForm() {
  validateRequired(inputNom)
  validateRequired(inputPreNom)
  validateMail(inputMail)
  validatePassword(inputPassword)
  validateConfirmationPassword(inputPassword, inputValidationPassword)
}

function hideMessages() {
  errorMessage.style.display = "none"
  successMessage.style.display = "none"
  errorMessage.innerText = ""
  successMessage.innerText = ""
}

function validateRequired(input) {
  if (input.value != "") {
    input.classList.add("is-valid")
    input.classList.remove("is-invalid")
    return true
  } else {
    input.classList.remove("is-valid")
    input.classList.add("is-invalid")
    return false
  }
}

function validateMail(input) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const mailUser = input.value
  if (mailUser.match(emailRegex)) {
    input.classList.add("is-valid")
    input.classList.remove("is-invalid")
    return true
  } else {
    input.classList.remove("is-valid")
    input.classList.add("is-invalid")
    return false
  }
}

function validatePassword(input) {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/
  const passwordUser = input.value
  if (passwordUser.match(passwordRegex)) {
    input.classList.add("is-valid")
    input.classList.remove("is-invalid")
    return true
  } else {
    input.classList.remove("is-valid")
    input.classList.add("is-invalid")
    return false
  }
}

function validateConfirmationPassword(inputPwd, inputConfirmPwd) {
  if (inputPwd.value == inputConfirmPwd.value) {
    inputConfirmPwd.classList.add("is-valid")
    inputConfirmPwd.classList.remove("is-invalid")
    return true
  } else {
    inputConfirmPwd.classList.add("is-invalid")
    inputConfirmPwd.classList.remove("is-valid")
    return false
  }
}

function signupUser(event) {
  event.preventDefault()

  hideMessages()

  const isNomValid = validateRequired(inputNom)
  const isPrenomValid = validateRequired(inputPreNom)
  const isMailValid = validateMail(inputMail)
  const isPasswordValid = validatePassword(inputPassword)
  const isConfirmPasswordValid = validateConfirmationPassword(
    inputPassword,
    inputValidationPassword
  )

  if (
    !isNomValid ||
    !isPrenomValid ||
    !isMailValid ||
    !isPasswordValid ||
    !isConfirmPasswordValid
  ) {
    errorMessage.innerText =
      "Veuillez corriger les erreurs du formulaire avant de valider."
    errorMessage.style.display = "block"
    return
  }

  let dataForm = new FormData(signupForm)

  let myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")

  let raw = JSON.stringify({
    firstName: dataForm.get("nom"),
    lastName: dataForm.get("prenom"),
    email: dataForm.get("email"),
    password: dataForm.get("password"),
  })

  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  }

  fetch(`${import.meta.env.VITE_API_URL}/api/registration`, requestOptions)
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error("Erreur serveur lors de l'inscription.")
      }
    })
    .then((result) => {
      if (result) {
        successMessage.innerText =
          "Inscription réussie ! Vous pouvez maintenant vous connecter. Redirection en cours..."
        successMessage.style.display = "block"

        setTimeout(() => {
          window.location.href = "/connexion"
        }, 3000)
      }
    })
    .catch((error) => {
      console.error(error)
      errorMessage.innerText =
        "Erreur lors de l'inscription, veuillez réessayer."
      errorMessage.style.display = "block"
    })
}
