const { fuzzySearch } = require('../../utils');

const axios = require('axios');

require('dotenv').config();

const Product = require('./model');
const Category = require('../cart/model')
const Supplier = require('./../supplier/model')


module.exports = {
  //------------------------------------------GET-----------------------------------------------//

  getAll: async (req, res, next) => { // NOTE
    try {
      let results = await Product.find({
        isDeleted: false,
      })
        .populate('category') //productSchema.virtual('category'), at models/product
        .populate('supplier') //productSchema.virtual('supplier'), at models/product
        .lean();

      return res.send({ code: 200, payload: results });
    } catch (err) {
      return res.send(404, {
        message: "Không tìm thấy",
        err,
      });
    }
  },

  getList: async (req, res, next) => { // NOTE
    try {
      const { page, pageSize } = req.query;
      const limit = pageSize || 12;

      const skip = limit * (page - 1) || 0;

      const conditionFind = { isDeleted: false };

      let results = await Product.find(conditionFind)
        .populate('category')
        .populate('supplier')
        .skip(skip)
        .limit(limit)
        .lean();

      const total = await Product.countDocuments(conditionFind);

      return res.send({ code: 200, payload: results, total });
    } catch (err) {
      return res.send(404, {
        message: "Không tìm thấy",
        err,
      });
    }
  },

  //search
  search: async (req, res, next) => {
    try {
      const { name, categoryId, priceStart, priceEnd, supplierId, limit, stockStart, stockEnd, page } = req.query;
      const conditionFind = { isDeleted: false };

      if (name) conditionFind.name = fuzzySearch(name);

      if (categoryId) {
        conditionFind.categoryId = categoryId;
      };

      if (supplierId) {
        conditionFind.supplierId = supplierId;
      };

      if (priceStart && priceEnd) { // 20 - 50
        const compareStart = { $lte: ['$price', priceEnd] }; // '$field'
        const compareEnd = { $gte: ['$price', priceStart] };
        conditionFind.$expr = { $and: [compareStart, compareEnd] };

      } else if (priceStart) {
        conditionFind.price = { $gte: parseFloat(priceStart) };

      } else if (priceEnd) {
        conditionFind.price = { $lte: parseFloat(priceEnd) };
      }

      const result = await Product.find(conditionFind)
        .populate('category')
        .populate('supplier');

      res.send(200, {
        message: "Thành công",
        payload: result,
      });
    } catch (error) {
      return res.send(404, {
        message: "Không tìm thấy",
      })
    }
  },

  //get detail
  getDetail: async (req, res, next) => {
    try {
      const { id } = req.params;

      let result = await Product.findOne({
        _id: id,
        isDeleted: false,
      })
        .populate('category')
        .populate('supplier');

      if (result) {
        return res.send({ code: 200, payload: result });
      }

      return res.status(404).send({ code: 404, message: 'Không tìm thấy' });
    } catch (err) {
      res.status(404).json({
        message: 'Get detail fail!!',
        payload: err,
      });
    }
  },
};