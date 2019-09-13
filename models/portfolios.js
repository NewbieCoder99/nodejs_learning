'use strict';
module.exports = (sequelize, DataTypes) => {
  const Portfolios = sequelize.define('Portfolios', {
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    descriptions: DataTypes.TEXT,
    company: DataTypes.STRING,
    companyLogo: DataTypes.STRING,
    developmentDate: DataTypes.DATE,
    paymentType: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {});
  Portfolios.associate = function(models) {
    // associations can be defined here
  };
  return Portfolios;
};