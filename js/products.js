var productsArray = [];
var minCost = undefined;
var maxCost = undefined;

function showProductsList(array) {
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let product = array[i];
        
        if (((minCost == undefined) || (minCost != undefined && parseInt(product.cost) >= minCost)) &&
        ((maxCost == undefined) || (maxCost != undefined && parseInt(product.cost) <= maxCost))) {

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ product.name + `</h4>
                        <small class="text-muted">` + product.soldCount + ` artículos vendidos</small>
                    </div>
                    <p class="mb-1">` + product.description + `</p>
                </div>
            </div>
        </div>
        `
        }
        document.getElementById("listadecosos").innerHTML = htmlContentToAppend;
        }
    }
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;

            showProductsList(productsArray);
    };
});
    
    document.getElementById("filtroporprecio").addEventListener("click", function () {
        minCost = document.getElementById("rangodepreciominimo").value;
        maxCost = document.getElementById("rangodepreciomaximo").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0) {
            minCost = parseInt(minCost);
        }
        else {
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0) {
            maxCost = parseInt(maxCost);
        }
        else {
            maxCost = undefined;
        }
      showProductsList(productsArray);
    });
});

    document.getElementById("limpiarfiltroderango").addEventListener("click", function () {
    document.getElementById("rangodepreciominimo").value = "";
    document.getElementById("rangodepreciomaximo").value = "";

    minCost = undefined;
    maxCost = undefined;

    showProductsList();
    });
