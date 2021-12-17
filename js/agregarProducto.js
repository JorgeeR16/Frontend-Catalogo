const formIni = document.getElementById("form-producAgregar");
const parrafo = document.getElementById("warningProduct");
const reference = document.getElementById("productreference");
const brand = document.getElementById("productbrand");
const category = document.getElementById("productcategory");
const material = document.getElementById("productmaterial");
const dimencion = document.getElementById("productdimencion");
const description = document.getElementById("productdescription");
const availability = document.getElementById("productavailability");
const price = document.getElementById("productprice");
const quantity = document.getElementById("productquantity");
const photography = document.getElementById("productphotography");




formIni.addEventListener("submit", e => {
    e.preventDefault();
    let warnings = "";
    let entrar = false;
    parrafo.innerHTML = "";

    if (reference.value.length < 1) {
        warnings = 'Valide la referencia <br>'
        entrar = true;
    }
    if (brand.value.length < 1) {
        warnings = 'Valide la marca <br>'
        entrar = true;
    }
    if (category.value.length < 1) {
        warnings = 'La categoria no es valida <br>'
        entrar = true;
    }
    if (material.value.length < 1) {
        warnings = 'El material no es valido <br>'
        entrar = true;
    }
    if (dimencion.value.length < 1) {
        warnings = 'La dimension no es valida <br>'
        entrar = true;
    }
    if (description.value.length < 1) {
        warnings = 'ELa descripccón no es valida <br>'
        entrar = true;
    }
    if (availability.value.length < 1) {
        warnings = 'La disponibilidad no es valida <br>'
        entrar = true;
    }
    if (quantity.value.length < 1) {
        warnings = 'La cantidad no es valida <br>'
        entrar = true;
    }
    if (photography.value.length < 1) {
        warnings = 'La photografia no es valida <br>'
        entrar = true;
    }

    if (entrar) {
        parrafo.innerHTML = warnings
    } else {
        craerProducto();
    }
})

function craerProducto() {

    let var2 = {
        reference: document.getElementById("productreference").value,
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

    console.log(var2);
    $.ajax(
        {
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var2),
            url: "http://129.151.100.202:8080/api/cookware/new",
            success: function (response) {
                alert("Se guardo correctamente");
                console.log("El producto se guardo correctamente");
                location.href = "paginaP.html";

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
                alert("No se guardo correctamente");
            }
        }
    );

}