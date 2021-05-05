const users = require('./usersRoute');
const products = require('./productsRoute');
const auth = require('./authRoute');

module.exports = app => {
    app.use('/login', auth)
    app.use('/user', users)
    app.use('/product', products)
}