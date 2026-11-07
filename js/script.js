
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

    menuToggle.textContent = menuAberto ? "×" : "☰";
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
        menuToggle.textContent = "☰";

    });

});


// =================================
// 3. ANO AUTOMÁTICO NO RODAPÉ
// =================================

const anoAtual = document.getElementById("current-year");

anoAtual.textContent = new Date().getFullYear();



// =================================
// 4. REDE NEURAL ANIMADA
// =================================

const canvas = document.getElementById("neural-network");
const ctx = canvas.getContext("2d");

let particles = [];
let animationId;

const prefersReducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// CRIAR AS PARTÍCULAS E AJUSTAR O CANVAS

function resizeCanvas() {

    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);

    canvas.width = window.innerWidth * pixelRatio;
    canvas.height = window.innerHeight * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    const quantidade = Math.max(
        35,
        Math.min(
            100,
            Math.floor(
                (window.innerWidth * window.innerHeight) / 9000
            )
        )
    );

    particles = [];

    for (let i = 0; i < quantidade; i++) {

        particles.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5
        });

    }

}

// DESENHAR A REDE

function drawNetwork() {

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    particles.forEach((particle, index) => {

        if (!prefersReducedMotion) {
            particle.x += particle.vx;
            particle.y += particle.vy;
        }

        if (particle.x < 0 || particle.x > window.innerWidth) {
            particle.vx *= -1;
        }

        if (particle.y < 0 || particle.y > window.innerHeight) {
            particle.vy *= -1;
        }

        for (let j = index + 1; j < particles.length; j++) {

            const other = particles[j];

            const dx = particle.x - other.x;
            const dy = particle.y - other.y;

            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 160) {

                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(other.x, other.y);

                ctx.strokeStyle =
                    `rgba(96, 165, 250, ${0.65 * (1 - distance / 160)})`;

                ctx.lineWidth = 0.8;
                ctx.stroke();

            }

        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);

        ctx.fillStyle = "#60A5FA";
        ctx.fill();

    });

    if (!prefersReducedMotion) {
        animationId = requestAnimationFrame(drawNetwork);
    }

}

// INICIALIZAÇÃO

resizeCanvas();
drawNetwork();

// REDIMENSIONAMENTO

window.addEventListener("resize", () => {

    cancelAnimationFrame(animationId);

    resizeCanvas();
    drawNetwork();

});
