import { defineConfig } from "vite"
import path from "path"

export default defineConfig({
  root: "./src", // Spécifie que Vite doit considérer le dossier 'src' comme racine du projet
  publicDir: "../public", // Spécifie le dossier public pour les fichiers statiques
  build: {
    outDir: "../dist", // Le dossier où le build sera généré
    emptyOutDir: true, // Vide le dossier de sortie avant de reconstruire
  },
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"), // Alias pour les composants
      "@pages": path.resolve(__dirname, "src/pages"), // Alias pour les pages
      "@router": path.resolve(__dirname, "src/Router"), // Alias pour le router
      "@scss": path.resolve(__dirname, "src/scss"), // Alias pour les fichiers SCSS
    },
  },
  server: {
    open: true, // Ouvre automatiquement le navigateur au démarrage du serveur
    port: 3000, // Le port du serveur de développement
  },
})
