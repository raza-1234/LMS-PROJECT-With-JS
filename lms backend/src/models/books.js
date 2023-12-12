'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({students}) {
      // define association here
      this.hasMany(students , {foreignKey : "bookId", as : "studentDetail"})

    }

    toJSON(){
      return {...this.get(), createdAt: undefined, updatedAt: undefined}
    }
  }
  books.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull : false
    },
    author: {
      type: DataTypes.STRING,
      allowNull : false
    },
    edition: {
      type: DataTypes.STRING,
      allowNull : false
    },
    assigned : {
      type : DataTypes.BOOLEAN,
      allowNull : false,
    }

  }, {
    sequelize,
    modelName: 'books',
  });
  return books;
};