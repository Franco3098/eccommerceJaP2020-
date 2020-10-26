const CURRENCY_DOLLAR = 'USD';
const CURRENCY_PESO = 'UYU';
carritoArray = [];


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
function seleccionarPago() {

    var pagos = document.getElementsByName("formaDpago");
    for (var i = 0; i < pagos.length; i++) {
        if (pagos[i].checked && (pagos[i].value == "1")) {
            document.getElementById("PagoPorBanco").classList.add("d-none");
            document.getElementById("idBanco").value = "";
            document.getElementById("numeroCuenta").value = "";
            document.getElementById("cardPayment").classList.remove("d-none");
        } else if (pagos[i].checked && (pagos[i].value == "2")) {
            document.getElementById("cardPayment").classList.add("d-none");
            document.getElementById("NameCard").value = "";
            document.getElementById("ExpDate").value = "";
            document.getElementById("CardId").value = "";
            document.getElementById("PassCard").value = "";
            document.getElementById("PagoPorBanco").classList.remove("d-none");
        }
    }

}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_DOS).then(function (resultObj) {
        if (resultObj.status === "ok") {
            carritoArray = resultObj.data.articles;

            showCartProducts(carritoArray);

            calcEnvio()
        }
    });
    let elements = document.getElementsByName("envio");
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener("change", function () {
            calcEnvio()
        });
    } let tipoPagos = document.getElementsByName("formaDpago");
    for (var i = 0; i < tipoPagos.length; i++) {
        tipoPagos[i].addEventListener("change", function () {
            seleccionarPago(); 
});
    }
    let form = document.getElementsByClassName('needs-validation')[0];
    form.addEventListener('submit', function (event) {
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        form.classList.add('was-validated');
    });

    let btnabrirmodaldatospago = document.getElementById("btnabrirmodaldatosdepago");
    btnabrirmodaldatospago.addEventListener('click', function (e) {
        let datosdeenvio = document.getElementById('datosdeenvio');
        if (datosdeenvio.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        datosdeenvio.classList.add('was-validated');
    });

    let botonSubmitModalDatosPagos = document.getElementById("btnsubmitmodaldatospagos");
    botonSubmitModalDatosPagos.addEventListener('click', function (event) {
        let pagos = document.getElementsByName("formaDpago");

    
        let value = null;
        for (var i = 0; i < pagos.length; i++) {
            if (pagos[i].checked) {
                value = pagos[i].value;
                break;
            }
        } 
        if (value != null && (value == "1" || value == "2")) {
            let ;
            if (value == "1") { 
                formPayment = document.getElementById('formCardPayment');
            } else if (value == "2") { 
                formPayment = document.getElementById('PagoDePanco');
            }

            if (formPayment.checkValidity() === false) { 
                event.preventDefault();
                event.stopPropagation();
            } else {
                $('#modalDatosPagos').modal('hide');
            }
            formPayment.classList.add('was-validated');
        }
    });
});