/* Declaro una variable productos con un arreglo vacio para recorrer la informacion del arreglo de json luego */
let actualProductsArray = [];
let anotherArray = [];

/* Defino dos variables para menor y mayor precio no definidas */
let minPrice = undefined;
let maxPrice = undefined;

/* Declaro las constantes especificando el criterio de orden*/
const PRICE_ORDER_ASC = "09"
const PRICE_ORDER_DESC = "90"
const ORDER_BY_COUNT = "Cant."

/* Declaro una variable no definida para el criterio de orden seleccionado */
let actualSortMeasure = undefined;

/* Declaro una funcion para ordenar los productos dependiendo el precio de estos se ordenara de menor a mayor,
 o a la inversa; como alternativa de ordenar dependiendo de la cantidad de vendidos que posee cada producto se
ordena de forma descendiente  */
function sortProducts(measure, products) {
    let result = [];
    if (measure === PRICE_ORDER_ASC) {
        result = products.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (measure === PRICE_ORDER_DESC) {
        result = products.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (measure === ORDER_BY_COUNT) {
        result = products.sort(function (a, b) {
            let aSold = parseInt(a.soldCount);
            let bSold = parseInt(b.soldCount);

            if (aSold > bSold) { return -1; }
            if (aSold < bSold) { return 1; }
            return 0;
        });
    }

    return result;
};

/* Declaro una funcion para ordenar y mostar los productos */
function sortAndShowProducts(sortMeasure, productsArray) {
    actualSortMeasure = sortMeasure;

    if (productsArray != undefined) {
        actualProductsArray = productsArray;
    }

    actualProductsArray = sortProducts(actualSortMeasure, actualProductsArray);

    showProductsList();
};

/* Declaro una funcion para mostrar el arreglo de productos de json en formato de lista,
 recorriendo cada elemento de el y trayendo sus propiedades para inyectarlas en el html  */
function showProductsList() {

    Catname = document.getElementById("name");
    Catname.innerHTML = anotherArray.catName;

    let htmlContentToAppend = "";
    for (let product of actualProductsArray) {

        /* Especifico las condicionales y comparativas de los precios minimo y maximo aclarado */

        if (((minPrice == undefined) || (minPrice != undefined && parseInt(product.cost) >= minPrice)) &&
            ((maxPrice == undefined) || (maxPrice != undefined && parseInt(product.cost) <= maxPrice))) {
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
    }

    /* Inyecto dicha informacion del arreglo a traves del innerHTML */
    document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
};

/* Añado un escuchador de carga completa de los elementos del DOM, hago una peticion al json 
si la respuesta del json esta bien, muestro el resultado con la funcion correspondiente */

document.addEventListener("DOMContentLoaded", function (e) { 

    /* Defino una variable generica para todos los productos concatenando el link de productos, 
    la informacion correspondiente de cada uno desde el Local Storage y la extension de .json */
    let allProducts = PRODUCTS_URL + localStorage.getItem("catID") + EXT_TYPE;

    getJSONData(allProducts).then(function (resultObj) {
        if (resultObj.status === "ok") {
            actualProductsArray = resultObj.data.products
            anotherArray = resultObj.data
            showProductsList()
        }
    });

    /* Añado un escuchador de tipo click para el boton de Filtrar y especifico las condicionales
     y sus comparaciones para los valores de los inputs de los rangos de precios minimos y maximos especificados ahi dentro */
    document.getElementById("rangeFilterPrice").addEventListener("click", function () {

        minPrice = document.getElementById("rangeFilterPriceMin").value;
        maxPrice = document.getElementById("rangeFilterPriceMax").value;

        if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0) {
            minPrice = parseInt(minPrice);
        }
        else {
            minPrice = undefined;
        }

        if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0) {
            maxPrice = parseInt(maxPrice);
        }
        else {
            maxPrice = undefined;
        }

        showProductsList();
    });

    /* Añado un escuchador de tipo click para traer los valores a traves del DOM de los inputs de precio minimo y maximo */
    document.getElementById("clearRangeFilterPrice").addEventListener("click", function () {
        document.getElementById("rangeFilterPriceMin").value = "";
        document.getElementById("rangeFilterPriceMax").value = "";

        minPrice = undefined;
        maxPrice = undefined;

        showProductsList();
    });

    /* Agrego los escuchadores para cada boton de ordenado respectivo */
    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowProducts(PRICE_ORDER_DESC);
    });

    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowProducts(PRICE_ORDER_ASC);
    });

    document.getElementById("sortByCount").addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_COUNT);
    });
});
