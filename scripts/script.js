let mobileMenu = document.querySelector("#hamburger-menu");
let navBar = document.querySelector(".navbar");

mobileMenu.addEventListener("click", () => {
  mobileMenu.classList.toggle("ri-close-large-line");
  navBar.classList.toggle("active");
});

let sections = document.querySelectorAll("section");
let navBarLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((section) => {
    let top = window.scrollY;
    let offset = section.offsetTop - 150;
    let height = section.offsetHeight;
    let id = section.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navBarLinks.forEach((link) => {
        link.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });

  let header = document.querySelector("header");
  header.classList.toggle("sticky-navbar", window.scrollY > 100);

  mobileMenu.classList.remove("ri-close-large-line");
  navBar.classList.remove("active");
};

const scrollUp = () => {
  const scrollUpComponent = document.getElementById("scroll-up");
  if (!scrollUpComponent) return;

  if (window.scrollY >= 350) {
    scrollUpComponent.classList.add("show-scroll-up");
  } else {
    scrollUpComponent.classList.remove("show-scroll-up");
  }

  if (window.scrollY >= 3400) {
    scrollUpComponent.classList.add("scroll-up-color");
  } else {
    scrollUpComponent.classList.remove("scroll-up-color");
  }
};

window.addEventListener("scroll", scrollUp);

const scrollReveal = ScrollReveal({
  reset: true,
  distance: "79px",
  duration: 2000,
  delay: 199,
});

scrollReveal.reveal(".home-content, .heading", { origin: "top" });
scrollReveal.reveal(
  ".home-image, .services-container, .project-box, .contact form",
  { origin: "bottom" }
);
scrollReveal.reveal(".home-content h1, .home-content h4, .about-image", {
  origin: "left",
});
scrollReveal.reveal(".home-content p, .about-content", { origin: "right" });

const whoAreYou = new Typed("#who-are-you", {
  strings: [
    "software engineer.",
    "entrepreneur.",
    "multi-disciplinary creative.",
  ],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true,
});

document
  .getElementById("contact-form")
  .addEventListener("submit", handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  fetch(form.action, {
    method: form.method,
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log('Success:', data);
      form.reset();
      Swal.fire({
        title: "Success!",
        text: "Your message has been sent successfully.",
        icon: "success",
        confirmButtonText: "OK",
        customClass: {
          popup: "swal-wide",
        },
      });
    })
    .catch((error) => {
      // console.error('Error:', error);
      Swal.fire({
        title: "Error!",
        text: "There was an error sending your message. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
        customClass: {
          popup: "swal-wide",
        },
      });
    });
}
