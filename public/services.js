//READ METHOD: GET  ENDPOINT: http://localhost:3000/countries FETCH
const baseUrl = 'http://localhost:3000/euCountries'
async function getEuCountries() {
    const response = await fetch(baseUrl, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
    const data = await response.json()
    console.log(data)
    return data
}

// Mostrar los países en la tabla
async function showCountries() {
    const tbody = document.querySelector('tbody')
    const countries = await getEuCountries()

    tbody.innerHTML = countries
        .map(
            (country) => `
            <tr>
                <td class="border border-black p-2 text-center font-pf-square">${country.name}</td>
                <td class="border border-black p-2 text-center font-pf-square">${country.population}</td>
                <td class="border border-black p-2 text-center font-pf-square">${country.gdp}</td>
                <td class="border border-black p-2 text-center font-pf-square">${country.adhesionYear}</td>
                <td class="border border-black p-2 text-center">
                    <button class="w-[45%] border border-blue-600 bg-yellow-300 text-yellow-800 rounded-md text-base font-pf-square text-[1vw] py-2 px-4 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-blue-500" onclick="editCountry('${country.id}')">Editar</button>
                    <button class="w-[45%] border border-red-600 bg-red-700 text-white rounded-md text-base font-pf-square text-[1vw] py-2 px-4 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500" onclick="deleteCountry('${country.id}', '${country.name}')">Eliminar</button>
                </td>
            </tr>
        `
        )
        .join('')
}

showCountries()

//DELETE method: DELETE

async function deleteCountry(id, name) {
    let userConfirmation = window.confirm(
        `¿Estas seguro de que ${name} abandone la Unión Europea?`
    )
    if (userConfirmation === false) {
        window.alert(`${name} permanece en la Unión Europea`)
    } else {
        try {
            let response = await fetch(`${baseUrl}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            // Creamos un if para que cuando la respuesta de la función eliminar sea OK que imprima ejecute la función que queremos como console.log y que muestre los países
            if (response.ok) {
                // Actualizar la lista de países después de eliminar
                // Mostrar el alert solo después de una eliminación exitosa
                window.alert(`${name} abandona la Unión Europea`)
            } else {
                console.error(`Error al eliminar ${name}`)
            }
        } catch (error) {
            console.error('Error al intentar eliminar', error)
        }
        await showCountries()
    }
}

//FUNCIÓN PARA CAPITALIZAR LA PRIMERA LETRA

let inputName = document.getElementById('countryName')

function capitalizeFirstLetter() {
    // Almacenamos el valor del input
    let newCountryName = inputName.value

    // Extraemos la primera letra y el resto del texto
    let firstLetter = newCountryName.substring(0, 1)
    let restOfWord = newCountryName.substring(1)

    // Capitalizamos la primera letra y convertimos el resto a minúsculas
    let capital = firstLetter.toUpperCase()
    let lowerRest = restOfWord.toLowerCase()

    // Unimos la primera letra capitalizada con el resto en minúsculas
    inputName.value = capital.concat(lowerRest)
}
inputName.addEventListener('input', capitalizeFirstLetter)

//ARRAY CON TODOS LOS PAÍSES DE EUROPA

const europeanCountries = [
    'Albania',
    'Andorra',
    'Armenia',
    'Austria',
    'Azerbaijan',
    'Belarus',
    'Bélgica',
    'Bosnia y herzegovina',
    'Bulgaria',
    'Croatia',
    'Chipre',
    'Chequia',
    'Dinamarca',
    'Estonia',
    'Finlandia',
    'Francia',
    'Georgia',
    'Alemania',
    'Grecia',
    'Hungría',
    'Islandia',
    'Irlanda',
    'Italia',
    'Kazakhstan',
    'Kosovo',
    'Letonia',
    'Liechtenstein',
    'Lituania',
    'Luxemburgo',
    'Malta',
    'Moldova',
    'Mónaco',
    'Montenegro',
    'Países bajos',
    'Macedonia',
    'Noruega',
    'Polonia',
    'Portugal',
    'Rumanía',
    'Rusia',
    'San marino',
    'Serbia',
    'Eslovaquia',
    'Eslovenia',
    'España',
    'Suecia',
    'Suiza',
    'Turquía',
    'Ucrania',
    'Reino unido',
    'Vaticano',
]

//CREATE method: POST

async function addCountry() {
    const form = document.querySelector('#addCountry')
    const formData = new FormData(form)
    const newCountry = {
        name: formData.get('name'),
        population: formData.get('population'),
        gdp: formData.get('gdp'),
        adhesionYear: formData.get('adhesionYear'),
    }

    const countryName = newCountry.name

    // Verificar si el país está en la lista de países europeos
    if (!europeanCountries.includes(countryName)) {
        alert(`${countryName} no es un país de Europa`)
        return // Salir de la función si el país no es válido
    }

    // Obtener la lista actual de países de la UE
    const euCountries = await getEuCountries()

    // Verificar si el país ya está en la lista de la UE
    const countryExists = euCountries.some(
        (country) => country.name === countryName
    )
    if (countryExists) {
        alert(`${countryName} ya forma parte de la Unión Europea`)
        return // Salir de la función si el país ya está en la UE
    }

    function validatePopulation(population) {
        return population && !isNaN(population) && population > 0
    }

    function validateGdp(gdp) {
        return gdp && !isNaN(gdp) && gdp > 0
    }

    // Validaciones separadas para población y PIB
    if (!validatePopulation(newCountry.population)) {
        alert('Por favor, indique un valor válido para la Población')
        return
    }

    if (!validateGdp(newCountry.gdp)) {
        alert('Por favor, indique un valor válido para el PIB (Mill€)')
        return
    }

    // Validar el año de adhesión (entre 1956 y la actualidad)
    const currentYear = new Date().getFullYear()
    if (
        newCountry.adhesionYear < 1956 ||
        newCountry.adhesionYear > currentYear
    ) {
        alert(`El año de adhesión debe estar entre 1956 y ${currentYear}.`)
        return // Salir de la función si el año no es válido
    }

    // Confirmar con el usuario antes de enviar
    const userConfirmed = window.confirm(
        `¿Estás seguro de que quieres que ${countryName} ingrese en la Unión Europea?`
    )
    if (!userConfirmed) {
        return // Si el usuario cancela, salir de la función
    }
    console.log(newCountry)
    try {
        let response = await fetch(`${baseUrl}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCountry),
        })

        // Verificar si la solicitud fue exitosa
        if (response.ok) {
            const result = await response.json()
            alert(`${countryName} ingresa en la Unión Europea`)
            await showCountries()
        } else {
            throw new Error('Error en la solicitud: ' + response.statusText)
        }
    } catch (error) {
        // Manejar errores de la solicitud
        alert('Hubo un problema al añadir a ${countryName}: ' + error.message)
        console.error('Error:', error)
    }
}
// fetch('http://localhost:3000/countries')
//     .then((response) => response.json())
//     .then((data) => console.log(data))

// let countriesData
// fetch('http://localhost:3000/countries')
//     .then((response) => response.json())
//     .then((data) => {
//         // Asignamos el contenido de data a la variable
//         countriesData = data
//         console.log(countriesData) // Puedes ver el contenido en la consola
//     })

// function showCountries() {
//     let countries = document.getElementById('countries')
//     countries.textContent = countriesData
//}

//obtener tarea por id
// async function getTasckById (`baseurl/task/$(id)`, {
//   const response = await fetch('http://localhost:3000/euCountries', {
//     method: Get,
//     headers: {
//         "Content-Type": "application/json",
//     },
// }
// );
// const task = await response.json();
// return task;
// }
