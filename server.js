const express = require('express')
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const app = express()
const {Restaurant, Menu, sequelize} = require('./model')

const handlebars = expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.engine('handlebars', handlebars)
app.set('view engine', 'handlebars')

app.get('/restaurants', async (req, res) => {
    const restaurants = await Restaurant.findAll({
        include: [
            {model: Menu, as: 'menus'}
        ]
    })
    res.render('restaurants', {restaurants})
})

app.get('/restaurant/:id', async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id)
    const menus = await restaurant.getMenus({
        include: ['items']
    })
    res.render('restaurant', {restaurant, menus})
})

app.get('/restaurants/:id/delete', async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id)
    await restaurant.destroy()
    res.redirect('/restaurants')
})

app.get('/restaurants/:id/edit-restaurant', async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id)
    res.render('edit-restaurant', {restaurant})
})

app.post('/restaurants/:id/edit-restaurant', async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id)
    restaurant.update(req.body)
    res.redirect('/restaurants')
})

app.post('/restaurants', async (req, res) => {
    await Restaurant.create(req.body)
    res.redirect('/restaurants')
})

app.post('/restaurants/:restaurant_id/menus', async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id)
    await Menu.create(req.body)
    res.redirect('/restaurants')
})

//app.get('/add-new', async (req, res) => {
//    const restaurants = await Restaurant.findAll({
//    })
//    res.render('add-new', {restaurants})
//})

//app.get('/about', (request, response) => {
    //response.render('about', {date: new Date(), name: "Leigh"})
//})

app.listen(3000, async () => {
    await sequelize.sync()
    console.log('web server running')
})