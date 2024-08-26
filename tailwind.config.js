/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./**/*.html', './**/*.js'],
    theme: {
        extend: {},
    },
    plugins: [],
    theme: {
        extend: {
            fontFamily: {
                'pf-square': ['PF Square Sans Pro', 'sans-serif'], // Asegúrate de cargar esta fuente
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'), // Plugin para formularios
    ],
}
