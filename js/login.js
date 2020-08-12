//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var usuariosArray = [];

function validarUsuario(array, userIn, passwordIn) {
   for (let i = 0; i < array.length; i++) {
       let usuario= array[i];
     if (usuario.email = userIn & usuario.password == passwordIn) {
         return true;
     }

   } 
}
document.addEventListener("DOMContentLoaded", function(e){
document.getElementById("submitBtn").addEventListener("click", function(e) {
    let inputEmail = document.getElementById("inputEmail");
    let inputPassword = document.getElementById("inputPassword");
    let camposCompletos = true;
    if (inputEmail.value === "") {
    camposCompletos = false;
}
    if (inputPassword.value === "") {
    camposCompletos = false;
}
   if(camposCompletos) {
       getJSONData(URL_USUARIO).then(function(resultObj) {
        if (resultObj.status === "ok") {
        usuariosArray =resultObj.data;
        if (validarUsuario(usuarioArray, inputEmail.value, inputPassword.value)) {
            window.location = "index.html"; }
            else {
                alert("Usuario o contraseña incorrectos.");
            }
        }   
});
   } else {
       alert("se deben ingresar los datos")
   }
});
});
