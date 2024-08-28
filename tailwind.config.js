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
                'pf-square': ['PF Square Sans Pro', 'sans-serif'],
            },
        },
    },
    plugins: [require('@tailwindcss/forms'), require('tailwindcss-textshadow')],
}
