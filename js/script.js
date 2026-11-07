
// =================================
// 1. MENU RESPONSIVO
// =================================

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", function () {

    navLinks.classList.toggle("active");

    const menuAberto = navLinks.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", menuAberto);

    menuToggle.setAttribute(
        "aria-label",
        menuAberto ? "Fechar menu" : "Abrir menu"
    );

});


// =================================
// 2. FECHAR MENU AO CLICAR NO LINK
// =================================

const linksMenu = document.querySelectorAll(".nav-links a");

linksMenu.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.setAttribute("aria-label", "Abrir menu");

    });

});


// =================================
// 3. ANO AUTOMÁTICO NO RODAPÉ
// =================================

const anoAtual = document.getElementById("year");

anoAtual.textContent = new Date().getFullYear();
