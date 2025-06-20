'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const User = sequelize.define('Users', {
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  cpf: {
    type: DataTypes.STRING(11),
    allowNull: false,
    unique: true,
  },
  gender: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  birth_date: {
    type: DataTypes.DATEONLY,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  phone: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'users',
  timestamps: true,
  underscored: true
});

export default User;