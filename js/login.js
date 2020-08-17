//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var usuariosArray = [];

function validarUsuario(array, userIn, passwordIn) {
    for (let i = 0; i < array.length; i++) {
        let usuario = array[i];
        if (usuario.email = userIn & usuario.password == passwordIn) {
            return true;
        }

    }
}
document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("submitBtn").addEventListener("click", function (e) {
        let inputEmail = document.getElementById("inputEmail");
        let inputPassword = document.getElementById("inputPassword");
        let camposCompletos = true;
        if (inputEmail.value === "") {
            camposCompletos = false;
        }
        if (inputPassword.value === "") {
            camposCompletos = false;
        }
        if (camposCompletos) {
            if (inputEmail.value, inputPassword.value) {
                window.location = "inicio.html";
            }
            else {
                alert("Usuario o contraseña incorrectos.");
            }
        } else {
            alert("Deben ingresarse los datos.")
        }
    });
});
