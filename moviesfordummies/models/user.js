/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    iduser: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    last_name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Email: {
      type: DataTypes.STRING,
      unique: true
    },
    }, {
    sequelize,
    tableName: 'user'
  });
  return user;
};
