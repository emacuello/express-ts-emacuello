<div align="center">
<img src="https://res.cloudinary.com/dxrjz4ycj/image/upload/f_auto,q_auto/mkvjvsmmbam1xxhrqobs" align="center" style="width: 100%, height:50px" />
</div>  
  
# Plantilla de Express con TypeScript


Esta es una plantilla básica de Express configurada para usar TypeScript, con algunas dependencias. La idea es que sea algo simple, como un punto de partida. ¿Por qué lo hice? Porque estar configurando siempre lo mismo en cada proyecto de Express me resultaba ineficiente. Como suelo usar NestJS, que con su CLI me facilita todo, cuando creo algo en Express necesitaba algo similar. La verdad, no sé si existe algo así, pero decidí hacerlo como práctica. ¡Espero que les guste!

## Lo que incluye

- Cors
- Eslint
- Morgan
- Nodemon
- Ts-node
- Typescript
- Dotenv
- Express
- Joi

## Instalaciones

Como instalarlo? Hay dos formas para hacerlo, la primera y mas sencilla es con un comando de NPX y luego la otra forma es clonando el repositorio.

## Instalación 1:

1. ```bash
    npx express-ts-emacuello
    ```
2. Seguir los pasos que te indica la terminal.


## Instalación 2:

1. Clona el repositorio:
    ```bash
    git clone https://github.com/emacuello/express-ts-template-emacuello
    ```
2. Navega al directorio del proyecto:
    ```bash
    cd express-ts-template-emacuello
    ```
3. Instala las dependencias segun corresponda:
    ```bash
    npm install
    ```
    
    ```bash
    pnpm install
    ```
    
    ```bash
    yarn install
    ```
4. Elimina la carpeta .git del directorio
    ```bash
    rm -rf .git
    ```
5. Inicia un nuevo repositorio
    ```bash
    git init
    ```
## Scripts Disponibles

En el directorio del proyecto, puedes ejecutar:

### `npm start`

Inicia el servidor con Nodemon. Utiliza `ts-node` para la compilación y ejecución en caliente.

### `npm run build`

Compila el proyecto TypeScript a JavaScript con TSC. Los archivos compilados se guardan en la carpeta `dist`.

### `npm run lint`

Inicia el linter de Eslint en busca de fallas en el codigo segun la configuracion establecida.


## A tener en cuenta:

Las variables de entorno por defecto deberían ir en un archivo `.env`. Si quieres usar otro nombre, deberías configurarlo en `src/config/env.ts`.

Las variables se declaran en ese archivo y se usa `Joi` para la validación de su existencia. Todas las variables que pasen por `Joi` son imprescindibles en el proyecto y el servidor no se levantará si no las encuentra. Si no quieres esta opción, puedes hacer que no pasen por `Joi` y exportarlas directamente.

```javascript
import 'dotenv/config';
import * as joi from 'joi';

const PORT = process.env.PORT;