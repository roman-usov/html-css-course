"use strict";

const navButtonResponsiveEl = document.querySelector(".btn-mobile-nav");
const yearEl = document.querySelector(".year");
const bodyEl = document.querySelector("body");
const headerEl = document.querySelector(".header");
const heroSectionEl = document.querySelector(".section-hero");

window.addEventListener("load", () => {
  const year = new Date().getFullYear();

  yearEl.textContent = `${year}`;
});

navButtonResponsiveEl.addEventListener("click", (e) => {
  const header = e.target.closest(".header");

  if (!header) return;

  header.classList.toggle("nav-open");
});

///////////////////////////////////////////////////////////
// Smooth scrolling for Safari

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const href = link.getAttribute("href");

    //Scroll back to top
    if (href === "#") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    //Scroll to other sections
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({behavior: "smooth"});
    }

    //Close the mobile navigation menu
    if (link.classList.contains("main-nav-link")) {
      headerEl.classList.remove("nav-open");
    }
  });
});

///////////////////////////////////////////////////////////
// Sticky navigation

// Introduce a variable that will be calculating the actual height of the nav bar
const navHeight = headerEl.getBoundingClientRect().height;

function activateStickyNav(entries) {
  const entry = entries[0];

  if (!entry.isIntersecting) {
    bodyEl.classList.add("sticky");
  } else {
    bodyEl.classList.remove("sticky");
  }
}

const stickyNavObserver = new IntersectionObserver(activateStickyNav, {
  // root: null means that we are operating inside the viewport
  root: null,

  // threshold: 0 means that we want the function associated with the observer called as soon as 0% of the observed element is in the viewport
  threshold: 0,

  // rootMargin: -8rem reduces the viewport by 8rem, i.e. when 80px of the Hero Section is left, the sticky navigation will kick in.
  rootMargin: `-${navHeight}px`,
});
stickyNavObserver.observe(heroSectionEl);

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  const flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  const isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}

checkFlexGap();

// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js

/*
.no-flexbox-gap .main-nav-list li:not(:last-child) {
  margin-right: 4.8rem;
}

.no-flexbox-gap .list-item:not(:last-child) {
  margin-bottom: 1.6rem;
}

.no-flexbox-gap .list-icon:not(:last-child) {
  margin-right: 1.6rem;
}

.no-flexbox-gap .delivered-faces {
  margin-right: 1.6rem;
}

.no-flexbox-gap .meal-attribute:not(:last-child) {
  margin-bottom: 2rem;
}

.no-flexbox-gap .meal-icon {
  margin-right: 1.6rem;
}

.no-flexbox-gap .footer-row div:not(:last-child) {
  margin-right: 6.4rem;
}

.no-flexbox-gap .social-links li:not(:last-child) {
  margin-right: 2.4rem;
}

.no-flexbox-gap .footer-nav li:not(:last-child) {
  margin-bottom: 2.4rem;
}

@media (max-width: 75em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 3.2rem;
  }
}

@media (max-width: 59em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 0;
    margin-bottom: 4.8rem;
  }
}
*/
