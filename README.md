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

