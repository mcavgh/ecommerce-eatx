require('dotenv').config();
const { Sequelize,DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');


const { DB_USER, DB_PASSWORD, DB_HOST,DB_NAME } = process.env;
let sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASSWORD,
        logging: false,
        native: false
      })
    : new Sequelize(
        'postgres://postgres:2020@postgres:5432/ecommerce11',
        { logging: false, native: false }
      );
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter(
    file =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach(file => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map(entry => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {
  Product,
  Category,
  User,
  Order,
  Review,
  Newsletter
} = sequelize.models;

// PRODUCTS Category

Product.belongsToMany(Category, { through: 'Products_Categories' });
Category.belongsToMany(Product, { through: 'Products_Categories' });

// PRODUCTS REVIEWS

Product.hasMany(Review, {
  onDelete: 'CASCADE',
});
Review.belongsTo(Product);

// USERS REVIEWS

User.hasMany(Review, {
  onDelete: 'CASCADE',
});
Review.belongsTo(User);

// PRODUCTS ORDERS
const Order_line= sequelize.define('order_line', {
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue:1,

  },
});
Product.belongsToMany(Order, { through: Order_line});
Order.belongsToMany(Product, { through: Order_line });


// WISHLIST
Product.belongsToMany(User, { through: 'WishList'});
User.belongsToMany(Product, { through: 'WishList'});

User.hasMany(Order, {
  onDelete: 'CASCADE',
});
Order.belongsTo(User);

User.hasOne(Newsletter, { foreignKey: "userId" });
Newsletter.belongsTo(User);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
