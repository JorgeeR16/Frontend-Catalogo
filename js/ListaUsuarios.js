
traerMensajes();


function traerMensajes() {

    $.ajax(
        {
            url: "http://129.151.100.202:8080/api/user/all",
            type: "GET",
            datatype: "JSON",
            success: function (respuesta) {
                console.log(respuesta);
                pintarRespuesta4(respuesta);
            }
        }
    );
}

let var2 = {
    identification : document.getElementById("useridentification").value,
    name : document.getElementById("username").value,
    address : document.getElementById("useraddress").value,
    cellPhone : document.getElementById("usercellPhone").value,
    email : document.getElementById("useremail").value,
    password : document.getElementById("password").value,
    zone : document.getElementById("userzone").value.toUpperCase(),
    type : document.getElementById("usertype").value.toUpperCase(),
};

function pintarRespuesta4(respuesta) {

    let myTable = "<table  class='table' > <thead class='thead-dark'> <tr><th>Identificación</th><th>Nombre</th><th>Dirección</th><th>Telefono</th><th>Correo</th> <th>Contraseña</th><th>Zona</th><th>Tipo</th><th>Update</th><th>Delete</th></tr> </thead>";
    for (i = 0; i < respuesta.length; i++) {
        myTable += "<tr class='thead-light table-bordered'>";
        myTable += "<td>" + respuesta[i].identification + "</td>";
        myTable += "<td>" + respuesta[i].name + "</td>";
        myTable += "<td>" + respuesta[i].address + "</td>";
        myTable += "<td>" + respuesta[i].cellPhone + "</td>";
        myTable += "<td>" + respuesta[i].email + "</td>";
        myTable += "<td>" + respuesta[i].password + "</td>";
        myTable += "<td>" + respuesta[i].zone + "</td>";
        myTable += "<td>" + respuesta[i].type + "</td>";
       
    
     


        myTable += "<td> <button class='btn btn-outline-secondary' onclick=' actualizarUsuario(" +  respuesta[i].id  + ")'>Actualizar</button>";
        myTable += "<td> <button class='btn btn-outline-secondary' onclick='borrarUsuario(" +  respuesta[i].id  + ")'>Borrar</button>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#pintarUsuarios").html(myTable);
}


function borrarUsuario(idElemento) {

    let myData={
        id:idElemento
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax(
        {
            url: "http://129.151.100.202:8080/api/user/" + idElemento,
            type: "DELETE",
            data: dataToSend,
            contentType: "application/JSON",
            datatype: "JSON",

            success: function (respuesta) {
                $("#resultado").empty();
                traerMensajes();
                alert("Se ha Eliminado.")
            },
            error: function (jqXHR, textStatus, errorThrown) {
                traerMensajes();
                alert("No se guardo correctamente");
            }
        }
    );
}


function actualizarUsuario(idElemento){
    
    let myData = {
        id:idElemento,
        name : document.getElementById("username").value,
        address : document.getElementById("useraddress").value,
        cellPhone : document.getElementById("usercellPhone").value,
        email : document.getElementById("useremail").value,
        password : document.getElementById("password").value,
        zone : document.getElementById("userzone").value.toUpperCase(),
        type : document.getElementById("usertype").value.toUpperCase(),
    
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax(
            {
            url: "http://129.151.100.202:8080/api/user/update",
            type:"PUT",
            data:dataToSend,
            contentType:"application/JSON",
            datatype:"JSON",

            success:function(respuesta){

                traerMensajes();
                alert("se ha Actualizado correctamente la categoria")
            },
            error: function(jqXHR, textStatus, errorThrown) {
                traerMensajes();
                alert("No se guardo correctamente");
            }
        }
    );
}


function mostrarPassword() {
    var cambio = document.getElementById("password");
    if (cambio.type == "password") {
        cambio.type = "text";
        $('.icon').removeClass('fa fa-eye-slash').addClass('fa fa-eye');
    } else {
        cambio.type = "password";
        $('.icon').removeClass('fa fa-eye').addClass('fa fa-eye-slash');
    }
}
$(document).ready(function () {
    //CheckBox mostrar contraseña
    $('#ShowPassword').click(function () {
        $('#Password').attr('type', $(this).is(':checked') ? 'text' : 'password');
    });
});

function mostrarRepassword1() {
    var cambio1 = document.getElementById("passwordrepeat");
    if (cambio1.type == "password") {
        cambio1.type = "text";
        $('.icon').removeClass('fa fa-eye-slash').addClass('fa fa-eye');
    } else {
        cambio1.type = "password";
        $('.icon').removeClass('fa fa-eye').addClass('fa fa-eye-slash');
    }
}
$(document).ready(function () {
    //CheckBox mostrar contraseña
    $('#ShowPassword').click(function () {
        $('#Password').attr('type', $(this).is(':checked') ? 'text' : 'password');
    });
});