import { login } from "../../services/authService"

document
  .getElementById("login-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault()

    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    try {
      const data = await login(email, password)

      if (data && data.apiToken) {
        // Si la connexion est réussie, rediriger l'utilisateur vers la page d'accueil ou autre page sécurisée
        window.location.href = "/" // Remplacer par la page de redirection après la connexion
      } else {
        throw new Error("Connexion échouée")
      }
    } catch (error) {
      // Afficher un message d'erreur si la connexion échoue
      document.getElementById("error-message").classList.remove("d-none")
    }
  })
