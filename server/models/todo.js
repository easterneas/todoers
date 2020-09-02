'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todo.belongsTo(models.User)
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Title must be filled."
        }
      }
    },
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    due_date: {
      type: DataTypes.DATEONLY,
      validate: {
        isDate: {
          msg: "Are you sure the date is in the correct format?"
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate(instance, options) {
        instance.status = 'pending'
      }
    },
    modelName: 'Todo',
  });
  return Todo;
};