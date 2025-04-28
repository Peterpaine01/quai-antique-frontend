const inputNom = document.getElementById("nom")
const inputPreNom = document.getElementById("prenom")
const inputMail = document.getElementById("email")
const inputPassword = document.getElementById("password")
const inputValidationPassword = document.getElementById("validate-password")
const btnValidation = document.getElementById("btn-validation-inscription")

inputNom.addEventListener("keyup", validateForm)
inputPreNom.addEventListener("keyup", validateForm)
inputMail.addEventListener("keyup", validateForm)
inputPassword.addEventListener("keyup", validateForm)
inputValidationPassword.addEventListener("keyup", validateForm)
btnValidation.addEventListener("click", signupUser)

//Function permettant de valider tout le formulaire
function validateForm() {
  validateRequired(inputNom)
  validateRequired(inputPreNom)
  validateMail(inputMail)
  validatePassword(inputPassword)
  validateConfirmationPassword(inputPassword, inputValidationPassword)
}

function validateRequired(input) {
  if (input.value != "") {
    input.classList.add("is-valid")
    input.classList.remove("is-invalid")
  } else {
    input.classList.remove("is-valid")
    input.classList.add("is-invalid")
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

function signupUser() {
  let myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")

  let raw = JSON.stringify({
    firstName: "Test fetch",
    lastName: "test fetch",
    email: "testdepuisFetch@email.com",
    password: "Azerty11",
  })

  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  }

  fetch(`${import.meta.env.VITE_API_URL}/api/registration`, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error))
}
