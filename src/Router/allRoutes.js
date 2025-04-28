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
    "client",
    "admin",
  ]),
  new Route(
    "/editPassword",
    "Changer de mot de passe",
    "/pages/auth/editPassword.html",
    ["client", "admin"]
  ),
  new Route("/carte", "La Carte", "/pages/menu.html", []),
  new Route("/reservations", "Vos Réservations", "/pages/bookingsList.html", [
    "client",
  ]),
  new Route("/reserver", "Réserver", "/pages/bookingAdd.html", ["client"]),
]

//Title is displayed such as : Route.title - websitename
export const websiteName = "Quai Antique"
