// Captcha Limitado a 4 valores

let input=  document.getElementById('input-captcha');

input.addEventListener('input',function(){
  if (this.value.length > 4) 
     this.value = this.value.slice(0,4); 
})

// Validación del captcha

let captcha = document.querySelector("#captcha-codigo");
captcha.innerHTML = (Math.round(Math.random() * 9000 + 1000));
let inputUsuario = document.querySelector("#input-captcha");

function validar() {
    let textocaptcha= document.querySelector("#captcha-mensaje")
    if (captcha.innerHTML === inputUsuario.value) {
        mensajeCaptcha.classList.remove("validacion-captcha");
        mensajeCaptcha.classList.add("validacion-captcha-correcto");
        mensajeCaptcha.classList.remove("validacion-captcha-incorrecto");
        textocaptcha.innerHTML= "Captcha Correcto";
    }
    else {
        mensajeCaptcha.classList.remove("validacion-captcha");
        mensajeCaptcha.classList.add("validacion-captcha-incorrecto");
        mensajeCaptcha.classList.remove("validacion-captcha-correcto");
        textocaptcha.innerHTML= "Captcha Incorrecto";
    }
}


document.getElementById("boton-formulario").addEventListener("click", validar);