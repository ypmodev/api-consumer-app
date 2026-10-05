# Consumo de datos de API con Fetch y Axios

**Descripción:**  
Aplicación web que consulta la API pública JSONPlaceholder y muestra los resultados (posts) en tarjetas, permitiendo elegir si las peticiones se hacen con Fetch o con Axios. Incluye búsqueda, paginación, estados de carga y gestión de errores.

## 📁 Estructura del proyecto

```text
api-consumer-app/
├── index.html   # Estructura de la página
├── styles.css   # Estilos
├── main.js      # Lógica: peticiones, renderizado, paginación y errores
└── README.md
```

## 🛠️ Tecnologías

- HTML5
- CSS3
- JavaScript
- Fetch API
- Axios

## 🔗 API utilizada

- [JSONPlaceholder](https://jsonplaceholder.typicode.com/posts)

## 🚀 Funcionalidades

- Consumo de datos mediante Fetch.
- Consumo de datos mediante Axios.
- Búsqueda de posts.
- Paginación de resultados.
- Indicador de carga.
- Mensajes de error.
- Validación del campo de búsqueda.
- Posibilidad de cambiar entre Fetch y Axios.

## ⚙️ Instalación

No necesita instalación ni dependencias locales (Axios se carga desde CDN, por lo que hace falta conexión a internet).

1. Clonar el repositorio:

```bash
   git clone https://github.com/ypmodev/api-consumer-app.git
   cd api-consumer-app
```

2. Abrir el proyecto en Visual Studio Code.
3. Abrir `index.html` en el navegador o utilizar una extensión como Live Server.

## 🧭 Uso

1. Selecciona el método de petición (**Utiliza Fetch** o **Utiliza Axios**).
2. Escribe un término de búsqueda en el campo de texto.
3. Pulsa **Obtener Datos**.
4. Navega entre páginas con los botones de paginación inferiores.

Si el campo de búsqueda está vacío, se muestra un mensaje de error y no se realiza la petición.

## 👤 Autor

Yanet Pérez
