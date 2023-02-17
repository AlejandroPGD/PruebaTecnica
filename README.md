Bienvenidos al repositorio de mi prueba técnica
La tecnología base utilizada fue Javascript, además se utilizó:

Elaboración de la base de datos: PostgreSQL y Sequelize.
Ruteo del backend: Express.js.
Desarrollo del Front-end: Redux (store, reducer y acciones), React (componentes funcionales), Css (para dar estilos), Bootstrap.


Los pasos para la ejecución son los siguientes 
API
crear BD en PostgreSQL  con el nombre “task”
En el archivo db.js. modificar la siguiente información (host, port, username, password)
En la carpeta api ejecutar una consola con los siguientes comandos
npm install
node index.js

rutas para probar la base de datos:
GET http://localhost:3001/task                response: todas las tareas
GET http://localhost:3001/task?name=nombre    response: busqueda por nombre
GET http://localhost:3001/task/8              response: busqueda por id
POST http://localhost:3001/task     
Body                                          response: crea Tarea 
{
  "name":"tarea17",
  "description":"esta es la tarea 17",
  "duration":"4",
  "beginDate":"2023-01-15",
  "endDate":"2023-03-18",
  "priority":"Normal",
  "status":"Terminada"
}

PUT http://localhost:3001/task/8               response  edita una tarea con el id
Body
{
  "name":"tarea17",
  "description":"esta es la tarea 17",
  "duration":"4",
  "beginDate":"2023-01-15",
  "endDate":"2023-03-18",
  "priority":"Normal",
  "status":"Terminada"
}
DELETE http://localhost:3001/task/8               response  Elimina una tarea con el id

Client
En la carpeta cliente ejecutar una consola con los siguientes comandos 
npm install
npm start
