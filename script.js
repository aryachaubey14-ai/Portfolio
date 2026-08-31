/* =========================================================
   NAVBAR SCROLL EFFECT
========================================================= */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


/* =========================================================
   MOBILE MENU
========================================================= */

const menuButton =
    document.querySelector(".menu-button");

const mobileMenu =
    document.querySelector(".mobile-menu");


menuButton.addEventListener("click", () => {

    mobileMenu.classList.toggle("active");

});


document
    .querySelectorAll(".mobile-menu a")
    .forEach((link) => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("active");

        });

    });


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* =========================================================
   CURSOR GLOW
========================================================= */

const cursorGlow =
    document.querySelector(".cursor-glow");


window.addEventListener("mousemove", (event) => {

    cursorGlow.style.left =
        `${event.clientX}px`;

    cursorGlow.style.top =
        `${event.clientY}px`;

});


/* =========================================================
   MAGNETIC BUTTON EFFECT
========================================================= */

const magneticElements =
    document.querySelectorAll(".magnetic");


magneticElements.forEach((element) => {

    element.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                element.getBoundingClientRect();

            const x =
                event.clientX -
                rect.left -
                rect.width / 2;

            const y =
                event.clientY -
                rect.top -
                rect.height / 2;


            element.style.transform =
                `translate(${x * 0.12}px,
                           ${y * 0.12}px)`;

        }
    );


    element.addEventListener(
        "mouseleave",
        () => {

            element.style.transform =
                "translate(0px, 0px)";

        }
    );

});


/* =========================================================
   CERTIFICATE MODAL
========================================================= */

const certificateCards =
    document.querySelectorAll(
        ".certificate-card"
    );

const certificateModal =
    document.querySelector(
        "#certificateModal"
    );

const modalImage =
    document.querySelector(
        "#modalImage"
    );

const modalTitle =
    document.querySelector(
        "#modalTitle"
    );

const modalClose =
    document.querySelector(
        ".modal-close"
    );


certificateCards.forEach((card) => {

    card.addEventListener("click", () => {

        const image =
            card.dataset.image;

        const title =
            card.dataset.title;


        modalImage.src =
            image;

        modalImage.alt =
            title;

        modalTitle.textContent =
            title;


        certificateModal.classList.add(
            "active"
        );

        document.body.style.overflow =
            "hidden";

    });

});


function closeModal() {

    certificateModal.classList.remove(
        "active"
    );

    document.body.style.overflow =
        "";

}


modalClose.addEventListener(
    "click",
    closeModal
);


certificateModal.addEventListener(
    "click",
    (event) => {

        if (
            event.target ===
            certificateModal
        ) {

            closeModal();

        }

    }
);


document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape"
        ) {

            closeModal();

        }

    }
);


/* =========================================================
   SMOOTH ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );

const navLinks =
    document.querySelectorAll(
        ".nav-links a"
    );


window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop - 200;

        const sectionHeight =
            section.offsetHeight;


        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
            sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach((link) => {

        link.style.color = "";

        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {

            link.style.color =
                "#d8ff7f";

        }

    });

});
