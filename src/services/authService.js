import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/registration`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    return response.data
  } catch (error) {
    console.error("Registration error:", error)
    throw error.response ? error.response.data : "Something went wrong"
  }
}

// Fonction pour se connecter et récupérer un token JWT
// login.js

export const login = async (email, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/login`,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    // Si la requête est réussie, les données sont dans response.data
    console.log(response.data.token)

    // Sauvegarder le token dans le localStorage ou sessionStorage
    localStorage.setItem("auth_token", response.data.token)

    return response.data
  } catch (error) {
    console.error("Login error:", error)

    // En cas d'erreur, tu peux gérer ça comme tu le souhaites
    // axios renvoie l'erreur dans `error.response`, qui contient les données de réponse de l'API
    if (error.response) {
      console.error("Error response:", error.response.data)
    }

    return null
  }
}

// Fonction pour récupérer l'utilisateur connecté (authentification)
export const getUser = async (uuid) => {
  const token = localStorage.getItem("auth_token")

  if (!token) {
    throw new Error("No authentication token found")
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/user/show/${uuid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": token, // Ajout du token dans l'en-tête
        },
      }
    )

    if (!response.ok) {
      throw new Error("Failed to fetch user")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
    return null
  }
}

// Fonction pour se déconnecter (effacer le token)
export const logout = () => {
  // Supprime le token du stockage local/session
  localStorage.removeItem("auth_token")
  sessionStorage.removeItem("auth_token")
}
