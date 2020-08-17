//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var productsArray = [];

function showProductsList(array){

    let htmlContentToAppend = "";
for (let i = 0; i < array.length; i++) {
    let product = array[i];

    htmlContentToAppend += `
    <div class="list-group-item-action">
    <div class="row">
    <div class="col-3"
    <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
    </div>
    <dic class="col">
    <div class="d-flex w-100 justify-content-between">
    <div class="mb-1">
    <h4>` + product.name + `</h4>
    <p>` + product.description + `</p>
    <p>` + product.cost + `</p>
    <p>` + product.currency + `</p>
    </div>
    <small class="text-muted">` + product.soldCount + `articulos</small>
    </div>

    </div>
    </div>
    </div>
    `

    document.getElementById("mod-1").innerHTML = htmlContentToAppend;
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;
            
            showProductsList(productsArray);
        }
    });
})};