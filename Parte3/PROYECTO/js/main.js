document.addEventListener("DOMContentLoaded", function () {
  /*--------------------------------------------  PARTIAL RENDER ------------------------------*/
  let coleccion = "productos";
  let grupo = "044-Aceto-Notti";
  let urlgrupo = "https://web-unicen.herokuapp.com/api/groups/" + grupo + "/" + coleccion;
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

  // CREA EL ARREGLO PARA CARGAR PRODUCTOS RANDOM
  let tablacompleta = [
    {
      nombre: "Aceite de Bergamota",
      descripcion: "Gotas de felicidad",
      tamanio: "15 ml",
      precio: "500",
    },
    {
      nombre: "Aceite de Eucalipto",
      descripcion: "Beneficios respiratorios",
      tamanio: "10 ml",
      precio: "320",
    },
    {
      nombre: "Aceite de Geranio",
      descripcion: "Mujer plena",
      tamanio: "25 ml",
      precio: "700",
    },
    {
      nombre: "Aceite de Lavanda",
      descripcion: "Relajación",
      tamanio: "20 ml",
      precio: "700",
    },
    {
      nombre: "Aceite de Limón",
      descripcion: "Inspiración",
      tamanio: "15 ml",
      precio: "600",
    },
    {
      nombre: "Aceite de Manzanilla",
      descripcion: "Reconfortante Natural",
      tamanio: "15 ml",
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
        fetch(urlgrupo, {
          "method": "GET",
          "mode": "cors",
        }).then(response => {
          if (response.ok) {
            console.log("Json Obtenido");
          } else {
            console.log("ERROR");
          }
          return response.json();
        })
          .then(json => {
            for (let i = 0; i < json.productos.length; i++) {
              fetch(urlgrupo + "/" + json.productos[i]._id, {
                "method": "DELETE",
                "mode": "cors",
              }).then(response => {
                if (!response.ok) {
                  console.log("ERROR");
                }
                limpiarTabla();
              })
                .catch(e => {
                  console.log(e);
                })
            }
          })
          .catch(e => {
            console.log(e);
          })
          
      });

    //CARGA LA TABLA AL APRETAR EL BOTON 'AGREGAR PRODUCTO'
    document
      .getElementById("btn-agregar-tabla")
      .addEventListener("click", postJson);

    //AGRAGAR VARIOS PRODUCTOS AL APRETAR EL BOTON 'AGREGAR VARIOS'
    document
      .getElementById("btn-agregar-varios-tabla")
      .addEventListener("click", agregarVariosTabla);
  }


  function deleteJson(id) {
    fetch(urlgrupo + "/" + id, {
      "method": "DELETE",
      "mode": "cors",
    }).then(response => {
      if (response.ok) {
        console.log("Eliminado");
        cargarTabla();
      } else {
        console.log("ERROR");
      }
    })
      .catch(e => {
        console.log(e);
      })

  }

  function cargarTabla(event) {
    fetch(urlgrupo, {
      "method": "GET",
      "mode": "cors",
    }).then(response => {
      if (!response.ok) {
        console.log("ERROR- Falló al obtener el Json");
      }
      return response.json();
    })
      .then(json => {
        limpiarTabla();
        procesarJsonaTabla(json);
      }).catch(e => {
        console.log(e);
      })


  }




  function postJson(event) {
    event.preventDefault();
    let nuevoproducto = {
      "thing": {
        nombre: "",
        descripcion: "",
        tamanio: "",
        precio: "",
      }
    };
    nuevoproducto.thing.nombre = nombreProducto.value;
    nuevoproducto.thing.descripcion = descripcionProducto.value;
    nuevoproducto.thing.tamanio = tamañoProducto.value;
    nuevoproducto.thing.precio = precioProducto.value;

    fetch(urlgrupo, {
      "method": "POST",
      "mode": "cors",
      "headers": { "Content-Type": "application/json" },
      "body": JSON.stringify(nuevoproducto)
    }).then(response => {
      if (!response.ok) {
        console.log("ERROR- No se pudo agregar el dato");
      }
      limpiarCamposFormulario();
      return response.json();

    })
      .then(json => {
        cargarTabla();
      })
      .catch(e => {
        console.log(e);
      })

  }

  function agregarVariosTabla() {
    let random = Math.round(Math.random() * 2 + 2);

    for (i = 0; i <= random; i++) {
      let randomnombre = Math.round(Math.random() * 5);
      let randomtamanio = Math.round(Math.random() * 5);
      let randomprecio = Math.round(Math.random() * 5);

      let nuevoproducto = {
        "thing":
        {
          nombre: tablacompleta[randomnombre].nombre,
          descripcion: tablacompleta[randomnombre].descripcion,
          tamanio: tablacompleta[randomtamanio].tamanio,
          precio: tablacompleta[randomprecio].precio,
        }
      };

      fetch(urlgrupo, {
        "method": "POST",
        "mode": "cors",
        "headers": { "Content-Type": "application/json" },
        "body": JSON.stringify(nuevoproducto)
      }).then(response => {
        if (!response.ok) {
          console.log("ERROR- No se pudo agregar el dato");
        }
        return response.json();

      }).then(cargarTabla())


        .catch(e => {
          console.log(e);
        })
    }
    
  }

  function procesarJsonaTabla(json){
    for (let i = 0; i < json.productos.length; i++) {
      let tr = document.createElement("tr");
      let td1 = document.createElement("td");
      let td2 = document.createElement("td");
      let td3 = document.createElement("td");
      let td4 = document.createElement("td");
      let tdboton = document.createElement("td");
      let btn = document.createElement("button");

      td1.innerText = json.productos[i].thing.nombre;
      td2.innerText = json.productos[i].thing.descripcion;
      td3.innerText = json.productos[i].thing.tamanio;
      td4.innerText = "$ " + json.productos[i].thing.precio;

      tr.id = json.productos[i]._id;
      btn.innerHTML = '<i class="fas fa-times"></i>';
      btn.classList.add("btn-tabla-borrar");
      btn.addEventListener("click", function () {
        eliminarElem(tr.id);
      });
      tdboton.appendChild(btn);

      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      tr.appendChild(tdboton);

      //AGREGA RESALTADO A LAS OFERTAS
      if (json.productos[i].thing.precio <= 500) {
        tr.classList.add("intermitente");
        tr.classList.add(colores[colores.length - 1]);
      }

      table.appendChild(tr);
    }
  }

  //FUNCION PARA 'VACIAR TABLA'
  function limpiarTabla() {

    fetch(urlgrupo,{
      "method":"GET",
      "mode":"cors",
    }).then(response =>{
        return response.json();
    }).then (json => {
        if (json.productos.length==0){
          document.querySelector(".ofertas").classList.add("oculto");
        } else {
          document.querySelector(".ofertas").classList.remove("oculto");
        }
    })
    table.innerHTML = "";
  }

  //FUNCION PARA LIMPIAR LOS INPUT DEL FORMULARIO DE PRODUCTOS
  function limpiarCamposFormulario() {
    nombreProducto.value = "";
    descripcionProducto.value ="";
    tamañoProducto.value = "";
    precioProducto.value = "";
  }

  //FUNCION PARA BORRAR FILA DE LA TABLA
  function eliminarElem(id) {
    deleteJson(id);
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
