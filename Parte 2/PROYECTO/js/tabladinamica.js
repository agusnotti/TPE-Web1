document.addEventListener("DOMContentLoaded", function () {



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

        let table = document.getElementById("body-tabla");

        for (i = 0; i < tabla.length; i++) {

            let tr = document.createElement("tr");
            let td1 = document.createElement("td");
            let td2 = document.createElement("td");
            let td3 = document.createElement("td");
            let td4 = document.createElement("td");


            td1.innerText = tabla[i].nombre;
            td2.innerText = tabla[i].descripcion;
            td3.innerText = tabla[i].tamaño;
            td4.innerText = tabla[i].precio;

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);

            table.appendChild(tr);
        }



    }



    function limpiarTabla() {
        let table = document.getElementById("body-tabla");
        table.innerHTML = "";
    }

    function vaciarTabla() {

        limpiarTabla();
        tabla = [];
    }

    cargarTabla();
    
    document.getElementById("btn-vaciar-tabla").addEventListener("click", vaciarTabla);
   
    document.getElementById("btn-agregar-tabla").addEventListener("click", function () {
        event.preventDefault();
        let nuevoproducto = {
            "nombre": "",
            "descripcion": "",
            "tamaño": "",
            "precio": ""
        }
        nuevoproducto.nombre = document.getElementById("nombre-tabla").value;
        nuevoproducto.descripcion = document.getElementById("descripcion-tabla").value;
        nuevoproducto.tamaño = document.getElementById("tamaño-tabla").value;
        nuevoproducto.precio = document.getElementById("precio-tabla").value;

        tabla.push(nuevoproducto);
        cargarTabla();


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