# 🌍 **Fake API CRUD for European Union Countries**

![Project Image](public/img/apiscreenshot)

## 📝 **Project Description**
Welcome to my **Fake API** project! 🎉 This application allows you to interact with a list of European Union countries using **CRUD** operations (Create, Read, Update, Delete). Everything is handled through the browser, so you can easily view, add, delete, or update countries.

## 🚀 **App Features**

### 🔍 **View the list of countries:**
You can view all the countries in the European Union in the list. Everything is displayed directly in the browser, making it super easy to use.

### ➕ **Add new countries:**
If you want to add a new country, you can do so. However, there are some rules:
- The country must not already be in the list. No duplicates allowed! 🚫
- The country must belong to the European continent. No intruders from other continents. 🌍

### 🗑️ **Delete countries:**
Is there a country that shouldn't be on the list anymore? No problem, you can easily delete it with a single click.

### ✏️ **Update country information:**
If a country changes its name or you need to update any information, you can do that too. The app allows you to edit the details of the countries already in the list.

## 🛠️ **How does it work?**

### 🔧 **JSON Server:**
I used **JSON Server** to create a fake API that manages the list of countries. This means you don't need a real backend, but you can test how it would be if you had one.

### 🌐 **Fetch API:**
All communication with the API is done using JavaScript's **Fetch API**, a modern and straightforward way to handle HTTP requests.

### 🎨 **Tailwind CSS:**
To make the interface look great, I used **Tailwind CSS**, a framework that allows you to create a modern design without complications.

## 🚀 **How to Use this App**

### 1. 🖥️ **Clone this repository:**
First, clone the project to your local machine with the following command:

```bash
git clone https://github.com/jruizndev/EuContruies-CRUD.git
```

### 2. 🔧 **Install Tailwind CSS and the necessary plugins:**
Make sure you have everything you need for Tailwind to work properly, including the plugins and the custom font:

```bash
npm install -D tailwindcss postcss autoprefixer
npm install @tailwindcss/forms tailwindcss-textshadow
```
### 3. ⚙️ **Configure Tailwind:**
Once the dependencies are installed, you can configure Tailwind CSS. Here are the basic steps to get started:

- Create the `tailwind.config.js` file if it doesn't exist:

```bash
npx tailwindcss init
```
### 3. ⚙️ **Configure Tailwind:**
Once the dependencies are installed, you can configure Tailwind CSS. Here are the basic steps to get started:

- Create the `tailwind.config.js` file if it doesn't exist:

```bash
npx tailwindcss init
```
### 3. ⚙️ **Configure Tailwind:**
Once the dependencies are installed, you can configure Tailwind CSS. Here are the basic steps to get started:

- Add the configurations and plugins to the `tailwind.config.js` file as shown below:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./**/*.html', './**/*.js'],
    theme: {
        extend: {
            fontFamily: {
                'pf-square': ['PF Square Sans Pro', 'sans-serif'],
            },
        },
    },
    plugins: [require('@tailwindcss/forms'), require('tailwindcss-textshadow')],
}
```

### 4. 📦 **Build the CSS with Tailwind:**
To have Tailwind generate the CSS that you will use in your project, run:

```bash
npm run tailwind
```

### 5. 🚀 **Start JSON Server:**
Start the JSON server to work with the Fake API:

```bash
npm run apiFake
```

### 6. 🎉 **Ready to use!**
Open `index.html` in your browser and start interacting with the list of countries.

## 🛠️ **Next Steps**
I have some ideas to improve this app, such as adding more validations and making it possible to filter countries by different criteria. Stay tuned! 🔍

## 🤝 **Contributions**
If you have any suggestions or find something that could be improved, I would love to receive your contributions! Feel free to open an **issue** or submit a **pull request**. 🙌
