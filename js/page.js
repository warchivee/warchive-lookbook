// script.js
document.addEventListener("DOMContentLoaded", function () {
  const mainElement = document.querySelector("main");
  mainElement.classList.add("fade-in");

  const links = document.querySelectorAll("header a");
  links.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const url = this.href;
      mainElement.classList.remove("fade-in");
      mainElement.style.opacity = "0";
      setTimeout(function () {
        window.location.href = url;
      }, 1000);
    });
  });
});
