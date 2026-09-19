const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}

const header = document.querySelector(".site-header");
const progress = document.querySelector(".scroll-progress");
const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const updateChrome = () => {
  const scrollTop = window.scrollY;
  const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progressValue = pageHeight > 0 ? (scrollTop / pageHeight) * 100 : 0;

  if (progress) {
    progress.style.width = `${Math.min(progressValue, 100)}%`;
  }

  if (header) {
    header.classList.toggle("is-scrolled", scrollTop > 12);
  }

  document.body.classList.toggle("is-scrolled", scrollTop > 12);

  const activeSection = sections
    .slice()
    .reverse()
    .find((section) => section.offsetTop <= scrollTop + 140);
  const activeHref = activeSection ? `#${activeSection.id}` : "#work";

  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === activeHref);
  });
};

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 },
  );

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 45, 220)}ms`;
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

updateChrome();
window.addEventListener("scroll", updateChrome, { passive: true });

const updatePointerBackground = (event) => {
  const x = event.clientX - window.innerWidth / 2;
  const y = event.clientY - window.innerHeight / 2;

  document.body.style.setProperty("--mx", `${x}px`);
  document.body.style.setProperty("--my", `${y}px`);
};

if (window.matchMedia("(pointer: fine)").matches) {
  window.addEventListener("pointermove", updatePointerBackground, { passive: true });
}
