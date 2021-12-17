
traerMensajes();


function traerMensajes() {

    $.ajax(
        {
            url: "http://129.151.100.202:8080/api/cookware/all",
            type: "GET",
            datatype: "JSON",
            success: function (respuesta) {
                console.log(respuesta);
                pintarRespuesta4(respuesta);
            }
        }
    );
}

function pintarRespuesta4(respuesta) {

    let myTable = "<table  class='table' > <thead class='thead-dark'> <tr><th>Referencias</th><th>Marcas</th><th>Categorias</th><th>Materiales</th> <th>Dimensiones</th><th>Description</th>    <th>Disponibilidad</th>    <th>Precios</th> <th>Cantidad</th>   <th>Fotografia</th>              <th>Update</th><th>Delete</th></tr> </thead>";
    for (i = 0; i < respuesta.length; i++) {
        myTable += "<tr class='thead-light table-bordered'>";
        myTable += "<td>" + respuesta[i].reference + "</td>";
        myTable += "<td>" + respuesta[i].brand + "</td>";
        myTable += "<td>" + respuesta[i].category + "</td>";
        myTable += "<td>" + respuesta[i].materiales + "</td>";
        myTable += "<td>" + respuesta[i].dimensiones + "</td>";
        myTable += "<td>" + respuesta[i].description + "</td>";
        myTable += "<td>" + respuesta[i].availability + "</td>";
        myTable += "<td>" + respuesta[i].price + "</td>";
        myTable += "<td>" + respuesta[i].quantity + "</td>";
        myTable += "<td>" + respuesta[i].photography + "</td>";
    
        let numero = respuesta[i].reference.slice(3,7);


        myTable += "<td> <button class='btn btn-outline-secondary' onclick=' actualizarMensajes(" + numero + ")'>Actualizar</button>";
        myTable += "<td> <button class='btn btn-outline-secondary' onclick='borrarProducto(" + numero + ")'>Borrar</button>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#pintarProductos").html(myTable);
}


function borrarProducto(idElemento) {
    let dato = "AP-"+idElemento
    let myData={
        reference:"AP-"+idElemento
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax(
        {
            url: "http://129.151.100.202:8080/api/cookware/" + dato,
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


function actualizarMensajes(idElemento){
    
    let myData = {
        reference:"AP-"+idElemento,
        brand: document.getElementById("productbrand").value,
        category: document.getElementById("productcategory").value,
        materiales: document.getElementById("productmaterial").value,
        dimensiones: document.getElementById("productdimencion").value,
        description: document.getElementById("productdescription").value,
        availability: document.getElementById("productavailability").value,
        price: document.getElementById("productprice").value,
        quantity: document.getElementById("productquantity").value,
        photography: document.getElementById("productphotography").value,
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax(
            {
            url: "http://129.151.100.202:8080/api/cookware/update",
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
