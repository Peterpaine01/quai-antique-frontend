export const headerHTML = `
<header class="d-none d-md-block">
  <nav class="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">Quai Antique</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" href="/">Accueil</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/carte">À la Carte</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/reserver">Réserver</a>
          </li> 
          <li class="nav-item">
            <a class="nav-link" href="/galerie">Galerie</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/contact">Contact</a>
          </li>
          <!--
          <li class="nav-item">
            <a class="nav-link" href="/compte">Mon compte</a>
          </li>
          -->
          <li class="nav-item">
            <a class="nav-link" href="/connexion">Se connecter</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="" id="btn-signout">Se déconnecter</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</header>

<nav class="navbar bg-dark fixed-top d-md-none">
  <div class="container-fluid">
    <a class="navbar-brand text-white" href="#">Quai Antique</a>
    <button class="navbar-toggler rounded-circle d-flex justify-content-center align-items-center" style="height: 50px; width: 50px;" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon text-white"></span>
    </button>

    <div class="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
      <div class="offcanvas-header">
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>

      <div class="offcanvas-body d-flex flex-column justify-content-between">
        <!-- Navigation -->
        <ul class="navbar-nav gap-3">
          <li class="nav-item">
            <a class="nav-link text-white" href="/">Accueil</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-white" href="/carte">À la carte</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-white" href="/reserver">Réserver</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-white" href="/galerie">En images</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-white" href="/contact">Contact</a>
          </li>
        </ul>

        <!-- Réseaux sociaux & mentions -->
        <div class="mt-4 flex-column d-column align-items-center text-center">
          <div class="d-flex justify-content-center align-items-center  gap-3 mb-5">
            <a href="#" class="text-white"><i class="bi bi-facebook fs-1"></i></a>
            <a href="#" class="text-white">
              <img src="../images/tripadvisor.svg" class="social-icon" alt="Tripadvisor">
            </a>
            <a href="#" class="text-white"><i class="bi bi-instagram fs-1"></i></a>
          </div>
          <a href="#mentions" class="text-white-50 small text-decoration-none">Mentions légales</a>
        </div>
      </div>
    </div>
  </div>
</nav>

`
