const ORDER_ASC_BY_NUMBER = "2";
const ORDER_DESC_BY_NUMBER = "1";
const ORDER_BY_PROD_NUMBER = "Precio.";
var productsArray = [];
var minCost = undefined;
var maxCost = undefined;

function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_NUMBER) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_NUMBER) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_NUMBER) {
        result = array.sort(function (a, b) {
            let aSoldCount = parseInt(a.soldCount);
            let bSoldCount = parseInt(b.soldCount);

            if (aSoldCount > bSoldCount) { return -1; }
            if (aSoldCount < bSoldCount) { return 1; }
            return 0;
        });
    }

    return result;
}

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
                    <a href="product-info.html"><button style= float: right;">Ver producto</button></a><br><br>
                    <br><br><br><br>
                    <p class="mb-1">` + product.currency + " " +  product.cost +  `</p>
                </div>
            </div>
        </div>
        `
        }
        document.getElementById("listadecosos").innerHTML = htmlContentToAppend;
    }
}
function sortAndShowProducts(sortCriteria, productsArray) {
    currentSortCriteria = sortCriteria;

    if (productsArray != undefined) {
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);
    showProductsList(currentProductsArray);
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDER_ASC_BY_NUMBER, resultObj.data);
           
            productsArray = resultObj.data;

            showProductsList(productsArray);
        }
    });
    
    document.getElementById("sortascendente").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_NUMBER);
    });

    document.getElementById("sortdescendente").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_NUMBER);
    });

    document.getElementById("sortByCost").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_NUMBER);
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