const express = require('express');
const router = express.Router();

const { validateSchema } = require('../../utils');
const {
  getDetailSchema,
  createSchema,
  updateEmployeeSchema,
  updateShippingDateSchema,
  updateStatusSchema,
} = require('./validation');
const {
  getAll,
  getDetail,
  create,
  updateStatus,
  updateShippingDate,
  updateEmployee,
} = require('./controller');

const routes = [
  {
    path: '/',
    method: 'get',
    validators: [],
    handlers: [getAll],
  },
  {
    path: '/',
    method: 'post',
    validators: [validateSchema(createSchema)],
    handlers: [create],
  },
  {
    path: '/:id',
    method: 'get',
    validators: [validateSchema(getDetailSchema)],
    handlers: [getDetail],
  },
  {
    path: '/status/:id',
    method: 'patch',
    validators: [validateSchema(updateStatusSchema)],
    handlers: [updateStatus],
  },
]

for (const route of routes) {
  router.route(route.path)[route.method](...route.validators, ...route.handlers)
}

module.exports = router;