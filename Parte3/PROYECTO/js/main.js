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

    let pMensaje = document.createElement("p");

    pMensaje.innerHTML = mensajeCargando;
    container.appendChild(pMensaje);

    fetch(url)
      .then(function (response) {
        if (response.ok) {
          clearInterval(intervaloActualizar);
          clearInterval(intervaloFiltrar);
          clearInterval(intervaloResaltado);
          response.text().then(processText);
        } else {
          pMensaje.innerHTML = mensajeError;
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
      //si encuentra en la pagina este elemento....
      addEventsHome();
    }
    if (document.getElementById("nombre-tabla")) {
      //si encuentra en la pagina este elemento....
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
  let intervaloActualizar;
  let intervaloFiltrar;
  let intervaloResaltado;


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

  let baseURL = "https://web-unicen.herokuapp.com/api/groups/";
  let groupID = "044-Aceto-Notti";
  let collectionID = "productos";
  let nombreProducto;
  let descripcionProducto;
  let tamanioProducto;
  let precioProducto;
  let table;
  let inputFiltro;
  let cantidadProductos = 0;
  let cantcolores = 0;
  let colores = [
    "color-resaltado-1",
    "color-resaltado-2",
    "color-resaltado-3",
    "color-resaltado-4",
    "color-resaltado-5",
  ];

  //ARREGLO DE PRODUCTOS LOCAL
  let productosLocal = [];

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
  //ASIGNA EVENTOS DE LA TABLA
  function addEventsTabla() {

    // ASIGNACIONES DE VARIABLES
    formagregar = document.getElementById("js-form-agregar");
    formedit = document.getElementById("js-form-edit");
    nombreProducto = document.getElementById("nombre-tabla");
    descripcionProducto = document.getElementById("descripcion-tabla");
    tamanioProducto = document.getElementById("tamaño-tabla");
    precioProducto = document.getElementById("precio-tabla");
    editNombreProducto = document.getElementById("js-edit-nombre-tabla");
    editDescripcionProducto = document.getElementById("js-edit-descripcion-tabla");
    editTamanioProducto = document.getElementById("js-edit-tamaño-tabla");
    editPrecioProducto = document.getElementById("js-edit-precio-tabla");
    table = document.getElementById("body-tabla");

    inputFiltro = document.getElementById("js-input-filter") // CAMBIA COLORES EN UN INTERVALO

    //LLAMADA A LA FUNCION PARA OBTENER DATOS
    getDatos();

    //ASIGNA EVENTO A BOTON 'AGREGAR PRODUCTO'
    document.getElementById("btn-agregar-tabla").addEventListener("click", agregarProductoATabla);

    // VACIAR TABLA AL APRETAR EL BOTON 'VACIAR TABLA'
    document.getElementById("btn-vaciar-tabla").addEventListener("click", vaciarTabla);

    // //AGRAGAR VARIOS PRODUCTOS AL APRETAR EL BOTON 'AGREGAR VARIOS'
    document.getElementById("btn-agregar-varios-tabla").addEventListener("click", agregarVariosTabla);

    //INICIALIZACION DE INTERVALOS
    intervaloResaltado = setInterval(resaltado, 80);
    intervaloActualizar = setInterval(autoactualizar, 5000);
    intervaloFiltrar = setInterval(filtrar, 250);

  }
  //Hace un getDatos cada X segundos, donde X es el valor elegido en el setInterval

  function autoactualizar() {
    getDatos();
  }

  //-------------------------------------------------GET---------------------------------------------//
  // LLAMADA AJAX GET DATOS
  function getDatos() {
    fetch(baseURL + groupID + "/" + collectionID,
      {
        "method": "GET",
        "mode": "cors"
      })
      .then(function (r) {
        if (!r.ok) {
          console.log("ERROR!!");
        }
        productosLocal = [];
        return r.json();
      })
      .then(function (json) {
        for (let elem of json.productos) {
          if (elem.thing != null) {
            let prod = crearProductoLocal(elem._id, elem.thing.nombre, elem.thing.descripcion, elem.thing.tamanio, elem.thing.precio);
            productosLocal.push(prod);
          }
        }
        cargarTabla();
        cantidadProductos = json.productos.length;
        mostrarInformacionOfertas(cantidadProductos);
        filtrar();
      })
      .catch(function (e) {
        console.log(e);
      });
  }
    //-----------------------------------------------FIN GET--------------------------------------------//

  //--------------------------------------------------POST------------------------------------------------//

  // LLAMADA AJAX POST DATOS
  function postDatos(producto) {
    fetch(baseURL + groupID + "/" + collectionID,
      {
        "method": "POST",
        "mode": "cors",
        "headers": { "Content-Type": "application/json" },
        "body": JSON.stringify(producto),
      }
    )
      .then(function (r) {
        if (!r.ok) {
          console.log("ERROR!!");
        }
        return r.json();
      })
      .then(function (json) {
        let prod = crearProductoLocal(json.information._id, json.information.thing.nombre, json.information.thing.descripcion, json.information.thing.tamanio, json.information.thing.precio);
        productosLocal.push(prod);
        crearFilaTabla(prod.thing, prod.id);
        cantidadProductos++;
        mostrarInformacionOfertas(cantidadProductos);
        limpiarCamposFormulario();
      })
      .catch(function (e) {
        console.log(e);
      });
  }
  //-----------------------------------------------FIN POST------------------------------------------------//

  //-----------------------------------------------DELETE--------------------------------------------------//
  //LLAMADA AJAX DELETE
  function deleteDatos(id) {
    fetch(baseURL + groupID + "/" + collectionID + "/" + id, {
      method: "DELETE",
      "mode": "cors"
    })
      .then(function (r) {
        if (r.ok) {
          let fila = document.getElementById(id);
          fila.remove();
          let posicion = buscarId(id);
          productosLocal.splice(posicion, 1);
          cantidadProductos--;
          mostrarInformacionOfertas(cantidadProductos);
        }
      })
      .catch(function (e) {
        console.log(e);
      });
  }
  //----------------------------------------------FIN DELETE--------------------------------------------------//


  //-------------------------------------------METODOS AGREGAR-------------------------------------------------//
  //--------AGREGAR 1 ELEMENTO A LA TABLA--------//
  function agregarProductoATabla(event) {
    event.preventDefault();

    let nuevoproducto = crearProducto(nombreProducto.value, descripcionProducto.value, tamanioProducto.value, precioProducto.value);

    postDatos(nuevoproducto);
  }

  //------ AGREGA 3 ELEMENTOS A LA TABLA-----//
  function agregarVariosTabla() {
    let random = Math.round(Math.random() * 2 + 2);

    for (i = 0; i <= random; i++) {
      let randomnombre = Math.round(Math.random() * 5);
      let randomtamanio = Math.round(Math.random() * 5);
      let randomprecio = Math.round(Math.random() * 5);
      let nuevoproducto = crearProducto(tablacompleta[randomnombre].nombre, tablacompleta[randomnombre].descripcion, tablacompleta[randomtamanio].tamanio, tablacompleta[randomprecio].precio)

      postDatos(nuevoproducto);
    }
  }
   //-------------------------------------------FIN METODOS AGREGAR----------------------------------------------//


  //--------------------------------------------CREACION TABLA--------------------------------//

  // FUNCION PARA CREAR FILA LA TABLA DE TABLA
  function crearFilaTabla(producto, id) {
    let tr = document.createElement("tr");
    tr.id = id;
    cargarContenidoFilas(tr, producto);
    table.appendChild(tr);
  }
  // CREA LOS TDS Y TODO SU CONTENIDO DE CADA FILA
  function cargarContenidoFilas(tr, producto) {
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let tdboton = document.createElement("td");

    let btnBorrar = document.createElement("button");
    let btnEdit = document.createElement("button");
    addEventDelete(btnBorrar);
    addEventsEdit(btnEdit);
    td1.innerText = producto.nombre;
    td2.innerText = producto.descripcion;
    td3.innerText = producto.tamanio;
    td4.innerText = "$ " + producto.precio;

    btnEdit.innerHTML = '<i class="fas fa-edit"></i>';
    btnBorrar.innerHTML = '<i class="far fa-trash-alt"></i>';
    btnBorrar.classList.add("btn-tabla-borrar");
    btnEdit.classList.add("btn-tabla-editar");
    tdboton.appendChild(btnEdit);
    tdboton.appendChild(btnBorrar);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(tdboton);

    aplicarResaltadoOferta(tr, producto);
  }


  //ASIGNA EVENTO BOTON BORRAR FILA
  function addEventDelete(btn) {
    btn.addEventListener("click", function (event) {
      let id = this.parentNode.parentNode.id;
      deleteDatos(id);
    });
  }


  //ASIGNA EVENTO BOTON EDITAR FILA
  function addEventsEdit(btn) {
    btn.addEventListener("click", function (event) {
      let id = this.parentNode.parentNode.id;

      permitirEditar(id);
    })
  }
  //------------------------------------------FIN CREACION TABLA--------------------------------//

  //-----------------------------------------DIBUJAR Y VACIAR TABLA-----------------------------------------//
  // CARGA LA TABLA DESDE EL ARREGLO LOCAL
  function cargarTabla() {
    table.innerHTML = "";
    for (let elem of productosLocal) {
      crearFilaTabla(elem.thing, elem.id);
    }
  }

  //VACIA LA TABLA,API, y ARREGLO LOCAL 
  function vaciarTabla() {
    for (let i = 0; i < productosLocal.length; i++) {
      deleteDatos(productosLocal[i].id);
    }
  }
//-------------------------------------------FIN DIBUJAR Y VACIAR TABLA--------------------------------------//


//---------------------------------------------------EDITADO DE FILAS-------------------------------------------//

  // BUSCA EL ID QUE SE DESEA EDITAR Y SI EXISTE LE PERMITE AL USUARIO EDITAR EN EL FORMULARIO
  function permitirEditar(id) {
    let posicion = buscarId(id);
    if (posicion != -1) {
      nombreProducto.value = productosLocal[posicion].thing.nombre;
      descripcionProducto.value = productosLocal[posicion].thing.descripcion;
      tamanioProducto.value = productosLocal[posicion].thing.tamanio;
      precioProducto.value = productosLocal[posicion].thing.precio;
    }

    let formProducto = document.querySelector('.formulario-agregar-producto');

    modificarFormParaEditar();

    if (!estanCreados(formProducto)) {
      crearBotonesEdicion(formProducto, id);
    } else {
      formProducto.lastChild.remove();
      formProducto.lastChild.remove();
      crearBotonesEdicion(formProducto, id);
    }

    document.querySelectorAll('.btn-tabla-borrar').forEach(elem => { elem.disabled = true });
  }
  //MODIFICA EL FORMULARIO PARA EDITAR
  function modificarFormParaEditar() {
    document.getElementById("btn-agregar-tabla").classList.add("oculto");
    document.getElementById("btn-agregar-varios-tabla").classList.add("oculto");
    document.getElementById("js-titulo-formulario").innerHTML = "Editar Producto";
    document.getElementById("btn-vaciar-tabla").classList.add("oculto");
  }
  //MODIFICA EL FORMULARIO PARA AGREGAR
  function modificarFormParaAgregar() {
    document.getElementById("btn-agregar-tabla").classList.remove("oculto");
    document.getElementById("btn-agregar-varios-tabla").classList.remove("oculto");
    document.getElementById("js-titulo-formulario").innerHTML = "Agregar Productos";
    document.getElementById("btn-vaciar-tabla").classList.remove("oculto");
  }

  // CREA LOS BOTONES DE CONFIRMAR EDICION Y CANCELAR EDICION Y LOS AGREGA DENTRO DEL FORM
  function crearBotonesEdicion(formProducto, id) {
    event.preventDefault();
    let btnConfEdicion = document.createElement("button");
    let btnCancelEdicion = document.createElement("button");
    btnConfEdicion.innerText = "Confirmar Edición";
    btnConfEdicion.classList.add("btn-form-productos");
    btnCancelEdicion.innerText = "Cancelar Edicion";
    btnCancelEdicion.classList.add("btn-form-productos");

    formProducto.appendChild(btnConfEdicion);
    formProducto.appendChild(btnCancelEdicion);

    addEventConf(btnCancelEdicion, btnConfEdicion, id);
    addEventCancel(btnCancelEdicion, btnConfEdicion);
  }
  // COMPRUEBA QUE LOS BOTONES DE CONFIRMAR EDICION Y CANCELAR EDICION ESTEN CREADOS
  function estanCreados(formProducto) {
    let cantidad = formProducto.querySelectorAll(".btn-form-productos");
    if (cantidad.length == 1) {
      return false;
    } else {
      return true;
    }
  }
  // BUSCA EN LA TABLA EL TR CON EL ID DESEADO Y EDITA SU CONTENIDO
  function editarEnTabla(producto, id) {
    let trs = table.querySelectorAll("tr");
    for (let i = 0; i <= trs.length - 1; i++) {
      if (trs[i].id == id) {
        let tds = trs[i].querySelectorAll("td");
        for (let elem of tds) {
          elem.remove();
        }
        cargarContenidoFilas(trs[i], producto.thing);
      }
    }
  }


  //-------PUT(Dentro del eventlistener)--------//   
  // AGREGA EVENTO AL BOTON CONFIRMAR EL CUAL PERMITE EDITAR UN DATO DE LA API Y REFLEJARLO EN LA TABLA DE LA WEB
  function addEventConf(btncancel, btnconf, id) {
    btnconf.addEventListener("click", function () {
      event.preventDefault();

      let nuevoproducto = crearProducto(nombreProducto.value, descripcionProducto.value, tamanioProducto.value, precioProducto.value);

      fetch(baseURL + groupID + "/" + collectionID + "/" + id, {
        "method": "PUT",
        "mode": "cors",
        "headers": { "Content-Type": "application/json" },
        "body": JSON.stringify(nuevoproducto)
      })
        .then(response => {
          if (!response.ok) {
            console.log("ERROR- No se pudo editar el dato");
          } else if (response.ok) {
            editarEnTabla(nuevoproducto, id);
            editarEnJsonLocal(nuevoproducto, id);
          }
          btnconf.remove();
          btncancel.remove();
          modificarFormParaAgregar();
          limpiarCamposFormulario();
          document.querySelectorAll('.btn-tabla-borrar').forEach(elem => { elem.disabled = false });


        })
        .catch(e => {
          console.log(e);
        })
    })
  }

  //AGREGA EVENTO AL BOTON CANCELAR EDICION
  function addEventCancel(btncancel, btnconf) {
    btncancel.addEventListener("click", function () {
      event.preventDefault();
      btnconf.remove();
      btncancel.remove();
      modificarFormParaAgregar();
      limpiarCamposFormulario();
      document.querySelectorAll('.btn-tabla-borrar').forEach(elem => { elem.disabled = false });
    })
  }

  // MODIFICA EL ARREGLO LOCAL CON EL NUEVO CONTENIDO EDITADO
  function editarEnJsonLocal(nuevoproducto, id) {
    let posicion = buscarId(id);

    if (posicion != -1) {

      let prod = crearProductoLocal(id, nuevoproducto.thing.nombre, nuevoproducto.thing.descripcion, nuevoproducto.thing.tamanio, nuevoproducto.thing.precio);
      productosLocal[posicion] = prod;
    }

  }
  // BUSCA UN ID EN EL ARREGLO DE PRODUCTOS LOCAL
  function buscarId(id) {
    let i = 0;
    while (i < productosLocal.length) {
      if (productosLocal[i].id === id) {
        return i;
      } else {
        i++;
        if (i == productosLocal.length) {
          return -1;
        }
      }
    }
  }

  //--------------------------------------------------FIN EDITADO DE FILAS-------------------------------------//

  //------------------------------------------------CREADORAS DE OBJETOS JSON----------------------------------//
  // DEVUELVE UNA VARIABLE CARGADA LISTA PARA AGREGAR AL ARREGLO LOCAL
  function crearProductoLocal(id, nombre, descripcion, tamanio, precio) {
    let objetoJsonLocal = {
      "id": "",
      "thing": {
        "nombre": "",
        "descripcion": "",
        "tamanio": "",
        "precio": ""
      }
    }
    objetoJsonLocal.id = id;
    objetoJsonLocal.thing.nombre = nombre;
    objetoJsonLocal.thing.descripcion = descripcion;
    objetoJsonLocal.thing.tamanio = tamanio;
    objetoJsonLocal.thing.precio = precio;

    return objetoJsonLocal;
  }

  // DEVUELVE UNA VARIABLE CARGADA LISTA PARA AGREGAR A LA API
  function crearProducto(nombre, descripcion, tamanio, precio) {
    let producto = {
      "thing": {
        "nombre": "",
        "descripcion": "",
        "tamanio": "",
        "precio": "",
      },
    };

    producto.thing.nombre = nombre;
    producto.thing.descripcion = descripcion;
    producto.thing.tamanio = tamanio;
    producto.thing.precio = precio;

    return producto;
  }
  //--------------------------------------------FIN CREADORAS DE OBJETOS JSON-----------------------------------//


  //-----------------------------------------------------DETALLES----------------------------------------------//
  //FUNCION PARA LIMPIAR LOS INPUTS DEL FORMULARIO DE PRODUCTOS
  function limpiarCamposFormulario() {
    nombreProducto.value = "";
    descripcion = descripcionProducto.value = "";
    tamanioProducto.value = "";
    precioProducto.value = "";
  }

  // PARRAFO INFORMACION OFERTAS
  function mostrarInformacionOfertas(cantidadProductos) {
    if (cantidadProductos == 0) {
      document.querySelector(".ofertas").classList.add("oculto");
    } else {
      document.querySelector(".ofertas").classList.remove("oculto");
    }
  }

  //AGREGA RESALTADO A LAS OFERTAS
  function aplicarResaltadoOferta(tr, producto) {
    if (producto.precio <= 500) {
      tr.classList.add("intermitente");
      tr.classList.add(colores[colores.length - 1]);
    }
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

  //-----------------------------------------------------FIN DETALLES--------------------------------------------//

  //-----------------------------------------------------FILTRADO----------------------------------------------//
  function filtrar() {
    if (inputFiltro.value != "") {
      ocultarTabla();
      comprobarColumnas();
    } else {
      cancelarFiltros();
    }
  }

  function comprobarColumnas() {
    let existeProducto = false;

    for (let elem of productosLocal) {
      let inputminuscula = inputFiltro.value.toLowerCase();
      let nombreminuscula = elem.thing.nombre.toLowerCase();
      let descripcionminuscula = elem.thing.descripcion.toLowerCase();
      let tamaniominuscula = elem.thing.tamanio.toLowerCase();

      if ((nombreminuscula.includes(inputminuscula)) ||
        (descripcionminuscula.includes(inputminuscula)) ||
        (tamaniominuscula.includes(inputminuscula)) ||
        (elem.thing.precio == inputFiltro.value)) {
        document.getElementById(elem.id).classList.remove("oculto");
        existeProducto = true;
        document.querySelector(".ofertas").classList.remove("oculto");
      }
    }

    if (!existeProducto) {
      document.querySelector(".ofertas").classList.add("oculto");
    }
  }

  function ocultarTabla() {
    let trs = table.querySelectorAll("tr");
    for (let elem of trs) {
      elem.classList.add("oculto");
    }
  }

  function cancelarFiltros() {
    let trs = table.querySelectorAll("tr");
    for (let elem of trs) {
      elem.classList.remove("oculto");
    }
  }

  //-------------------------------------------------------FIN FILTRADO---------------------------------------//
});
