/* =====================================================
   CERTIFICATE CONFIGURATION

   IMPORTANT:
   These image files must be in the SAME folder as
   index.html OR change the paths below.
===================================================== */

const certificates = {

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


/* =====================================================
   MOBILE NAVIGATION
===================================================== */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn) {

  menuBtn.addEventListener("click", () => {

    navMenu.classList.toggle("open");

  });

}


document.querySelectorAll("nav a").forEach(link => {

  link.addEventListener("click", () => {

    navMenu.classList.remove("open");

  });

});


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(

  entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

        observer.unobserve(entry.target);

      }

    });

  },

  {
    threshold: 0.12
  }

);


revealElements.forEach(element => {

  observer.observe(element);

});


/* =====================================================
   CERTIFICATE MODAL
===================================================== */

const modal = document.getElementById("certificateModal");

const modalClose =
  document.getElementById("modalClose");

const modalTitle =
  document.getElementById("modalTitle");

const modalIssuer =
  document.getElementById("modalIssuer");

const certificateImage =
  document.getElementById("certificateImage");

const openFull =
  document.getElementById("openFull");

const imageError =
  document.getElementById("imageError");


function openCertificate(key) {

  const certificate = certificates[key];

  if (!certificate) {

    console.error(
      "Certificate configuration not found:",
      key
    );

    return;

  }


  modalTitle.textContent =
    certificate.title;

  modalIssuer.textContent =
    certificate.issuer;


  certificateImage.style.display = "block";

  imageError.style.display = "none";


  certificateImage.src =
    certificate.image;

  certificateImage.alt =
    certificate.title;


  openFull.href =
    certificate.image;


  modal.classList.add("open");

  document.body.style.overflow = "hidden";

}


function closeCertificate() {

  modal.classList.remove("open");

  document.body.style.overflow = "";

}


/* =====================================================
   CERTIFICATE BUTTONS
===================================================== */

document
  .querySelectorAll("[data-certificate]")
  .forEach(button => {

    button.addEventListener("click", event => {

      event.preventDefault();

      const key =
        button.dataset.certificate;

      openCertificate(key);

    });

  });


/* =====================================================
   IMAGE ERROR HANDLING
===================================================== */

certificateImage.addEventListener(
  "error",
  () => {

    certificateImage.style.display = "none";

    imageError.style.display = "block";

  }
);


/* =====================================================
   CLOSE MODAL
===================================================== */

modalClose.addEventListener(
  "click",
  closeCertificate
);


modal.addEventListener(
  "click",
  event => {

    if (event.target === modal) {

      closeCertificate();

    }

  }
);


document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape" &&
      modal.classList.contains("open")
    ) {

      closeCertificate();

    }

  }
);


/* =====================================================
   BACKGROUND PARTICLES
===================================================== */

const canvas =
  document.getElementById("particles");

const ctx =
  canvas.getContext("2d");


let particles = [];

let width;
let height;


function resizeCanvas() {

  width =
    canvas.width =
    window.innerWidth;

  height =
    canvas.height =
    window.innerHeight;

}


resizeCanvas();

window.addEventListener(
  "resize",
  resizeCanvas
);


/* Create particles */

for (let i = 0; i < 65; i++) {

  particles.push({

    x: Math.random() * window.innerWidth,

    y: Math.random() * window.innerHeight,

    size: Math.random() * 1.8 + .4,

    speedX:
      (Math.random() - .5) * .25,

    speedY:
      (Math.random() - .5) * .25,

    opacity:
      Math.random() * .6 + .15

  });

}


/* Animate particles */

function animateParticles() {

  ctx.clearRect(
    0,
    0,
    width,
    height
  );


  particles.forEach(particle => {

    particle.x +=
      particle.speedX;

    particle.y +=
      particle.speedY;


    /* Wrap around */

    if (particle.x < 0)
      particle.x = width;

    if (particle.x > width)
      particle.x = 0;

    if (particle.y < 0)
      particle.y = height;

    if (particle.y > height)
      particle.y = 0;


    ctx.beginPath();

    ctx.arc(
      particle.x,
      particle.y,
      particle.size,
      0,
      Math.PI * 2
    );


    ctx.fillStyle =
      `rgba(0,217,255,${particle.opacity})`;

    ctx.fill();

  });


  requestAnimationFrame(
    animateParticles
  );

}


animateParticles();


/* =====================================================
   FIGMA LINK
===================================================== */

/*
   Replace the # in index.html with your actual
   Figma project link.

   Example:

   https://www.figma.com/design/...
*/

const figmaLink =
  document.getElementById("figmaLink");


figmaLink.addEventListener(
  "click",
  event => {

    if (figmaLink.getAttribute("href") === "#") {

      event.preventDefault();

      alert(
        "Add your Figma project link in index.html."
      );

    }

  }
);
