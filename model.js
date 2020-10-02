const {Sequelize, Model, DataTypes} = require('sequelize')
const sequelize = new Sequelize('sqlite::memory:')

class Restaurant extends Model {}
Restaurant.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING
}, {sequelize: sequelize})

class Menu extends Model {}
Menu.init({
    title: DataTypes.STRING
}, {sequelize})

Restaurant.hasMany(Menu)
Menu.belongsTo(Restaurant)

module.exports = {
    Restaurant,
    Menu,
    sequelize
}