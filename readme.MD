# Todo App

Este proyecto consiste en una aplicación Todo con un backend desarrollado en Node.js utilizando Express y MySQL, y con frontend en ReactJS.

## Características

- Crear, leer, actualizar y eliminar tareas (CRUD).
- Interfaz de usuario para interactuar con las tareas.
- Backend RESTful para gestionar las tareas utilizando MySQL.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- [Node.js](https://nodejs.org/) (Se recomienda Node.js v14.x o superior)
- [MySQL](https://dev.mysql.com/downloads/mysql/) (Configurado y ejecutándose en tu máquina)

## Instalación

Sigue estos pasos para configurar el proyecto localmente.

### Clonar el Repositorio

Para obtener el proyecto, primero clona este repositorio en tu máquina local:

```bash
git clone https://github.com/kamivillabla/ExpressTodoApp
cd ExpressTodoApp

```

### Configurar el Backend

Navega a la carpeta del backend e instala las dependencias necesarias:

```
cd backend-app
npm install
```

Crea un archivo .env en la raíz del backend con las siguientes variables de entorno (ajusta el puerto según sea necesario):

```
PORT=5000
MYSQL_HOST=localhost
MYSQL_USER=tu_usuario_mysql
MYSQL_PASSWORD=tu_contraseña_mysql
MYSQL_DATABASE=nombre_de_tu_base_de_datos_mysql
MYSQL_PORT=xxxx

```

Para iniciar el servidor de desarrollo con nodemon para recarga automática:

```
npm run dev
```

El servidor debería estar ahora corriendo en http://localhost:5000.

### Configurar el Frontend

Regresa a la raíz del proyecto y navega a la carpeta del frontend:

```
cd ..
cd frontend-app
```

instala las dependencias

```
npm install
```

Inicia la aplicación frontend

```
npm run dev
```

Una vez que la aplicación esté en ejecución, revisa la consola donde iniciaste el servidor. Se mostrará una URL con el puerto al cual debes ingresar:

```
Local: http://localhost:XXXX/
```

### Uso de la Aplicación

- Agregar Tareas: Usa el formulario en la interfaz para agregar nuevas tareas.
- Editar/Actualizar Tareas: Clic en la tarea para editar su título o marcarla como completada.
- Eliminar Tareas: Clic en el botón de eliminar para remover una tarea existente.
