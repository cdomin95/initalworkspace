//Declaro una variable productos con un arreglo vacio para recorrer la informacion del arreglo de json luego
let products = []

//Declaro una funcion para mostrar el arreglo de productos de json en formato de lista,
//recorriendo cada elemento de el y trayendo sus propiedades para inyectarlas en el html 
function showProductsList() {
    let htmlContentToAppend = ""
    for(let product of products) {
    htmlContentToAppend += `
    <div onclick="setCatID(${product.id})" class="list-group-item list-group-item-action cursor-active">
        <div class="row">
            <div class="col-3">
                <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">${product.name} - ${product.currency} ${product.cost}</h4>
                    <small class="text-muted">${product.soldCount} vendidos</small>
                </div>
                <p class="mb-1">${product.description}</p>
            </div>
        </div>
    </div>
    `
}

//Inyecto dicha informacion del arreglo a traves del innerHTML
document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
}

//Añado un escuchador de carga completa de los elementos del DOM, hago una peticion al json 
//si la respuesta del json esta bien, muestro el resultado con la funcion correspondiente

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(AUTOS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            products = resultObj.data.products
            showProductsList()
        }
})
});

