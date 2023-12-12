'use strict';
const {
  Model
} = require('sequelize');
const books = require('./books');
module.exports = (sequelize, DataTypes) => {
  class students extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({books}) {
      // define association here
      this.belongsTo(books, {foreignKey : "bookId"})
    }
    toJSON(){
      return {...this.get(), id : undefined, createdAt: undefined, updatedAt: undefined}
    }
  }
  students.init({
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    name: {
      type : DataTypes.STRING,
      allowNull : false
    },
    rollno: {
      type : DataTypes.STRING,
      allowNull : false
    },
    email: {
      type : DataTypes.STRING,
      allowNull : false
    },
    bookId : {
      type : DataTypes.INTEGER,
      allowNull : false,
      references : {
        model : "books",
        key : "id"
      }
    },
    assignDate: {
      allowNull: false,
      type: DataTypes.DATEONLY
    },
    returnDate: {
      allowNull: false,
      type: DataTypes.DATEONLY
    },
  }, {
    sequelize,
    modelName: 'students',
  });
  return students;
};