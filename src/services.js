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
                <td>${country.name}</td>
                <td>${country.population}</td>
                <td>${country.gdp}</td> 
                <td>${country.adhesionYear}</td>
                <td>
                    <button class="editBtn" onclick="editCountry('${country.id}')">Editar</button>
                    <button class="deleteBtn" onclick="deleteCountry('${country.id}', '${country.name}')">Eliminar</button>
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
                await getEuCountries()
                // Mostrar el alert solo después de una eliminación exitosa
                window.alert(`${name} abandona la Unión Europea`)
            } else {
                console.error(`Error al eliminar ${name}`)
            }
        } catch (error) {
            console.error('Error al intentar eliminar', error)
        }
    }
}

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
