import { getInfosUser } from "../main.js"

export async function afterPageBookingListLoad() {
  const user = await getInfosUser()
  const bookings = user.bookings
  console.log(bookings)

  async function displayBookings() {
    const user = await getInfosUser()
    let bookings = user.bookings || []

    const container = document.getElementById("bookingsContainer")
    container.innerHTML = ""

    bookings = bookings
      .filter((booking) => isFutureBooking(booking.orderHour))
      .sort((a, b) => new Date(a.orderHour) - new Date(b.orderHour))

    bookings.forEach((booking) => {
      const card = createBookingCard(booking)

      const col = document.createElement("div")
      col.className = "col-12 col-md-6 col-lg-4"
      col.appendChild(card)
      container.appendChild(col)
    })
  }

  function formatDayMonth(dateString) {
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.toLocaleString("fr-FR", { month: "short" })
    return `${day} ${month}`
  }

  function extractHour(dateString) {
    const date = new Date(dateString)
    return date.toTimeString().slice(0, 5)
  }

  function isFutureBooking(dateString) {
    const now = new Date()
    const bookingDate = new Date(dateString)
    return bookingDate > now
  }

  function createBookingCard(booking) {
    const bookingDate = new Date(booking.orderDate)
    const dayMonth = formatDayMonth(booking.orderDate)
    const year = bookingDate.getFullYear()
    const hour = extractHour(booking.orderHour)

    const card = document.createElement("div")
    card.className = "card mb-3"

    const hasAllergies = bookings.allergy !== "" ? true : false

    card.innerHTML = `
      <div class="card-header bg-secondary text-black d-flex justify-content-between align-items-center">
        <strong>${user.lastName}</strong>
        <i class="bi bi-check-circle-fill"></i>
      </div>
      <div class="card-body">
        <div class="row mb-3">
          <div class="col-4 d-flex flex-column align-items-center">
            <i class="bi bi-calendar-event" style="font-size: 1.5rem"></i>
            <div><strong>${dayMonth}</strong></div>
            <small class="text-muted">${year}</small>
          </div>
          <div class="col-4 d-flex flex-column align-items-center">
            <i class="bi bi-clock" style="font-size: 1.5rem"></i>
            <div><strong>${hour}</strong></div>
          </div>
          <div class="col-4 d-flex flex-column align-items-center">
            <i class="bi bi-people-fill" style="font-size: 1.5rem"></i>
            <div><strong>${booking.guestNumber}</strong></div>
            <small class="text-muted">convives</small>
          </div>
        </div>
  
        ${
          hasAllergies
            ? `
        <div class="alert alert-warning d-flex align-items-center p-2 m-0" role="alert">
          <i class="bi bi-exclamation-triangle-fill me-2"></i>
          <div>Allergies</div>
        </div>`
            : ""
        }
      </div>
      <div class="card-footer d-flex justify-content-around">
        <a href="/reservation/${
          booking.uuid
        }" class="btn btn-link text-primary p-0" title="Voir détails">
        <i class="bi bi-eye-fill" style="font-size: 1.5rem"></i>
      </a>

      <a href="/edit-reservation/${
        booking.uuid
      }" class="btn btn-link text-primary p-0" title="Modifier réservation">
        <i class="bi bi-pencil-fill" style="font-size: 1.5rem"></i>
      </a>
        <button class="btn btn-link text-dark p-0" title="Supprimer réservation">
          <i class="bi bi-trash-fill" style="font-size: 1.5rem"></i>
        </button>
      </div>
    `

    return card
  }

  displayBookings()
}

// allergy: "Gluten"
// createdAt: "2025-04-26T14:16:57+00:00"
// guestNumber: 2
// id: 1
// orderDate: "2025-05-01T00:00:00+00:00"
// orderHour: "2025-04-26T19:30:00+00:00"
// restaurant: []
// updatedAt: null
// uuid: "601dc305-ed91-4903-9954-84caf75d29bd"
