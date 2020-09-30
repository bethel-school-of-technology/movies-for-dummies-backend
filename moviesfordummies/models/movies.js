'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class movies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.movies.belongsTo(models.users, {
        foreignKey: 'userId'
      })
    }
  };
  movies.init({
    moviesId: {
      type:DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    moviesTitle: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    moviesBody: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'movies',
  });
  return movies;
};