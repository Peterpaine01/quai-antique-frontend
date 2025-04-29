import { getInfosUser, sanitizeHTML, getToken } from "../main.js"

export async function afterPageBookingLoad() {
  const btnBooking = document.getElementById("btn-booking")
  const token = getToken()
  const errorMessage = document.getElementById("error-message")
  const successMessage = document.getElementById("success-message")
  if (!token) {
    errorMessage.innerText = "Veuillez vous connecter pour réserver."
    errorMessage.style.display = "block"
    return
  }
  const user = await getInfosUser()
  console.log(user)

  const nameInput = document.getElementById("nom")
  const prenomInput = document.getElementById("prenom")
  if (user) {
    if (nameInput) nameInput.value = user.lastName || ""
    if (prenomInput) prenomInput.value = user.firstName || ""
  }

  const inputs = document.querySelectorAll("input")

  inputs.forEach((input) => {
    input.addEventListener("input", handleInputChange)
  })

  const midiRadio = document.getElementById("midiRadio")
  const soirRadio = document.getElementById("soirRadio")

  await loadHours("soir")

  if (midiRadio) {
    midiRadio.addEventListener("change", async function () {
      if (this.checked) {
        await loadHours("midi")
      }
    })
  }

  if (soirRadio) {
    soirRadio.addEventListener("change", async function () {
      if (this.checked) {
        await loadHours("soir")
      }
    })
  }

  if (btnBooking) {
    btnBooking.addEventListener("click", (e) => {
      e.preventDefault()
      bookTable()
    })
  }

  function hideMessages() {
    if (errorMessage) {
      errorMessage.style.display = "none"
      errorMessage.innerText = ""
    }
    if (successMessage) {
      successMessage.style.display = "none"
      successMessage.innerText = ""
    }
  }

  function handleInputChange(event) {
    const input = event.target
    validateForm(input)
    hideMessages()
  }

  function validateForm(input) {
    return validateRequired(input)
  }

  function validateRequired(input) {
    if (input.value.trim() !== "") {
      input.classList.add("is-valid")
      input.classList.remove("is-invalid")
      return true
    } else {
      input.classList.remove("is-valid")
      input.classList.add("is-invalid")
      return false
    }
  }

  function bookTable() {
    hideMessages()

    const token = getToken()
    if (!token) {
      window.location.href = "/connexion"
      return
    }

    const inputAllergy = document.getElementById("allergie")
    const inputGuestNumber = document.getElementById("nbConvives")
    const inputOrderDate = document.getElementById("date")
    const inputOrderHour = document.getElementById("selectHour")

    const isGuestNumberValid = validateForm(inputGuestNumber)
    const isOrderDateValid = validateForm(inputOrderDate)
    const isOrderHourValid = validateForm(inputOrderHour)

    if (!isGuestNumberValid || !isOrderDateValid || !isOrderHourValid) {
      errorMessage.innerText = "Veuillez remplir toutes les informations."
      errorMessage.style.display = "block"
      return
    }

    const allergy = sanitizeHTML(inputAllergy.value)
    const guestNumber = parseInt(sanitizeHTML(inputGuestNumber.value), 10)
    const orderDate = sanitizeHTML(inputOrderDate.value)
    const orderHour = sanitizeHTML(inputOrderHour.value)

    const bookingData = {
      allergy,
      guestNumber,
      orderDate,
      orderHour,
      restaurantId: 1,
    }
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": token,
      },
      body: JSON.stringify(bookingData),
    }

    fetch(`${import.meta.env.VITE_API_URL}/api/booking/create`, requestOptions)
      .then(async function (response) {
        return response.json().then(function (data) {
          if (response.ok) {
            successMessage.innerText =
              "Réservation réussie ! Retrouvez tous les détails dans Vos réservations."
            successMessage.style.display = "block"

            setTimeout(function () {
              window.location.href = "/reservations"
            }, 3000)
          } else {
            errorMessage.innerText =
              data.message ||
              "Erreur lors de la réservation. Veuillez réessayer."
            errorMessage.style.display = "block"
          }
        })
      })
      .catch(function (error) {
        console.error(error)
        errorMessage.innerText =
          "Erreur lors de la réservation, veuillez réessayer."
        errorMessage.style.display = "block"
      })
  }

  async function loadHours(service) {
    let hours = []

    if (service === "midi") {
      hours = ["12:00", "12:15", "12:30", "12:45", "13:00", "13:15"]
    } else if (service === "soir") {
      hours = ["19:30", "19:45", "20:00", "20:15", "20:30", "20:45", "21:00"]
    }

    const selectHour = document.getElementById("selectHour")
    selectHour.innerHTML = "" // On vide l'ancien contenu

    hours.forEach((hour) => {
      const option = document.createElement("option")
      option.value = hour
      option.textContent = hour
      selectHour.appendChild(option)
    })
  }
}
