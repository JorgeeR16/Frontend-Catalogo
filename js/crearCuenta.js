const identi = document.getElementById("useridentification");
const nombre = document.getElementById("username");
const addre = document.getElementById("useraddress");
const cell = document.getElementById("usercellPhone");
const email = document.getElementById("useremail");
const zone = document.getElementById("userzone");
const pass = document.getElementById("password");
const tipo = document.getElementById("usertype");
const repass = document.getElementById("passwordrepeat");
const form = document.getElementById("form");
const parrafo = document.getElementById("warning");

form.addEventListener("submit", e => {
    e.preventDefault();
    let warnings = "";
    let entrar = false;
    parrafo.innerHTML = "";
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (identi.value.length < 1) {
        warnings = 'Ingrese un valor en la identificación <br>'
        entrar = true;
    }
    if (nombre.value.length < 6) {
        warnings = 'El nombre no es valido <br>'
        entrar = true;
    }
    if (addre.value.length < 1) {
        warnings = 'La direccion no es valida <br>'
        entrar = true;
    }
    if (cell.value.length < 1) {
        warnings = 'El telefono no es valido <br>'
        entrar = true;
    }
    if (zone.value.length < 1) {
        warnings = 'La zona no es valida <br>'
        entrar = true;
    }
    if (tipo.value.length < 1) {
        warnings = 'El tipo no es valido <br>'
        entrar = true;
    }
    if (!regexEmail.test(email.value)) {
        warnings += 'El email no es valido <br>'
        entrar = true;
    }
    if (pass.value == repass.value && pass.value.length > 1) {
        if (pass.value.length < 5) {
            warnings += 'La contraseña no es valida <br>'
            entrar = true;
        }
    } else {
        warnings += 'La contraseña no es igual <br>'
        entrar = true;
    }

    if (entrar) {
        parrafo.innerHTML = warnings
    } else {
        validarCorreo();
    }
})

function validarCorreo() {
    let eml = $("#useremail").val();
    $.ajax(
        {
            url: "http://129.151.100.202:8080/api/user/emailexist/" + eml,
            type: "GET",
            datatype: "JSON",
            success: function (respuesta) {
                if (respuesta) {
                    console.log("El correo ya existe.. ");
                    alert("El correo ya existe.. ");
                    return respuesta;
                } else {
                    console.log("Voy a agregar el usuario")
                    crearUsuario()
                    
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
                alert("No se pudo validar los datos");
            }
        }
    );
}



function crearUsuario() {
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
    console.log(var2);
    $.ajax(
        {
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var2),
            url: "http://129.151.100.202:8080/api/user/new",
            success: function (response) {
                alert("Se guardo correctamente");
                console.log("Se guardo correctamente");
                location.href = "paginaP.html";
                localStorage.setItem("keys", JSON.stringify(response));
                $("#username").val("");
                $("#useremail").val("");
                $("#password").val("");
                $("#passwordrepeat").val("")
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
                alert("No se guardo correctamente");
            }
        }
    );
}




//event.preventDefault();

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

function mostrarRepassword() {
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