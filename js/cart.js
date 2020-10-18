articulosArray = [];
function calctotal() {
    let suma = 0;
    let subs = document.getElementsByClassName("subtotal")
    for (let i = 0; i < subs.length; i++) {
        suma += parseInt(subs[i].innerHTML)
    }
    document.getElementById("total").innerHTML = suma;
    calcEnvio();
}

function calcSubtotal(unitCost, i) {

    let count = parseInt(document.getElementById(`cantidad${i}`).value);

    subtotal = count * unitCost;

    document.getElementById(`productSubtotal${i}`).innerHTML = subtotal;
    calctotal();
}
function checkCurrency(unitCost, currency) {
    if (currency === "UYU") {
        return unitCost / 40
    } else {
        return unitCost
    }
}

function showCartProducts(array) {
    let contenido = "";

    for (let i = 0; i < array.length; i++) {
        let product = array[i];
        let unitCostDolar = checkCurrency(product.unitCost, product.currency);

        let sub = unitCostDolar * product.count;
        contenido += `
            <tr>
                <th>${i + 1}</th>
                <td><img src='${product.src}' width="75px"></td>

                <td>${product.name}</td>
                
                <td> ${product.currency} ${product.unitCost}</td>
                
                <td><input style="width:60px;" onchange="calcSubtotal(${unitCostDolar}, ${i})" 
                    type="number" id="cantidad${i}" value="${product.count}" min="1"></td>
                
                <td><span class="subtotal" id="productSubtotal${i}" style="font-weight:blod;">${sub}</td>
            </tr>
        `
    }
    document.getElementById("listado").innerHTML += contenido;
    calctotal()
}

function calcEnvio() {
    let total = parseInt(document.getElementById("total").innerHTML);
    let envio;

    let elements = document.getElementsByName("envio");
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].checked) {
            envio = parseInt(elements[i].value);
        }
    }

    let totalConEnvio = total + envio;
    let contenido = `
        <tr>
        <td>${total}</td>

        <td>USD ${envio}</td>

        <td>${totalConEnvio}</td>

        </tr>
    `
    document.getElementById("totalEnvio").innerHTML = contenido;
}


document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_DOS).then(function (resultObj) {
        if (resultObj.status === "ok") {
            articulosArray = resultObj.data.articles;

            showCartProducts(articulosArray);

            calcEnvio()
        }
    });
    let elements = document.getElementsByName("envio");
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener("change", function () {
            calcEnvio()
        });
    }
});