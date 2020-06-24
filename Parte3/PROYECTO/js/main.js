document.addEventListener("DOMContentLoaded", function () {
  /*--------------------------------------------  PARTIAL RENDER ------------------------------*/

  let container = document.querySelector("#use-ajax");

  let btnsNav = document.querySelectorAll("ul.nav-izquierdo > li > a");
  btnsNav.forEach((e) => e.addEventListener("click", renderPage));

  let btnsBreadcrumb, btnsCategorias, btnsProductos;

  addEvents();

  callAjax("html/home.html");

  function callAjax(url) {
    let mensajeCargando = "Loading...";
    let mensajeError = "Error - Failed URL!";
    let mensajeErrorConexion = "Connection error";

    let pMensaje = document.createElement('p');
    
    pMensaje.innerHTML = mensajeCargando;
    container.appendChild(pMensaje);

    fetch(url)
      .then(function (response) {
        if (response.ok) {
          response.text().then(processText);
        } else {
          pMensaje.innerHTML= mensajeError;
          container.appendChild(pMensaje);
        }
      })
      .catch(function (response) {
        pMensaje.innerHTML = mensajeErrorConexion;
        container.appendChild(pMensaje);
      });
    }

  function renderPage(event) {
    event.preventDefault();
    let url = this.getAttribute("href"); // this --> hace referencia al elemento al que le asigno el evento

    callAjax(url);
  }

  function processText(t) {
    document.querySelector("#use-ajax").innerHTML = t;
    addEvents();

    if (document.getElementById("formulario-contacto")) {
      //si encuentra el elemento
      addEventsHome();
    }

    if (document.getElementById("nombre-tabla")) {
      //si encuentra el elemento
      addEventsTabla();
    }
  }

  function addEvents() {
    btnsBreadcrumb = document.querySelectorAll("ul.breadcrumb > li > a");
    btnsCategorias = document.querySelectorAll(".container-imagenes a");
    btnsProductos = document.querySelectorAll(".container-imagenes a");
    btnsBreadcrumb.forEach((e) => e.addEventListener("click", renderPage));
    btnsCategorias.forEach((e) => e.addEventListener("click", renderPage));
    btnsProductos.forEach((e) => e.addEventListener("click", renderPage));
  }

  // ------------------------------------     HOME HTML    ------------------------------------------
  let input;
  let captcha;
  let inputUsuario;

  function addEventsHome() {
    document
      .getElementById("formulario-contacto")
      .addEventListener("submit", validar);
    document
      .getElementById("nombreformulario")
      .addEventListener("keydown", bloquearEspacio);
    document
      .getElementById("apellidoformulario")
      .addEventListener("keydown", bloquearEspacio);
    document
      .getElementById("codAreaformulario")
      .addEventListener("keydown", bloquearEspacio);
    document
      .getElementById("telefonoformulario")
      .addEventListener("keydown", bloquearEspacio);
    document
      .getElementById("correoformulario")
      .addEventListener("keydown", bloquearEspacio);
    document
      .querySelector(".btn-filtros-mobile")
      .addEventListener("click", toggleFiltros);
    document
      .querySelector(".btn-aplicar-filtros")
      .addEventListener("click", toggleFiltros);
    document
      .querySelector(".ver-mas")
      .addEventListener("click", mostrarInformacion);
    document
      .querySelector(".ver-menos")
      .addEventListener("click", mostrarInformacion);

    // Captcha Limitado a 4 valores
    input = document.getElementById("input-captcha");

    input.addEventListener("input", function () {
      if (this.value.length > 4) this.value = this.value.slice(0, 4);
    });

    // Validación del captcha
    captcha = document.querySelector("#captcha-codigo");
    captcha.innerHTML = Math.round(Math.random() * 9000 + 1000);
    inputUsuario = document.querySelector("#input-captcha");
  }

  function toggleFiltros() {
    document.querySelector(".container-filtros").classList.toggle("show");
  }

  function mostrarInformacion() {
    document.querySelector(".ver-mas").classList.toggle("mobile-hidden");
    document
      .querySelector("#parrafo-adicional")
      .classList.toggle("mobile-hidden");
    document.querySelector(".ver-menos").classList.toggle("mobile-hidden");
  }

  //Prevenir el uso de barra espaciadora
  function bloquearEspacio() {
    if (event.keyCode == 32) {
      event.returnValue = false;
      return false;
    }
  }

  function validar() {
    event.preventDefault();
    let textocaptcha = document.querySelector("#captcha-mensaje");
    if (captcha.innerHTML === inputUsuario.value) {
      mensajeCaptcha.classList.remove("validacion-captcha");
      mensajeCaptcha.classList.add("validacion-captcha-correcto");
      mensajeCaptcha.classList.remove("validacion-captcha-incorrecto");
      textocaptcha.innerHTML = "Captcha Correcto";
    } else {
      mensajeCaptcha.classList.remove("validacion-captcha");
      mensajeCaptcha.classList.add("validacion-captcha-incorrecto");
      mensajeCaptcha.classList.remove("validacion-captcha-correcto");
      textocaptcha.innerHTML = "Captcha Incorrecto";
    }
  }

  //-------------------------------     FUNCIONALIDAD TABLA     --------------------------------------
  let nombreProducto;
  let descripcionProducto;
  let tamañoProducto;
  let precioProducto;
  let table;
  let cantcolores = 0;
  let colores = [
    "color-resaltado-1",
    "color-resaltado-2",
    "color-resaltado-3",
    "color-resaltado-4",
    "color-resaltado-5",
  ];

  //ARREGLO DE PRODUCTOS
  let tabla = [
    {
      nombre: "Aceite de Bergamota",
      descripcion: "Gotas de felicidad",
      tamaño: "15 ml",
      precio: "500",
    },
    {
      nombre: "Aceite de Eucalipto",
      descripcion: "Beneficios respiratorios",
      tamaño: "10 ml",
      precio: "320",
    },
    {
      nombre: "Aceite de Geranio",
      descripcion: "Mujer plena",
      tamaño: "25 ml",
      precio: "700",
    },
  ];

  // CREA EL ARREGLO PARA CARGAR PRODUCTOS RANDOM
  let tablacompleta = [
    {
      nombre: "Aceite de Bergamota",
      descripcion: "Gotas de felicidad",
      tamaño: "15 ml",
      precio: "500",
    },
    {
      nombre: "Aceite de Eucalipto",
      descripcion: "Beneficios respiratorios",
      tamaño: "10 ml",
      precio: "320",
    },
    {
      nombre: "Aceite de Geranio",
      descripcion: "Mujer plena",
      tamaño: "25 ml",
      precio: "700",
    },
    {
      nombre: "Aceite de Lavanda",
      descripcion: "Relajación",
      tamaño: "20 ml",
      precio: "700",
    },
    {
      nombre: "Aceite de Limón",
      descripcion: "Inspiración",
      tamaño: "15 ml",
      precio: "600",
    },
    {
      nombre: "Aceite de Manzanilla",
      descripcion: "Reconfortante Natural",
      tamaño: "15 ml",
      precio: "400",
    },
  ];

  function addEventsTabla() {
    nombreProducto = document.getElementById("nombre-tabla");
    descripcionProducto = document.getElementById("descripcion-tabla");
    tamañoProducto = document.getElementById("tamaño-tabla");
    precioProducto = document.getElementById("precio-tabla");
    table = document.getElementById("body-tabla");

    setInterval(resaltado, 80); // CAMBIA COLORES EN UN INTERVALO

    //LLAMADA A LA FUNCION PARA CARGAR LA TABLA
    cargarTabla();

    //VACIAR TABLA AL APRETAR EL BOTON 'VACIAR TABLA'
    document
      .getElementById("btn-vaciar-tabla")
      .addEventListener("click", function () {
        tabla = [];
        limpiarTabla();
      });

    //CARGA LA TABLA AL APRETAR EL BOTON 'AGREGAR PRODUCTO'
    document
      .getElementById("btn-agregar-tabla")
      .addEventListener("click", agregarProductoATabla);

    //AGRAGAR VARIOS PRODUCTOS AL APRETAR EL BOTON 'AGREGAR VARIOS'
    document
      .getElementById("btn-agregar-varios-tabla")
      .addEventListener("click", agregarVariosTabla);
  }

  function agregarProductoATabla(event) {
    event.preventDefault();
    let nuevoproducto = {
      nombre: "",
      descripcion: "",
      tamaño: "",
      precio: "",
    };

    nuevoproducto.nombre = nombreProducto.value;
    nuevoproducto.descripcion = descripcionProducto.value;
    nuevoproducto.tamaño = tamañoProducto.value;
    nuevoproducto.precio = precioProducto.value;

    tabla.push(nuevoproducto);
    cargarTabla();
    limpiarCamposFormulario();
  }

  function agregarVariosTabla() {
    let random = Math.round(Math.random() * 2 + 2);

    for (i = 0; i <= random; i++) {
      let randomnombre = Math.round(Math.random() * 5);
      let randomtamaño = Math.round(Math.random() * 5);
      let randomprecio = Math.round(Math.random() * 5);

      let nuevoproducto = {
        nombre: tablacompleta[randomnombre].nombre,
        descripcion: tablacompleta[randomnombre].descripcion,
        tamaño: tablacompleta[randomtamaño].tamaño,
        precio: tablacompleta[randomprecio].precio,
      };

      tabla.push(nuevoproducto);
    }
    cargarTabla();
  }

  // FUNCION PARA CARGAR LA TABLA EN EL HTML
  function cargarTabla() {
    limpiarTabla();

    for (i = 0; i < tabla.length; i++) {
      let tr = document.createElement("tr");
      let td1 = document.createElement("td");
      let td2 = document.createElement("td");
      let td3 = document.createElement("td");
      let td4 = document.createElement("td");
      let tdboton = document.createElement("td");
      let btn = document.createElement("button");

      td1.innerText = tabla[i].nombre;
      td2.innerText = tabla[i].descripcion;
      td3.innerText = tabla[i].tamaño;
      td4.innerText = "$ " + tabla[i].precio;

      tr.id = i;
      btn.id = i;
      btn.innerHTML = '<i class="fas fa-times"></i>';
      btn.classList.add("btn-tabla-borrar");
      tdboton.appendChild(btn);

      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      tr.appendChild(tdboton);

      //AGREGA RESALTADO A LAS OFERTAS
      if (tabla[i].precio <= 500) {
        tr.classList.add("intermitente");
        tr.classList.add(colores[colores.length - 1]);
      }

      table.appendChild(tr);
    }

    let botonestabla = document.querySelectorAll(".btn-tabla-borrar");
    for (let i = 0; i < botonestabla.length; i++) {
      botonestabla[i].addEventListener("click", function () {
        eliminarElem(botonestabla[i].id);
      });
    }
  }

  //FUNCION PARA 'VACIAR TABLA'
  function limpiarTabla() {
    table.innerHTML = "";

    // OCULTA EL * DE LA TABLA
    if (tabla.length == 0) {
      document.querySelector(".ofertas").classList.add("oculto");
    } else {
      document.querySelector(".ofertas").classList.remove("oculto");
    }
  }

  //FUNCION PARA LIMPIAR LOS INPUT DEL FORMULARIO DE PRODUCTOS
  function limpiarCamposFormulario() {
    nombreProducto.value = "";
    descripcion = descripcionProducto.value = "";
    tamañoProducto.value = "";
    precioProducto.value = "";
  }

  //FUNCION PARA BORRAR FILA DE LA TABLA
  function eliminarElem(idboton) {
    tabla.splice(idboton, 1);
    cargarTabla();
  }

  //FUNCION PARA RESALTAR LAS OFERTA
  function resaltado() {
    let intermitentes = document.getElementsByClassName("intermitente");
    let i = 0;
    for (i = 0; i < intermitentes.length; i++) {
      if (cantcolores == 0) {
        intermitentes[i].classList.add(colores[cantcolores]);
        intermitentes[i].classList.remove(colores[colores.length - 1]);
      } else {
        intermitentes[i].classList.add(colores[cantcolores]);
        intermitentes[i].classList.remove(colores[cantcolores - 1]);
      }
    }
    cantcolores = (cantcolores + 1) % colores.length;
  }
});
