'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.posts.belongsTo(models.users, {
        foreignKey: 'userId'
      })
    }
  };
  posts.init({
    postId: {
      type:DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    postTitle: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    postBody: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'posts',
  });
  return posts;
};