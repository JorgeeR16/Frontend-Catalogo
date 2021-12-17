const passIni = document.getElementById("passwordInicio");
const emailIni = document.getElementById("useremailInicio");
const formIni = document.getElementById("form-ini");
const parra = document.getElementById("warningInici");


formIni.addEventListener("submit", e => {
    e.preventDefault();
    let warnings = "";
    let entrar = false;
    parra.innerHTML = "";
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!regexEmail.test(emailIni.value)) {
        warnings += 'El email no es valido <br>'
        entrar = true;
    }

    if (passIni.value.length < 6) {
        warnings += 'La contraseña no es valida <br>'
        entrar = true;
    }

    if (entrar) {
        parra.innerHTML = warnings
    } else {
        iniciarSesion();
        
    }

})


function iniciarSesion() {
    console.log(emailIni.value + " " + passIni.value);
    $.ajax(
        {
            url: "http://129.151.100.202:8080/api/user/" + emailIni.value + "/" + passIni.value,
            type: "GET",
            datatype: "JSON",
            success: function (respuesta) {
                console.log(respuesta);
                if (respuesta.name == null ) {
                    alert("Por favor revise sus datos.")
                } else {
                   
                    localStorage.setItem("keys", JSON.stringify(respuesta));
                    location.href = "paginaP.html";
                    $("#passwordInicio").val("");
                    $("#useremailInicio").val("");
                    return respuesta;
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
                alert("No se pudo validar los datos");
            }
        }
    );
}





function mostrarPassword1() {
    var cambio = document.getElementById("passwordInicio");
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
