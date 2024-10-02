//Cuando la página cargue, deberá traer el listado de información sobre películas disponible en https://japceibal.github.io/japflix_api/movies-data.json, pero no mostrarlo al usuario.

document.addEventListener("DOMContentLoaded", function(){
    const url = "https://japceibal.github.io/japflix_api/movies-data.json";

    fetch(url)
        .then(response => response.json())
        .then(data => {
            movies = data;
            console.log(movies);
        })
        .catch(error => {
            console.error("Error fetch", error);
        });
});

//Cuando el usuario presiona el botón buscar, y si previamente ingresó algún valor en el campo de búsqueda, deberá mostrar un listado con las películas que coincidan con dicha búsqueda en sus atributos de title o genres o tagline u overview. La información a mostrar en este punto será: title, tagline, y vote_average (en formato de "estrellas").

const container = document.getElementById("lista");
const btnBuscar = document.getElementById("btnBuscar");


btnBuscar.addEventListener("click", () =>{
    inputBuscar = document.getElementById("inputBuscar").value;
    //Limpiar lista
    container.innerHTML = ``

    arrayBuscar = movies.filter(element => 
        element.title.toLowerCase().includes(inputBuscar.toLowerCase()) || 
        //genres es un array
        element.genres.indexOf(inputBuscar) >= 0 ||
        element.tagline.toLowerCase().includes(inputBuscar.toLowerCase()) || 
        element.overview.toLowerCase().includes(inputBuscar.toLowerCase())
    )
    console.log(arrayBuscar)

    let star = '<span class="fa fa-star checked"></span>'

    arrayBuscar.forEach(element => {
        container.innerHTML += `<li class="peliculaItem" class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop" id="${element.id}" onclick=offCanvas(${element.id}) {index.js};>
        <span class="elementStars">
        ${star.repeat(element.vote_average)}
        </span>
        <p class="elementTitle">${element.title}</p>
        <p class="elementTagline">${element.tagline}</p>
        </li>`
    });

})

//Cuando el usuario pulse en alguna de las películas mostradas, se deberá desplegar un contenedor superior con la siguiente información de dicha película: title, overview y lista de genres.

function offCanvas(peliculaId) {
    

    peliculaTitulo = document.getElementById("offcanvasTopLabel");
    peliculaDesc = document.getElementById("offcanvas-body");

    pelicula = movies.filter(element => element.id === peliculaId);

    peliculaTitulo.innerHTML = `${pelicula[0].title}`;
    peliculaDesc.innerHTML = `<p>${pelicula[0].overview}</p>`;

    pelicula[0].genres.forEach(element =>{
        peliculaDesc.innerHTML += `<p class="genres">${element.name}</p>`
    });
    console.log(pelicula);
}

//Añadir en lo anterior un botón con un desplegable que contenga el año de lanzamiento (sin el mes ni el día), la duración del largometraje, el presupuesto con el que contó y las ganancias obtenidas