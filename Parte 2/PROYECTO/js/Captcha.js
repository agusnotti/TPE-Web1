document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".btn_menu").addEventListener("click", toggleMenu);
  document.querySelector(".btn-filtros-mobile").addEventListener("click", toggleFiltros);
  document.querySelector(".btn-aplicar-filtros").addEventListener("click", toggleFiltros);

  function toggleMenu() {
    document.querySelector(".nav").classList.toggle("show");
    document.querySelector(".banner").classList.toggle("mobile-hidden");
  }

  function toggleFiltros() {
    document.querySelector(".container-filtros").classList.toggle("show");
  }

 

  // // Captcha Limitado a 4 valores

  // let input = document.getElementById('input-captcha');

  // input.addEventListener('input', function () {
  //     if (this.value.length > 4)
  //         this.value = this.value.slice(0, 4);
  // })

  // //Prevenir el uso de barra espaciadora

  // function bloquearEspacio() {
  //     if (event.keyCode == 32) {
  //         event.returnValue = false;
  //         return false;
  //     }
  // }

  // // Validación del captcha

  // let captcha = document.querySelector("#captcha-codigo");
  // captcha.innerHTML = (Math.round(Math.random() * 9000 + 1000));
  // let inputUsuario = document.querySelector("#input-captcha");

  // function validar() {
  //     event.preventDefault();
  //     let textocaptcha = document.querySelector("#captcha-mensaje")
  //     if (captcha.innerHTML === inputUsuario.value) {
  //         mensajeCaptcha.classList.remove("validacion-captcha");
  //         mensajeCaptcha.classList.add("validacion-captcha-correcto");
  //         mensajeCaptcha.classList.remove("validacion-captcha-incorrecto");
  //         textocaptcha.innerHTML = "Captcha Correcto";
  //     }
  //     else {
  //         mensajeCaptcha.classList.remove("validacion-captcha");
  //         mensajeCaptcha.classList.add("validacion-captcha-incorrecto");
  //         mensajeCaptcha.classList.remove("validacion-captcha-correcto");
  //         textocaptcha.innerHTML = "Captcha Incorrecto";
  //     }
  // }

  // document.getElementById("formulario-contacto").addEventListener("submit", validar);
  // document.getElementById("nombreformulario").addEventListener("keydown", bloquearEspacio);
  // document.getElementById("apellidoformulario").addEventListener("keydown", bloquearEspacio);
  // document.getElementById("codAreaformulario").addEventListener("keydown", bloquearEspacio);
  // document.getElementById("telefonoformulario").addEventListener("keydown", bloquearEspacio);
  // document.getElementById("correoformulario").addEventListener("keydown", bloquearEspacio);
});
