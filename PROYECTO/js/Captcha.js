// Captcha Limitado a 4 valores

let input=  document.getElementById('input-captcha');

input.addEventListener('input',function(){
  if (this.value.length > 4) 
     this.value = this.value.slice(0,4); 
})

// Validación del captcha

let captcha = document.querySelector("#captcha-codigo");
captcha.innerHTML = (Math.round(Math.random() * 9000 + 1000));
let valor = document.querySelector("#input-captcha");

function validar() {
    let valor = document.querySelector("#input-captcha");
    let textocaptcha= document.querySelector("#captcha-mensaje")
    if (captcha.innerHTML == valor.value) {
        divoculto.classList.remove("validacion-captcha");
        divoculto.classList.add("validacion-captcha-correcto");
        divoculto.classList.remove("validacion-captcha-incorrecto");
        textocaptcha.innerHTML= "Captcha Correcto";
    }
    else {
        divoculto.classList.remove("validacion-captcha");
        divoculto.classList.add("validacion-captcha-incorrecto");
        divoculto.classList.remove("validacion-captcha-correcto");
        textocaptcha.innerHTML= "Captcha Incorrecto";
    }
}


document.getElementById("boton-formulario").addEventListener("click", validar);