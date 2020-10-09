const {Restaurant, sequelize, Menu, Item} = require('./model')

beforeAll(async () => {
    await sequelize.sync()
})

describe('Restaurant', () => {
    test('when a restaurant is created it is added to the database', async () => {
        const restaurant = await Restaurant.create({name: "Flour & Grape", image: "image.url"})
        expect(restaurant.id).toBeTruthy()
        expect(restaurant.createdAt).toBeTruthy()
    })
    test('can add a menu to a restaurant', async () => {
        const restaurant = await Restaurant.create({name: "Crol & co", image: "image.url"})
        const menu = await Menu.create({title: "Weekend Brunch"})
        await restaurant.addMenu(menu)
        const menus = await restaurant.getMenus()
        expect(menus.length).toBe(1)
    })
    test('can add a item to a menu', async () => {
        const menu = await Menu.create({title: "Weekend Brunch"})
        const item = await Item.create({name: "Eggs Benedict"})
        await menu.addItem(item)
        const items = await menu.getItems()
        expect(items.length).toBe(1)
    })
})