# Configurar parámetros necesaris para el despliegue.
## Se necesita configurar los parametros de ambiente environment y environment.development.ts
## Para este caso se tiene configurado l aurl del servidor backend y comentado la url para ambiente local del backend, lo mismo ocurre para la url del socketIO, tambien se agrega una clave para el uso de mapas en mapbox.
export const environment = {
    production: true,
    mapPk : 'pk.eyJ1IjoiY3ZpbGVsYTE5NzkiLCJhIPRUEBAPKaaaaaaaaaaaaaaaaaaaaaaaaaa',
    urlApi : 'https://api-back-service-3uomm4d6da-uc.a.run.app/localizador',
    //urlApi : 'http://localhost:4000/localizador',
    styleMapbox : 'mapbox://styles/mapbox/streets-v12',
    urlSocketIo : 'https://api-back-service-3uomm4d6da-uc.a.run.app',
    //urlSocketIo : 'http://localhost:4000',
};

## Configurar proxy para las url en el archivo proxy.conf.json, se agrega la url de acceso al servidpor backend
{
    "/localizador": {
        "target": "https://api-back-service-3uomm4d6da-uc.a.run.app",
        "secure": true,
        "changeOrigin": true
        }
}

# BuscaPersonaFree

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.7.

## Development server

Ejecute `ng serve` para levantar el servidor. Navegar a `http://localhost:4200/`.

## Build

Ejecute `ng build` para compilar el proyecto para el directorio `dist/` para producción.

## Running unit tests

Ejecute `ng test` para ejecutar los test.

## Estructuración del proyecto
### Src/app/services/* 
Este directorio alberga los servicios Angular que se utilizan para interactuar con el servidor backend. Los servicios realizan tareas específicas como la recuperación de datos y lógica transaccional y las interacciones de la API. Estos servicios son inyectables y reutilizables en toda la aplicación.

### Src/app/models/* 
Este directorio contiene las definiciones de las estructuras de datos utilizadas en toda la aplicación. Cada archivo dentro de este directorio define una interfaz en TypeScript que modela los datos manejados por la aplicación.

### Src/app/icon/* 
Utiliza lógica para reutilizar un código de utilización de imagen de tipo svg.

### Src/app/auth/* 
Utilizada para alojar la lógica de registro de usuario y el inicio de sesión de usuario.

### Src/app/shared/* 
Utilizada para alojar lógica del header, footer y menú de navegación.

### Src/app/pages/* 
Utilizada para alojar las distintas lógicas del sitio como contratación, consulta, los mapas, perfil de usuario, reseñas.

### Src/app/app-routing.module.ts.
Se encuentra la configuración de las rutas o path de navegación.

### Src/assets/{icons o imagen}/* 
Se encuentran los iconos e imágenes utilizadas en la aplicación.
Descarga gratis de iconos svg en svgrepo https://www.svgrepo.com/
facebook-logo-svgrepo-com.svg
github-142-svgrepo-com.svg
google-logo-fill-svgrepo-com.svg
instagram-logo-svgrepo-com.svg
linkedin-logo-svgrepo-com.svg
twitter-social-logotype-svgrepo-com.svg

imagen descargada gratis desde pixabay:
https://pixabay.com/es/illustrations/signo-de-interrogaci%C3%B3n-importante-1872665/
question-mark-1872665_640.jpg
question-mark-1872665_1280.jpg
question-mark-1872665_1920.jpg
question-mark-1872665.jpg









### Src/styles.css.
Está la configuración de los estilos css generales de la aplicación.
