
//La información se ordena alfabéticamente. Método sort. no es lo mismo mayusculas que minusculas. Pasar a MAYÚSCULAS
//Al clickar en cada una de las banderas tendrá que mostrar la información detallada en una ventana flotante del país seleccionado. Este flotante se quedará fijo y centrado hasta que se cierre.
//bandera data[i].flag
//nombre del país en mayúscula : data[i].name.official
//capital data[i].capital[0]
//población data[i].population
//lado de la carretera por el que se circula. data[i].car.side
//Tendrá un botón cerrar para hacer desaparecer esa información.
//Puedes manipular el HTML si lo necesitaras.
//Si necesitas añadir clases a un elemento mediante JS, lo puedes hacer con elemento.classList.add('clase que quieres añadir') 
//y para eliminar elemento.classList.remove('clase que quieres añadir')

const listContainer = document.getElementById("countries-list"); 
const info = document.getElementById("info")

const urlBase= "https://restcountries.com/v3/all"

const getCountries = async () =>{
    try {
        const response = await fetch (urlBase);
        if (!response.ok){
            throw new Error ("No se puede acceder", response.status);
        }
        const countries = await response.json();
        ordenAlfab(countries)
        return countries

    }catch (error){
        console.log("Error al obtener los datos", error);
    }
};

const ordenAlfab = (countries)=>{
    countries.sort((a,b) =>{
        const nameA = a.name.official.toUpperCase()
        const nameB = b.name.official.toUpperCase()
        return nameA.localeCompare(nameB)
    })
}; 

getCountries().then(countries =>{
    countries.forEach((country,index) => {
        console.log(countries)
        let template = `<div class="card">
        <img src="${country.flags[0]}" alt="${country.name.official}"/>
        <h2>${country.name.official}</h2>
    </div>`
        listContainer.insertAdjacentHTML("beforeend", template);

    const card = document.querySelectorAll(".card")[index]

    card.addEventListener("click", () => {
        let templateInfo = `<div class="infoDetalle">
        <img src=${country.flags[0]} alt=${country.name.official}/>
        
        <div class="infoText">
        <h2>${country.name.official}</h2>
        <p>Capital: ${country.capital[0]}</p>
        <p>Población: ${country.population} habitantes</p>
        <p>Lado de la carretera: ${country.car.side}  </p>
        </div>
        <button onclick="closeInfo()" id="cerrarBtn" >Cerrar</button>
       
    </div>`
     
       info.innerHTML= templateInfo
       info.classList.add("visible")
    })
    })
});

const closeInfo = ()=> info.classList.remove("visible")


getCountries();









