
const passport = require('passport');


const routes = [
    {
        path: '/auth',
        validator: [],
        router: require('./modules/auth/router')
    },
    {
        path: '/products',
        validator: [],
        router: require('./modules/product/router')
    },
    {
        path: '/categories',
        validator: [passport.authenticate('jwt', { session: false })],
        router: require('./modules/category/router')
    },
    {
        path: '/employees',
        validator: [],
        router: require('./modules/employee/router')
    },
    {
        path: '/customers',
        validator: [],
        router: require('./modules/customer/router')
    },
    {
        path: '/orders',
        validator: [passport.authenticate('jwt', { session: false })],
        router: require('./modules/order/router')
    },
    {
        path: '/media',
        validator: [passport.authenticate('jwt', { session: false })],
        router: require('./modules/media/router')
    },
    {
        path: '/query',
        validator: [passport.authenticate('jwt', { session: false })],
        router: require('./modules/query/router')
    },
];

module.exports = routes

