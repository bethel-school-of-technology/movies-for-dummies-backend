/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('movie', {
    idmovie_name: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    movie_name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(999),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'movie'
  });
};
