var express = require('express');
var router = express.Router();

const { validateSchema, checkIdSchema } = require('../../utils');
const { employeeSchema } = require('./validation');

const {
  getAll,
  getDetail,
  search,
  create,
  hardDelete,
  update,
  getList
} = require('./controller');
const passport = require('passport');

const routes = [
  {
    path: '/',
    method: 'get',
    validators: [passport.authenticate('jwt', { session: false })],
    handlers: [getList],
  },
  {
    path: '/all',
    method: 'get',
    validators: [passport.authenticate('jwt', { session: false })],
    handlers: [getAll],
  },
  {
    path: '/',
    method: 'post',
    validators: [validateSchema(employeeSchema)],
    handlers: [create]
  },
  {
    path: '/search',
    method: 'get',
    validators: [passport.authenticate('jwt', { session: false })],
    handlers: [search]
  },
  {
    path: '/:id',
    method: 'get',
    validators: [passport.authenticate('jwt', { session: false }), validateSchema(checkIdSchema)],
    handlers: [getDetail]
  },
  {
    path: '/:id',
    method: 'put',
    validators: [passport.authenticate('jwt', { session: false }), validateSchema(checkIdSchema), validateSchema(employeeSchema)],
    handlers: [update]
  },
  {
    path: '/:id',
    method: 'delete',
    validators: [passport.authenticate('jwt', { session: false }), validateSchema(checkIdSchema)],
    handlers: [hardDelete]
  },
]

for (const route of routes) {

  router.route(route.path)[route.method](...route.validators, ...route.handlers)
}
module.exports = router;
