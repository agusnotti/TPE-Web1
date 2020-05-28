document.addEventListener("DOMContentLoaded", function () {
    
    let nombreProducto = document.getElementById("nombre-tabla");
    let descripcionProducto = document.getElementById("descripcion-tabla");
    let tamañoProducto = document.getElementById("tamaño-tabla");
    let precioProducto = document.getElementById("precio-tabla");
    let table = document.getElementById("body-tabla");

    let tabla = [
        {
            "nombre": "Aceite de Bergamota",
            "descripcion": "Gotas de felicidad",
            "tamaño": "15 ml",
            "precio": "$500"
        },
        {
            "nombre": "Aceite de Eucalipto",
            "descripcion": "Beneficios respiratorios",
            "tamaño": "10 ml",
            "precio": "$320"
        },
        {
            "nombre": "Aceite de Geranio",
            "descripcion": "Mujer plena",
            "tamaño": "25 ml",
            "precio": "$700"
        }
    ]

    let tablacompleta = [
        {
            "nombre": "Aceite de Bergamota",
            "descripcion": "Gotas de felicidad",
            "tamaño": "15 ml",
            "precio": "$500"
        },
        {
            "nombre": "Aceite de Eucalipto",
            "descripcion": "Beneficios respiratorios",
            "tamaño": "10 ml",
            "precio": "$320"
        },
        {
            "nombre": "Aceite de Geranio",
            "descripcion": "Mujer plena",
            "tamaño": "25 ml",
            "precio": "$700"
        },
        {
            "nombre": "Aceite de Lavanda",
            "descripcion": "Relajación",
            "tamaño": "20 ml",
            "precio": "$700"
        },
        {
            "nombre": "Aceite de Limón",
            "descripcion": "Inspiración",
            "tamaño": "15 ml",
            "precio": "$600"
        },
        {
            "nombre": "Aceite de Manzanilla",
            "descripcion": "Reconfortante Natural",
            "tamaño": "15 ml",
            "precio": "$400"
        }
    ];

    function cargarTabla() {
        limpiarTabla();

        for (i = 0; i < tabla.length; i++) {

            let tr = document.createElement("tr");
            let td1 = document.createElement("td");
            let td2 = document.createElement("td");
            let td3 = document.createElement("td");
            let td4 = document.createElement("td");
            let tdboton= document.createElement("td");
            let btn = document.createElement("button");


            td1.innerText = tabla[i].nombre;
            td2.innerText = tabla[i].descripcion;
            td3.innerText = tabla[i].tamaño;
            td4.innerText = tabla[i].precio;

            tr.id= i;
            btn.id= i;
            btn.innerText="Borrar";
            btn.classList.add("btn-tabla-borrar");
            tdboton.appendChild(btn);

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(tdboton);
            

            table.appendChild(tr);
        }

        let botonestabla = document.querySelectorAll(".btn-tabla-borrar");
        for(let i = 0; i< botonestabla.length; i++){
            botonestabla[i].addEventListener("click", function(){
            eliminarElem(botonestabla[i].id);
          });
        }
    }


    function limpiarTabla() {
        table.innerHTML = "";
    }

    function limpiarCamposFormulario() {
        nombreProducto.value = "";
        descripcion = descripcionProducto.value = "";
        tamañoProducto.value = "";
        precioProducto.value = "";
    }
    
    cargarTabla();
   
    function eliminarElem(idboton){
        tabla.splice(idboton, 1);
        cargarTabla();
      }

    
    document.getElementById("btn-vaciar-tabla").addEventListener("click", function(){
        limpiarTabla();
        tabla = [];
    });
   
    document.getElementById("btn-agregar-tabla").addEventListener("click", function () {
        event.preventDefault();
        let nuevoproducto = {
            "nombre": "",
            "descripcion": "",
            "tamaño": "",
            "precio": ""
        }

        nuevoproducto.nombre = nombreProducto.value;
        nuevoproducto.descripcion = descripcionProducto.value;
        nuevoproducto.tamaño = tamañoProducto.value;
        nuevoproducto.precio = precioProducto.value;

        tabla.push(nuevoproducto);
        cargarTabla();
        limpiarCamposFormulario()

    });

    document.getElementById("btn-agregar-varios-tabla").addEventListener("click", function () {

        let random = Math.round(Math.random() * 2 + 2);

        for (i = 0; i <= random; i++) {

            let randomnombre = Math.round(Math.random() * 5);
            let randomtamaño = Math.round(Math.random() * 5);
            let randomprecio = Math.round(Math.random() * 5);

            let nuevoproducto = {
                "nombre": tablacompleta[randomnombre].nombre,
                "descripcion": tablacompleta[randomnombre].descripcion,
                "tamaño": tablacompleta[randomtamaño].tamaño,
                "precio": tablacompleta[randomprecio].precio
            }

            tabla.push(nuevoproducto);
        }
        cargarTabla();
    });
});