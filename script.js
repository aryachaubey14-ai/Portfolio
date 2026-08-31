/* ========================================
   BACKGROUND SPARKLES
======================================== */

const particles = document.getElementById("particles");

for (let i = 0; i < 45; i++) {

    const sparkle = document.createElement("span");

    sparkle.classList.add("sparkle");

    sparkle.style.left = Math.random() * 100 + "%";

    sparkle.style.animationDuration =
        (8 + Math.random() * 15) + "s";

    sparkle.style.animationDelay =
        (Math.random() * 10) + "s";

    sparkle.style.transform =
        `scale(${0.5 + Math.random()})`;

    particles.appendChild(sparkle);
}



/* ========================================
   MOBILE NAVIGATION
======================================== */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("open");

});


document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("open");

    });

});



/* ========================================
   SCROLL PROGRESS
======================================== */

window.addEventListener("scroll", () => {

    const scrollTop =
        window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress =
        (scrollTop / documentHeight) * 100;

    document.getElementById("scrollProgress")
        .style.width = progress + "%";

});



/* ========================================
   REVEAL ANIMATIONS
======================================== */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});



/* ========================================
   ACTIVE NAVIGATION
======================================== */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".nav-link");


const sectionObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    navLinks.forEach(link => {

                        link.classList.remove("active");

                    });

                    const activeLink =
                        document.querySelector(
                            `.nav-link[href="#${entry.target.id}"]`
                        );

                    if (activeLink) {

                        activeLink.classList.add("active");

                    }

                }

            });

        },

        {
            threshold: 0.35
        }

    );


sections.forEach(section => {

    sectionObserver.observe(section);

});



/* ========================================
   SKILLS HOVER
======================================== */

const skills =
    document.querySelectorAll(".skill");

const skillDescription =
    document.getElementById("skillDescription");


skills.forEach(skill => {

    skill.addEventListener("mouseenter", () => {

        skillDescription.textContent =
            skill.dataset.description;

    });

});



/* ========================================
   PROJECT / GENERAL HOVER
======================================== */


/* ========================================
   CERTIFICATE DATA
======================================== */

const certificates = {

    "deloitte":
        "certificates/deloitte-data-analytics.png",

    "tata":
        "certificates/tata-genai-data-analytics.png",

    "sql-advanced":
        "certificates/sql-advanced.png",

    "sql-basic":
        "certificates/sql-basic.png",

    "generative-ai":
        "certificates/generative-ai-foundations.png",

    "power-bi":
        "certificates/power-bi-beginners.png"

};



/* ========================================
   CERTIFICATE MODAL
======================================== */

const modal =
    document.getElementById("certificateModal");

const modalClose =
    document.getElementById("modalClose");

const certificateImage =
    document.getElementById("certificateImage");

const fullSizeLink =
    document.getElementById("fullSizeLink");


function openCertificate(type) {

    const imagePath =
        certificates[type];

    if (!imagePath) {

        alert("Certificate file not found.");

        return;

    }

    certificateImage.src =
        imagePath;

    fullSizeLink.href =
        imagePath;

    modal.classList.add("open");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow =
        "hidden";

}


function closeCertificate() {

    modal.classList.remove("open");

    modal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow =
        "";

    setTimeout(() => {

        certificateImage.src = "";

    }, 300);

}



/* Buttons */

document
    .querySelectorAll(
        ".view-certificate, .training-certificate"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                openCertificate(
                    button.dataset.certificate
                );

            }
        );

    });



/* Close button */

modalClose.addEventListener(
    "click",
    closeCertificate
);



/* Click outside */

modal.addEventListener(
    "click",
    event => {

        if (event.target === modal) {

            closeCertificate();

        }

    }
);



/* Escape key */

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



/* ========================================
   CERTIFICATE FILTERS
======================================== */

const filters =
    document.querySelectorAll(".filter");

const certificateCards =
    document.querySelectorAll(".certificate-card");


filters.forEach(filter => {

    filter.addEventListener("click", () => {

        filters.forEach(item => {

            item.classList.remove("active");

        });

        filter.classList.add("active");

        const selected =
            filter.dataset.filter;


        certificateCards.forEach(card => {

            if (selected === "all") {

                card.classList.remove("hidden");

                return;

            }


            const categories =
                card.dataset.category.split(" ");


            if (categories.includes(selected)) {

                card.classList.remove("hidden");

            } else {

                card.classList.add("hidden");

            }

        });

    });

});



/* ========================================
   SUBTLE MOUSE PARALLAX
======================================== */

const heroName =
    document.querySelector(".hero-name");


document.addEventListener("mousemove", event => {

    if (window.innerWidth < 900) return;

    const x =
        (event.clientX / window.innerWidth - 0.5) * 8;

    const y =
        (event.clientY / window.innerHeight - 0.5) * 8;


    heroName.style.transform =
        `translate(${x}px, ${y}px)`;

});
