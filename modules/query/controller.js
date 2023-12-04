const { getQueryDateTime, fuzzySearch } = require('../../utils');

const {
  Category,
  Supplier,
  Customer,
  Employee,
  Product,
  Order,
} = require('../../model');

module.exports = {

  // --------------------------------------------------------------------------------------------sort name 
  SortProductAToZ: async (req, res, next) => {
    try {
      let results = await Product.find()
        .populate("category")
        .populate("supplier")
        .sort({
          name: 1,
        });

      let total = await Product.countDocuments();

      return res.status(200).send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });

    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  SortProductZToA: async (req, res, next) => {
    try {
      let results = await Product.find()
        .populate("category")
        .populate("supplier")
        .sort({
          name: -1,
        });

      let total = await Product.countDocuments();

      return res.status(200).send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });

    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  SortCategoryAToZ: async (req, res, next) => {
    try {
      let results = await Category.find()
        .sort({
          name: 1,
        });

      let total = await Product.countDocuments();

      return res.status(200).send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });

    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  SortCategoryZToA: async (req, res, next) => {
    try {
      let results = await Category.find()
        .sort({
          name: -1,
        });

      let total = await Product.countDocuments();

      return res.status(200).send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });

    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  SortSupplierAToZ: async (req, res, next) => {
    try {
      let results = await Supplier.find()
        .sort({
          name: 1,
        });

      let total = await Product.countDocuments();

      return res.status(200).send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });

    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  SortSupplierZToA: async (req, res, next) => {
    try {
      let results = await Supplier.find()
        .sort({
          name: -1,
        });

      let total = await Product.countDocuments();

      return res.status(200).send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });

    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },


  //--------------------------------------------------------------------------------------------Sort Price 
  SortProductPriceHToL: async (req, res, next) => {
    try {
      let results = await Product.find()
        .populate("category")
        .populate("supplier")
        .sort({
          price: -1,
        });

      let total = await Product.countDocuments();

      return res.status(200).send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });

    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  SortProductPriceLToH: async (req, res, next) => {
    try {
      let results = await Product.find()
        .populate("category")
        .populate("supplier")
        .sort({
          price: 1,
        });

      let total = await Product.countDocuments();

      return res.status(200).send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });

    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  //---------------------------------------------------------------------------------------------Filter 
  FilterProductBySupplier: async (req, res, next) => {
    try {
      let results = await Supplier.aggregate()
        .lookup({
          from: 'products',
          localField: '_id', // TRUY VẤN NGƯỢC!!! 
          foreignField: 'supplierId',
          as: 'products',
        })
        .unwind({
          path: '$products',
          preserveNullAndEmptyArrays: true, // GIỮ LẠI NHỮNG CATE KHÔNG CÓ PROD VÌ UNWIND SẼ XÓA MẤT 
        })
        .group({
          _id: '$_id',
          name: { $first: '$name' },
          email: { $first: '$email' },
          phoneNumber: { $first: '$phoneNumber' },
          address: { $first: '$address' },
          product: { $push: '$products' },
          totalProduct: {  //ADD  FIELD (KHÔNG CẦN PHẢI THÊM METHOD addField)
            // $sum: '$products.stock',
            $sum: {
              $cond: {
                if: { // IF ElSE của mongodb
                  $and: [
                    { $gt: ['$products.stock', 0] },
                  ]
                }, then: 1, else: 0 //NẾU KHÔNG CÓ STOCK SẼ MẶT ĐỊNH 0
              }
            },
          },
        })
        .sort({
          name: 1,
        });

      let total = await Supplier.countDocuments();

      return res.status(200).send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });

    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  filterOrderByCustomerId: async (req, res, next) => {
    try {
      let { id } = req.query;

      const conditionFind = {
        customerId: { $in: id },
      }
      let results = await Order.find(conditionFind)

      let total = await Order.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  //---------------------------------------------------------------------------------------------Get
  getProductLimit: async (req, res, next) => {
    try {
      let results = await Product.find()
        .sort({
          name: 1,
        })
        .limit(3)
        .skip(0);

      let total = await Product.countDocuments();

      return res.status(200).send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });

    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },
}