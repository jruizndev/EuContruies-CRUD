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
                <td class="border border-white  text-center font-pf-square bg-blue-300" >${country.name}</td>
                <td class="border border-white  text-center font-pf-square bg-blue-300">${country.population}</td>
                <td class="border border-white  text-center font-pf-square bg-blue-300">${country.gdp}</td>
                <td class="border border-white  p-2 text-center font-pf-square bg-blue-300">${country.accessionYear}</td>
                <td class="border border-white p-2 text-center bg-blue-300">
                    <button class="w-[45%] border border-yellow-500 bg-yellow-300 text-yellow-800 rounded-md text-base font-pf-square text-[1vw] py-2 px-4 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-600 shadow-md" onclick="openModal('${country.id}')">Update</button>
                    <button class="w-[45%] border border-red-600 bg-red-700 text-white rounded-md text-base font-pf-square text-[1vw] py-2 px-4 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 shadow-md" onclick="deleteCountry('${country.id}', '${country.name}')">Delete</button>
                </td>
            </tr>
        `
        )
        .join('') //Lo pinta en html
}

showCountries()

//DELETE method: DELETE

async function deleteCountry(id, name) {
    let userConfirmation = window.confirm(
        `Are you sure that ${name} will leave the European Union?`
    )
    if (userConfirmation === false) {
        window.alert(`${name} remains in the European Union`)
    } else {
        try {
            let response = await fetch(`${baseUrl}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            //  Si la respuesta es ok un alert avisa de eliminación
            if (response.ok) {
                window.alert(`${name} leaves the European Union`)
                await showCountries() //Cargamos de nuevo la lista de países actualizada
            } else {
                console.error(`Error deleting ${name}`)
            }
        } catch (error) {
            console.error('Error trying to delete', error)
        }
    }
}

//Función para capitalizar la primera letra

let inputName = document.getElementById('countryName')
function capitalizeFirstLetter(newCountryName) {
    // Extraemos la primera letra y el resto del texto
    let firstLetter = newCountryName.substring(0, 1)
    let restOfWord = newCountryName.substring(1)

    // Capitalizamos la primera letra y convertimos el resto a minúsculas
    let capital = firstLetter.toUpperCase()
    let lowerRest = restOfWord.toLowerCase()

    // Unimos la primera letra capitalizada con el resto en minúsculas
    newCountryNameUpperCase = capital.concat(lowerRest)
    return newCountryNameUpperCase
}
inputName.addEventListener('input', function () {
    const capitalValue = capitalizeFirstLetter(inputName.value)
    inputName.value = capitalValue
})

//Array con todos los países de Europa
const europeanCountries = [
    'Albania',
    'Andorra',
    'Armenia',
    'Austria',
    'Azerbaijan',
    'Belarus',
    'Belgium',
    'Bosnia and herzegovina',
    'Bulgaria',
    'Croatia',
    'Cyprus',
    'Czechia',
    'Denmark',
    'Estonia',
    'Finland',
    'France',
    'Georgia',
    'Germany',
    'Greece',
    'Hungary',
    'Iceland',
    'Ireland',
    'Italy',
    'Kazakhstan',
    'Kosovo',
    'Latvia',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Malta',
    'Moldova',
    'Monaco',
    'Montenegro',
    'Netherlands',
    'Macedonia',
    'Norway',
    'Poland',
    'Portugal',
    'Romania',
    'Russia',
    'San Marino',
    'Serbia',
    'Slovakia',
    'Slovenia',
    'Spain',
    'Sweden',
    'Switzerland',
    'Turkey',
    'Ukraine',
    'United kingdom',
]

//Validación si el país es europeo y si está ya en la lista json

// Validación si el país es europeo y si está ya en la lista json
async function validateCountry(countryName) {
    const euCountries = await getEuCountries()

    // Verificar si el país está en la lista de países europeos
    if (!europeanCountries.includes(countryName)) {
        alert(`${countryName} is not a European country`)
        return false // Retorna false si el país no es válido
    }

    // Verificar si el país ya está en la lista de la UE
    const countryExists = euCountries.some(
        (country) => country.name.toLowerCase() === countryName.toLowerCase()
    )
    if (countryExists) {
        alert(`${countryName} is already part of the European Union`)
        return false //  Retorna false si el pais no esta en la unión europea
    }

    return true // True si las validaciones son ok
}

//Validación por población

function validatePopulation(population) {
    if (population <= 33560) {
        alert('The minimum population is 33600')
        return false //FALSE SI NO ES VALIDO
    }
    return true // TRUE SI ES VALIDO
}

//validación por pib

function validateGdp(gdp) {
    if (gdp <= 1560) {
        alert('The minimun GDP (Mill €) is 1560')
        return false //False si el pib no es valido
    }
    return true // True si el pib es valido
}

//Validación por año

function validateYear(accessionYear) {
    if (accessionYear < 1958) {
        alert(`The year of access must be from 1958 onwards`)
        return false // False si el año no es válido
    }
    return true // True si el año es valido
}

//CREATE method: POST
async function addCountry() {
    const form = document.getElementById('addCountry')
    const formData = new FormData(form)
    const newCountry = {
        name: formData.get('name'),
        population: formData.get('population'),
        gdp: formData.get('gdp'),
        accessionYear: formData.get('accessionYear'),
    }

    // Validaciones
    if (
        !(await validateCountry(newCountry.name)) ||
        !validatePopulation(newCountry.population) ||
        !validateGdp(newCountry.gdp) ||
        !validateYear(newCountry.accessionYear)
    ) {
        return
    }

    // Confirmación del usuario
    const userConfirmed = window.confirm(
        `Are you sure that ${newCountry.name} will join the European Union?`
    )
    if (!userConfirmed) {
        return
    }

    try {
        const response = await fetch(`${baseUrl}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCountry),
        })

        // Si está bien se abre un alert avisando de que se ha añadido el país
        if (response.ok) {
            alert(`${newCountry.name} joins the European Union`)
            form.reset()
            await showCountries() // Actualizar la lista de países
        } else {
            throw new Error('Request error: ' + response.statusText)
        }
    } catch (error) {
        // MANEJO DE ERRORES TRY
        alert(
            `There was a problem adding to ${newCountry.name}: ` + error.message
        )
        console.error('Error:', error)
    }
}

//FETCH METHOD: POST

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
                <h2 class="text-xl font-bold mb-4">Update country</h2>
                <form id="updateCountryForm">
                    <label class="block mb-2">Name</label>
                    <input type="text" name="name" value="${country.name}"  id="countryNameModal" class="border border-black p-2 mb-4 w-full">
                    
                    <label class="block mb-2">Population</label>
                    <input type="number" name="population" value="${country.population}" class="border border-black p-2 mb-4 w-full">
                    
                    <label class="block mb-2">GDP (Mill €)</label>
                    <input type="number" name="gdp" value="${country.gdp}" class="border border-black p-2 mb-4 w-full">
                    
                    <label class="block mb-2">Accession Year</label>
                    <input type="number" name="accessionYear" value="${country.accessionYear}" class="border border-black p-2 mb-4 w-full">
                    
                    <div class="flex justify-end gap-3">
                      <button type="button" onclick="updateCountry('${country.id}')" class="w-full border border-yellow-500 bg-yellow-300 text-yellow-800 rounded-md text-base font-pf-square text-[1vw] py-2 px-4 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-600 shadow-md">Save</button>
                    <button type="button" onclick="closeModal()" class="w-full border-red-600 bg-red-700 text-white rounded-md text-base font-pf-square text-[1vw] py-2 px-4 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 shadow-md">Cancel</button>
                </div>
                    </div>
                </form>
            </div> 
        </div>
    `

    document.body.insertAdjacentHTML('beforeend', modalContent) //InsertAdjHtml pinta el modal en html
}

// Función para cerrar el modal
function closeModal() {
    const modal = document.getElementById('updateModal')
    if (modal) {
        modal.remove()
    }
}

async function updateCountry(id) {
    const form = document.getElementById('updateCountryForm')
    const formData = new FormData(form)
    const nameData = formData.get('name')
    const nameDataCapital = capitalizeFirstLetter(nameData)
    console.log(nameDataCapital)
    const updatedCountry = {
        name: nameDataCapital,
        population: formData.get('population'),
        gdp: formData.get('gdp'),
        accessionYear: formData.get('accessionYear'),
    }

    // Validaciones
    if (
        !(await validateCountry(updatedCountry.name)) ||
        !validatePopulation(updatedCountry.population) ||
        !validateGdp(updatedCountry.gdp) ||
        !validateYear(updatedCountry.accessionYear)
    ) {
        return
    }

    // Envío de datos al servidor
    try {
        const response = await fetch(`${baseUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedCountry),
        })

        if (response.ok) {
            alert('Country updated successfully')
            closeModal()
            showCountries()
        } else {
            throw new Error('Error in request: ' + response.statusText)
        }
    } catch (error) {
        alert('There was a problem updating the country: ' + error.message)
        console.error('Error:', error)
    }
}
