const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  database: "ecochallenge",
  username: "postgres",
  password: "1",
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;
