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
                <td class="border border-blue-700  text-center font-pf-square bg-blue-300" >${country.name}</td>
                <td class="border border-blue-700  text-center font-pf-square bg-blue-300">${country.population}</td>
                <td class="border border-blue-700  text-center font-pf-square bg-blue-300">${country.gdp}</td>
                <td class="border border-blue-700  p-2 text-center font-pf-square bg-blue-300">${country.adhesionYear}</td>
                <td class="border border-blue-700 p-2 text-center bg-blue-300">
                    <button class="w-[45%] border border-yellow-500 bg-yellow-300 text-yellow-800 rounded-md text-base font-pf-square text-[1vw] py-2 px-4 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-blue-500" onclick="openModal('${country.id}')">Actualizar</button>
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
    'Bielorrusia',
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
    'Moldavia',
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
]

async function validateCountry(countryName) {
    const euCountries = await getEuCountries()

    // Verificar si el país está en la lista de países europeos
    if (!europeanCountries.includes(countryName)) {
        alert(`${countryName} no es un país de Europa`)
        return false // Retorna false si el país no es válido
    }

    // Verificar si el país ya está en la lista de la UE
    const countryExists = euCountries.includes(europeanCountries)
    if (countryExists) {
        alert(`${countryName} ya forma parte de la Unión Europea`)
        return false // Retorna false si el país ya está en la UE
    }

    return true // Retorna true si las validaciones son exitosas
}

function validatePopulation(population) {
    if (population <= 33599) {
        alert('La población mínima es 33600')
        return false // Retorna false si la población no cumple con el requisito
    }
    return true // Retorna true si la población es válida
}

function validateGdp(gdp) {
    if (gdp <= 1559) {
        alert('El PIB (Mill€) mínimo es 1560')
        return false // Retorna false si el PIB no cumple con el requisito
    }
    return true // Retorna true si el PIB es válido
}

function validateYear(adhesionYear) {
    const currentYear = new Date().getFullYear()
    if (adhesionYear < 1958 || adhesionYear > currentYear) {
        alert(`El año de adhesión debe estar entre 1958 y ${currentYear}.`)
        return false // Retorna false si el año no es válido
    }
    return true // Retorna true si el año es válido
}

//CREATE method: POST
async function addCountry() {
    const form = document.getElementById('addCountry')
    const formData = new FormData(form)
    const newCountry = {
        name: formData.get('name'),
        population: formData.get('population'), // Convertir a número
        gdp: formData.get('gdp'), // Convertir a número
        adhesionYear: formData.get('adhesionYear'), // Convertir a número
    }

    // Validar el país, población, PIB, y año de adhesión antes de agregar
    if (
        !(await validateCountry(newCountry.name)) ||
        !validatePopulation(newCountry.population) ||
        !validateGdp(newCountry.gdp) ||
        !validateYear(newCountry.adhesionYear)
    ) {
        return // Salir de la función si alguna validación falla
    }

    // Confirmar con el usuario antes de enviar
    const userConfirmed = window.confirm(
        `¿Estás seguro de que quieres que ${newCountry.name} ingrese en la Unión Europea?`
    )
    if (!userConfirmed) {
        return // Si el usuario cancela, salir de la función
    }

    try {
        const response = await fetch(`${baseUrl}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCountry),
        })

        // Verificar si la solicitud fue exitosa
        if (response.ok) {
            alert(`${newCountry.name} ingresa en la Unión Europea`)
            await showCountries() // Actualizar la lista de países
        } else {
            throw new Error('Error en la solicitud: ' + response.statusText)
        }
    } catch (error) {
        // Manejar errores de la solicitud
        alert(
            `Hubo un problema al añadir a ${newCountry.name}: ` + error.message
        )
        console.error('Error:', error)
    }
}

// Función para obtener un país por ID
async function getEuCountryById(id) {
    const response = await fetch(`${baseUrl}/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
    return response.json()
}

// Función para mostrar el modal con los detalles del país para editar
async function openModal(id) {
    const country = await getEuCountryById(id)

    const modalContent = `
        <div id="updateModal" class="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center">
            <div class="bg-white rounded-lg p-6">
                <h2 class="text-xl font-bold mb-4">Actualizar País</h2>
                <form id="updateCountryForm">
                    <label class="block mb-2">Nombre:</label>
                    <input type="text" name="name" value="${country.name}" id="countryName" class="border border-black p-2 mb-4 w-full">
                    
                    <label class="block mb-2">Población:</label>
                    <input type="number" name="population" value="${country.population}" class="border border-black p-2 mb-4 w-full">
                    
                    <label class="block mb-2">PIB:</label>
                    <input type="number" name="gdp" value="${country.gdp}" class="border border-black p-2 mb-4 w-full">
                    
                    <label class="block mb-2">Año de adhesión:</label>
                    <input type="number" name="adhesionYear" value="${country.adhesionYear}" class="border border-black p-2 mb-4 w-full">
                    
                    <div class="flex justify-end">
                        <button type="button" onclick="updateCountry('${country.id}')" class="bg-yellow-300 text-yellow-800 rounded-md text-base px-4 py-2 mr-2 hover:bg-yellow-400">Guardar</button>
                        <button type="button" onclick="closeModal()" class="bg-red-700 text-white rounded-md text-base px-4 py-2 hover:bg-red-800">Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    `

    document.body.insertAdjacentHTML('beforeend', modalContent)
}

// Función para cerrar el modal
function closeModal() {
    const modal = document.getElementById('updateModal')
    if (modal) {
        modal.remove()
    }
}

// Función para guardar los cambios del país
async function updateCountry(id) {
    const form = document.getElementById('updateCountryForm')
    const formData = new FormData(form)
    const updatedCountry = {
        name: formData.get('name'),
        population: formData.get('population'),
        gdp: formData.get('gdp'),
        adhesionYear: formData.get('adhesionYear'),
    }

    try {
        const response = await fetch(`${baseUrl}/${id}`, {
            method: 'PUT', // Método PUT para actualizar
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedCountry),
        })

        if (response.ok) {
            alert('País actualizado correctamente')
            closeModal()
            showCountries()
        } else {
            throw new Error('Error en la solicitud: ' + response.statusText)
        }
    } catch (error) {
        alert('Hubo un problema al actualizar el país: ' + error.message)
        console.error('Error:', error)
    }
}
