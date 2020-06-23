document.addEventListener("DOMContentLoaded", function () {
  
  document.querySelector(".btn_menu").addEventListener("click", toggleMenu);
  document.querySelector(".link-sobre-nosotros").addEventListener("click", toggleMenu);
  document.querySelector(".link-contacto").addEventListener("click", toggleMenu);
  document.querySelectorAll("ul.nav-items > li > a").forEach((e) => e.addEventListener("click", toggleMenu));

  function toggleMenu() {
    document.querySelector(".nav").classList.toggle("show");
    let banner = document.querySelector(".banner");

    if (banner){
      banner.classList.toggle("mobile-hidden");
    }
  }
});
