var productsArray = [];

function showProductsList(array) {

    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let product = array[i];

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ product.name +`</h4>
                        <small class="text-muted">` + product.soldCount + ` artículos vendidos</small>
                    </div>
                    <p class="mb-1">` + product.description + `</p>
                </div>
            </div>
        </div>
        `
    document.getElementById("listadecosos").innerHTML = htmlContentToAppend;
}  
}
   /*   htmlContentToAppend += `
    <div class="list-group-item-action">
    <div class="row">
    <div class="col-3">
    <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
    </div>
    <div class="col">
    <div class="d-flex w-100 justify-content-between">
    <h4  class="mb-1">` + product.name + `</h4>
    <p>` + product.description + `</p>
    <p>` + product.currency + product.cost `</p>
    <small class="text-muted">` + product.soldCount + ` articulos vendidos</small>
    </div>
    </div>
    </div>
    </div>
    `

        document.getElementById("listadecosos").innerHTML = htmlContentToAppend; 
    }}
*/
    document.addEventListener("DOMContentLoaded", function (e) {
        getJSONData(PRODUCTS_URL).then(function (resultObj) {
            if (resultObj.status === "ok") {
                productsArray = resultObj.data;

                showProductsList(productsArray);
            }
        });
}); 