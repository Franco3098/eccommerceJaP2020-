var product = {};
var comentariosArray = [];
var relatedProducts = [];
var productArray = [];
var productsArray = [];
var relatedProductArray = [];


function showProductInfo(product, comentariosArray) {

    let info = "";
    let img = "";
    let comments = "<hr>";



    info += `
                <h2> ${product.name} </h2>
                <hr>
                ${product.description}
                <br><br>
                ${product.cost} USD.<br>
                ${product.soldCount} vendidos.<br>
                `;


    img += ` 
                   <img class="img" src="${product.images[0]}" alt="">
                   `;


    comentariosArray.forEach(function (comment) {
        let score = "";


        comments += `
    <strong> ${comment.user}</strong> comentó:<br>
    <p> ${comment.description}</p>
    `;

        for (let i = 0; i < comment.score; i++) {
            score += `<span class="fa fa-star checked"></span>`;
        }
        for (let i = comment.score + 1; i < 5; i++) {
            score += `<span class="fa fa-star checked"></span>`;
        }
        comments += `<sub>${comment.dateTime}</sub><br>`;

        comments += `<div style="text-align: left;">${score}</div><br><hr>`;
    });



    document.getElementById("contenido").innerHTML = info;
    document.getElementById("imagenes").innerHTML = img;
    document.getElementById("comentarios").innerHTML = comments;
}

document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            comentariosArray = resultObj.data;
        }
    });
});

getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
        product = resultObj.data;

        showProductInfo(product, comentariosArray)
    }
});

function showrelatedProducts() {
    const relProductsDiv = document.getElementById('productosrelacionados');
    let htmlRelProducts = '';
  
    relatedProducts.forEach(product => {
      htmlRelProducts += `
      <div class="card m-2">
        <div class="no-gutters">
          <a href="product-info.html"></a>
          <img class="rel-thumbnail" src="${product.imgSrc}">
          <div class="info">
            <h5>${product.name}</h5>
            <p class="badge badge-light">${product.currency} ${product.cost}</p>
          </div>
        </div>
      </div>
      `
      ;
    });
  
    relProductsDiv.innerHTML = htmlRelProducts;
  }
      getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok") {
          product.relatedProducts.forEach(e => relatedProducts.push(resultObj.data[e]));
          showrelatedProducts();
        }
      });