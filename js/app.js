/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */

const navBar = idSelector("navbar__list"),
  sections = groupSelector(`section[id^='section']`),
  fragment = document.createDocumentFragment(),
  h2s = groupSelector(".landing__container h2"),
  textContents = groupSelector(
    ".landing__container .text-content"
  );
let isScrolling;

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

// function to select singlar item
function idSelector(sel) {
  return document.getElementById(sel);
}
// function to select group of items
function groupSelector(sel) {
  return document.querySelectorAll(sel);
}

// set active class to a clicked target , firstly, with removing from the list
function setActiveStates(list, target) {
  // remove active states from all links
  list.forEach((item) => item.classList.remove("active"));
  // add Active state to the clicked LINK
  target.classList.add("active");
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
sections.forEach(buildMenu);

// scrolling Functionality
function scrollToId(scrollValue) {
  //   scroll before 100 of the viewport
  window.scrollTo({
    behavior: "smooth",
    top: scrollValue - 70,
  });
}

function hideNavBarWhenIdle() {
  const header = document.querySelector(".page__header");

  header.style.transform = `translateY(0)`;

  if (
    window.scrollY >
    idSelector("section2").getBoundingClientRect().top
  ) {
    clearTimeout(isScrolling);

    isScrolling = setTimeout(() => {
      header.style.transform = `translateY(-70px)`;
    }, 6000);
  } else {
    header.style.transform = `translateY(0)`;
  }

  /* document.querySelector(
    ".page__header"
  ).style.transform = `translateY(0)`; */
}
/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
function buildMenu(section) {
  const itemNav = document.createElement("li"),
    linkNav = document.createElement("a");
  // add text to the anchor
  (linkNav.textContent = section.dataset.nav),
    //   put the anchor into the li
    itemNav.appendChild(linkNav);

  // setting anchor class names
  (linkNav.classList = "menu__link"),
    //   setting data-name for anchors
    linkNav.setAttribute("data-name", section.id);

  // add the LIs to Virtual Fragment
  fragment.appendChild(itemNav);
}
// insert the fragment into the navBar --only ONCE!  ==> 1 reflow, 1 repaint
navBar.appendChild(fragment);

// Click link to Scroll to section
navBar.addEventListener("click", (e) => {
  //   if section.id = name of the clicked anchor .. will assign the scrollValue to
  sections.forEach((s) => {
    if (s.id === e.target.dataset.name) {
      scrollToId(s.offsetTop, e.target.dataset.name);
    }
  });

  // prevent Default behavior of the element
  e.preventDefault();
});

// Set sections as active
document.addEventListener("scroll", () => {
  sections.forEach((section) => {
    //  get top offset of the element
    let topOffset = section.getBoundingClientRect().top;

    // check if the section in the viewport!
    if (topOffset < 200 && topOffset > 100) {
      setActiveStates(sections, section);
    }
  });

  // Invoke hide navBar Func
  hideNavBarWhenIdle();

  // show top-Button
  showTopButton();
});

function showTopButton() {
  if (
    window.scrollY >
    idSelector("section2").getBoundingClientRect().top
  )
    idSelector("top-btn").style.transform = `scale(1)`;
  else idSelector("top-btn").style.transform = `scale(0)`;
}

// General Functionalities

// scroll top Button
idSelector("top-btn").onclick = () => {
  // Scroll to top
  window.scrollTo(0, 0);
};

// date CopyRight
idSelector("date").textContent = new Date().getFullYear();

// collapsible sections
document
  .querySelector("main")
  .addEventListener("click", (e) => {
    h2s.forEach((h2) => {
      if (e.target === h2) {
        h2.classList.toggle("collapse");
        h2.nextElementSibling.classList.toggle("collapse");
      }
    });
  });
