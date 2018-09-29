'use strict';
/*
* @Author: Newbie Coder
* @Date:   2018-09-26 01:56:13
* @Last Modified by:   Newbie Coder
* @Last Modified time: 2018-09-30 01:23:55
*/
'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.APP_ENV;
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;


// IF YOU WANT TO CUSTOMIZE CONFIGURATION 
// ===================================================

// const fs          = require('fs'),
//       path        = require('path'),
//       Sequelize   = require('sequelize'),
//       basename    = path.basename(__filename),
//       env         = process.env.NODE_ENV,
//       dbname      = process.env.DB_NAME,
//       dbusername  = process.env.DB_USERNAME,
//       dbpassword  = process.env.DB_PASSWORD,
//       db          = {};

// let sequelize;
// sequelize  = new Sequelize(dbname,dbusername,dbpassword, {
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   dialect: process.env.DB_CONNECTION,
//   operatorsAliases: false,
//   pool: { max: 5, min: 0, acquire: 30000, idle: 10000 }
// });

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     const model = sequelize['import'](path.join(__dirname, file));
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;
