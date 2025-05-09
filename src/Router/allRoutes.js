import Route from "./Route.js"

//Define Routes here
export const allRoutes = [
  new Route("/", "Accueil", "/pages/home.html", []),
  new Route("/galerie", "Galerie", "/pages/galery.html", [], "/js/galery.js"),
  new Route(
    "/connexion",
    "Connexion",
    "/pages/auth/login.html",
    ["disconnected"],
    "/js/auth/signin.js"
  ),
  new Route(
    "/inscription",
    "Inscription",
    "/pages/auth/signup.html",
    ["disconnected"],
    "/js/auth/signup.js"
  ),
  new Route("/compte", "Mon Compte", "/pages/auth/account.html", [
    "ROLE_USER",
    "ROLE_ADMIN",
  ]),
  new Route(
    "/password",
    "Changer de mot de passe",
    "/pages/auth/editPassword.html",
    ["ROLE_USER", "ROLE_ADMIN"]
  ),
  new Route("/carte", "La Carte", "/pages/menu.html", []),
  new Route(
    "/reservations",
    "Mes Réservations",
    "/pages/bookingsList.html",
    ["ROLE_USER"],
    "/js/bookingListing.js"
  ),
  new Route(
    "/reserver",
    "Réserver",
    "/pages/bookingAdd.html",
    [],
    "/js/booking.js"
  ),
]

//Title is displayed such as : Route.title - websitename
export const websiteName = "Quai Antique"
