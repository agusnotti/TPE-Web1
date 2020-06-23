document.addEventListener("DOMContentLoaded", function () {
  /*--------------------------------------------  PARTIAL RENDER ------------------------------*/

  let container = document.querySelector("#use-ajax");

  let btnsNav = document.querySelectorAll("ul.nav-items > li > a");
  btnsNav.forEach((e) => e.addEventListener("click", renderPage));

  let btnsBreadcrumb, btnsCategorias, btnsProductos;
  
  addEvents();

  callAjax('html/home.html');  

  
  function callAjax(url){
    container.innerHTML = "<h1>Loading...</h1>";
    fetch(url)
      .then(function (response) {
        if (response.ok) {
          response.text().then(processText);
        } else container.innerHTML = "<h1>Error - Failed URL!</h1>";
      })
      .catch(function (response) {
        container.innerHTML = "<h1>Connection error</h1>";
      });
  } 
    
  function renderPage(event) {
    event.preventDefault();
    let url = this.getAttribute('href'); // this --> hace referencia al elemento al que le asigno el evento
    
    callAjax(url);
  }

  function processText(t) {
    document.querySelector("#use-ajax").innerHTML = t;
    addEvents();
  }
   
  function addEvents(){
    btnsBreadcrumb = document.querySelectorAll("ul.breadcrumb > li > a");
    btnsCategorias = document.querySelectorAll(".container-imagenes a");
    btnsProductos = document.querySelectorAll(".container-imagenes a");
    btnsBreadcrumb.forEach((e) => e.addEventListener("click", renderPage));
    btnsCategorias.forEach((e) => e.addEventListener("click", renderPage));
    btnsProductos.forEach((e) => e.addEventListener("click", renderPage));
  }
});
