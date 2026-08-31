const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const scrollProgress = document.getElementById("scrollProgress");
const year = document.getElementById("year");

const savedTheme = localStorage.getItem("portfolio-theme");
const preferredDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  localStorage.setItem("portfolio-theme", theme);
  themeIcon.textContent = theme === "dark" ? "☼" : "◐";
  themeToggle.setAttribute(
    "aria-label",
    theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
  );
}

setTheme(savedTheme || (preferredDark ? "dark" : "light"));

themeToggle.addEventListener("click", () => {
  const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  setTheme(nextTheme);
});

menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  });
});

function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (scrollTop / scrollable) * 100 : 0;
  scrollProgress.style.width = `${progress}%`;
}

window.addEventListener("scroll", updateScrollProgress, { passive: true });
updateScrollProgress();

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

year.textContent = new Date().getFullYear();

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const id = link.getAttribute("href");
    if (id === "#") return;

    const target = document.querySelector(id);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
