import Route from "./Route.js"

//Define Routes here
export const allRoutes = [
  new Route("/", "Accueil", "/pages/home.html"),
  new Route("/galerie", "Galerie", "/pages/galery.html", "/js/galery.js"),
  new Route(
    "/connexion",
    "Connexion",
    "/pages/auth/login.html",
    "/js/auth/signin.js"
  ),
  new Route(
    "/inscription",
    "Inscription",
    "/pages/auth/signup.html",
    "/js/auth/signup.js"
  ),
  new Route("/compte", "Mon Compte", "/pages/auth/account.html"),
  new Route(
    "/modifier-mot-de-passe",
    "Modifier mot de passe",
    "/pages/auth/editPassword.html"
  ),
  new Route("/carte", "La Carte", "/pages/menu.html"),
  new Route("/reservations", "Vos Réservations", "/pages/bookingsList.html"),
  new Route("/reserver", "Réserver", "/pages/bookingAdd.html"),
]

//Title is displayed such as : Route.title - websitename
export const websiteName = "Quai Antique"
