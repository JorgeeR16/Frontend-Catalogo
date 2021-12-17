let datos;
imprimir();

function imprimir(){


    let dat = localStorage.keys;
    datos = JSON.parse(dat);
    //console.log(datos);
    //$("#botonOn").html(datos.name);
    var uno = document.getElementById('botonOn');
    var dos = document.getElementById('exampleModalLabel1');
    uno.innerHTML = datos.name
    dos.innerHTML = datos.name

}


function FbotonOn() {
    
    if (uno.innerHTML == 'off') 
        uno.innerHTML = 'on';
    else uno.innerHTML = 'off'; 
  }

function Cerrarsesion(){
    localStorage.setItem("keys","");
    location.href = "index.html";

}