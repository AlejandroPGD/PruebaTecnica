const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');



let sequelize =
    process.env.NODE_ENV === "production"
        ? new Sequelize({
            database: "task",
            dialect: "postgres",
            host: "localhost: 5432",
            port: 5432,
            username: "postgres",
            password: "password",
            pool: {
                max: 3,
                min: 1,
                idle: 10000,
            },
            dialectOptions: {
                ssl: {
                    require: true,
                    //Ref.:https://github.com/brianc/node-postgres/issues/2009
                    rejectUnauthorized: false,
                },
                keepAlive: true,
            },
            ssl: true,
        })
        : new Sequelize(
            `postgres://postgres:password@localhost:5432/task`,
            { logging: false, native: false }
        );


const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
    .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach((file) => {
        modelDefiners.push(require(path.join(__dirname, '/models', file)));
    });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Task } = sequelize.models;


//Task.belongsToMany(Task, { through: "Tasks" });
//Task.belongsToMany(Task, { as: "children", through: 'TaskChildren' });

Task.hasMany(Task, { foreignKey: 'task_id', as: 'taskch' });
Task.belongsTo(Task, { foreignKey: 'task_id', as: 'taskft' });





module.exports = {
    ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
    conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};