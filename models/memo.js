'use strict'
module.exports = (sequelize, DataTypes) => {
  const memo = sequelize.define(
    'memo',
    {
      name: DataTypes.STRING,
      done: DataTypes.BOOLEAN,
      createdBy: DataTypes.BIGINT
    },
    {}
  )
  memo.associate = function(models) {
    // associations can be defined here
  }
  return memo
}
