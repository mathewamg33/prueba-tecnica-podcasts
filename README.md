# React + TypeScript + Vite

# Prueba técnica Podcasts

Este proyecto utiliza Vite como su herramienta de construcción y desarrollo, consiste en una mini-aplicación para escuchar podcasts
musicales. 

Aquí se explica cómo puedes desplegar y probar la versión de la aplicación, tanto en modo _development_ como en modo _production_, en un entorno local.

## Clonar el Repositorio e Instalar Dependencias

Para obtener y ejecutar la aplicación en tu máquina local, sigue estos pasos:

1. **Clona el repositorio:** Abre una terminal y navega hasta la ubicación donde deseas clonar el repositorio. Luego, ejecuta el siguiente comando para clonar el repositorio:

   ```
   git clone https://github.com/mathewamg33/prueba-tecnica-podcasts.git
   ```
2. **Ingresa a la carpeta del proyecto**
   
   ```
   cd prueba-tecnica-podcasts
   ```

3. **Instala las dependencias**
   
   ```
   npm install
   ```


## Pasos para Desplegar en Modo _Development_

Para ejecutar la aplicación en modo _Development_ y realizar cambios en tiempo real, sigue estos pasos:

1. **Inicia el servidor de desarrollo:**

   ```
   npm run dev
   ```

Esto generará una URL local (por ejemplo, http://localhost:5173) para acceder a la aplicación.

2. **Explora y modifica:**

Abre tu navegador y navega a la URL proporcionada. Los cambios en el código se actualizarán automáticamente en el navegador.

3. **Detén el servidor:**

Cuando hayas terminado, detén el servidor de desarrollo presionando Ctrl + C en la terminal.


## asos para Desplegar en Modo _Production_

1. **Construye tu proyecto de producción:** 

Antes de desplegar, asegúrate de haber construido tu proyecto para producción. Ejecuta el siguiente comando en tu terminal:

   ```
   npm run build
   ```

2. **Sirve la versión de producción:** 

Utiliza un servidor web estático para servir los archivos de la carpeta de salida (dist). Por ejemplo, puedes usar http-server:

   ```
   npm install -g http-server
   http-server dist
   ```
   
3. **Accede a la aplicación:**   

Abre tu navegador y navega a la URL proporcionada por el servidor (por ejemplo, http://127.0.0.1:8080, http://192.168.31.225:8080).
