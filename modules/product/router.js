var express = require('express');
var router = express.Router();

const passport = require('passport');

const {
  getAll,
  getDetail,
  getList,
  search
} = require('./controller')


const { validateSchema, checkIdSchema } = require('../../utils');
const { validationSchema, validationQuerySchema, } = require('./validation');

const routes = [
  {
    path: '/',
    method: 'get',
    validators: [],
    handlers: [getList],
  },
  {
    path: '/all',
    method: 'get',
    validators: [],
    handlers: [getAll],
  },
  {
    path: '/search',
    method: 'get',
    validators: [],
    handlers: [search]
  },
  {
    path: '/:id',
    method: 'get',
    validators: [validateSchema(checkIdSchema)],
    handlers: [getDetail]
  },
]

for (const route of routes) {
  router.route(route.path)[route.method](...route.validators, ...route.handlers)
}

module.exports = router;
