const Sequelize = require("sequelize");
const databaseName = "d589sf39oj64i6";

console.log("Opening database connection");

const db = new Sequelize(
  databaseName,
  "irnrjpqtmpzzxw",
  "5e321b861965722297b3adf2b0d9b75a486359361f01a66dc0593e019b2e7523",
  {
    host: "ec2-54-243-44-102.compute-1.amazonaws.com",
    dialect: "postgres",
    dialectOptions: {
      ssl: true
    },
    define: {
      timestamps: false
    },
    logging: false
  }
);

module.exports = db;
