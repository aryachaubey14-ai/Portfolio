const certificatesConfig = {
  deloitte: {
    title: "Data Analytics Job Simulation",
    issuer: "Deloitte · Forage",
    image: "deloitte-data-analytics.png"
  },

  tata: {
    title: "GenAI Powered Data Analytics Job Simulation",
    issuer: "Tata · Forage",
    image: "tata-genai-data-analytics.png"
  },

  sqlAdvanced: {
    title: "SQL Advanced Certificate",
    issuer: "HackerRank",
    image: "sql-advanced.png"
  },

  sqlBasic: {
    title: "SQL Basic Certificate",
    issuer: "HackerRank",
    image: "sql-basic.png"
  },

  generativeAI: {
    title: "Generative AI Foundations",
    issuer: "upGrad / Microsoft",
    image: "generative-ai-foundations.png"
  },

  powerBI: {
    title: "Power BI for Beginners",
    issuer: "Simplilearn / Microsoft",
    image: "power-bi-beginners.png"
  }
};

/* ==========================================================================
   SUBTLE PARTICLE BACKGROUND CANVAS
   ========================================================================== */
(function initParticles() {
  const canvas = document.getElementById("particle-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const particles = [];
  const particleCount = Math.min(Math.floor(width * 0.035), 45);

  class Particle {
    constructor() {
      this.reset(true);
    }
    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 10;
      this.size = Math.random() * 1.5 + 0.5;
      this.speedY = Math.random() * 0.4 + 0.15;
      this.speedX = (Math.random() - 0.5) * 0.2;
      this.opacity = Math.random() * 0.4 + 0.1;
    }
    update() {
      this.y -= this.speedY;
      this.x += this.speedX;
      if (this.y < -10 || this.x < -10 || this.x > width + 10) {
        this.reset();
      }
    }
    draw() {
      ctx.fillStyle = `rgba(0, 210, 255, ${this.opacity})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    requestAnimationFrame(animate);
  }

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  animate();
})();

/* ==========================================================================
   DUPLICATE MARQUEE CONTENT FOR SMOOTH SEAMLESS SCROLL
   ========================================================================== */
(function initMarquee() {
  const track = document.getElementById("skills-track");
  if (track) {
    track.innerHTML += track.innerHTML;
  }
})();

/* ==========================================================================
   NAVIGATION, ACTIVE SECTION & MOBILE MENU
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const navItems = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  // Mobile menu toggle
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", isOpen);
    });

    // Close menu on link click
    navItems.forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", false);
      });
    });
  }

  // Active section indicator on scroll
  window.addEventListener("scroll", () => {
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navItems.forEach((item) => {
          item.classList.remove("active");
          if (item.getAttribute("href") === `#${sectionId}`) {
            item.classList.add("active");
          }
        });
      }
    });
  });

  /* ==========================================================================
     INTERSECTION OBSERVER FOR SCROLL REVEAL ANIMATIONS
     ========================================================================== */
  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  /* ==========================================================================
     CERTIFICATE FILTERING
     ========================================================================== */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const certCards = document.querySelectorAll(".cert-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      certCards.forEach((card) => {
        const categories = card.getAttribute("data-category") || "";
        if (filter === "all" || categories.includes(filter)) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });

  /* ==========================================================================
     CERTIFICATE MODAL HANDLER
     ========================================================================== */
  const modal = document.getElementById("cert-modal");
  const modalClose = document.getElementById("modal-close");
  const modalTitle = document.getElementById("modal-title");
  const modalIssuer = document.getElementById("modal-issuer");
  const modalImgContainer = document.getElementById("modal-img-container");
  const modalFullView = document.getElementById("modal-full-view");

  function openModal(certKey) {
    const cert = certificatesConfig[certKey];
    if (!cert) return;

    modalTitle.textContent = cert.title;
    modalIssuer.textContent = cert.issuer;
    modalFullView.href = cert.image;

    // Load image gracefully with fallback
    modalImgContainer.innerHTML = "";
    const img = document.createElement("img");
    img.className = "modal-img";
    img.alt = `${cert.title} Certificate`;
    img.src = cert.image;

    img.onerror = function () {
      modalImgContainer.innerHTML = `<div class="modal-placeholder">Certificate image unavailable.<br><small style="color:var(--text-subtle);">(${cert.image})</small></div>`;
    };

    modalImgContainer.appendChild(img);

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  // Attach click events to all certificate view triggers
  document.querySelectorAll("[data-cert]").forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      const certKey = trigger.getAttribute("data-cert");
      openModal(certKey);
    });
  });

  if (modalClose) modalClose.addEventListener("click", closeModal);

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // Escape key to close modal
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      closeModal();
    }
  });
});
