const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  database: "ecochallenge",
  username: "postgres",
  password: "Ale+dra123",
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;
