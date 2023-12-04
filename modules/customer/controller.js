const { default: mongoose } = require('mongoose');

const { fuzzySearch } = require('../../utils');

const Customer = require('./model');


const getAll = async (req, res, next) => {
    try {
        const payload = await Customer.find({
            isDeleted: false
        });
        res.status(200).send({
            payload: payload,
            message: "Tìm kiếm tất cả thành công"
        });
    } catch (error) {
        res.status(400).send({
            error,
            message: "Tìm kiếm tất cả thất bại"
        });
    }
};

//get detail
const getDetail = async function (req, res, next) {
    try {
        const { id } = req.params;

        const payload = await Customer.findOne({
            _id: id,
            isDeleted: false,
        });

        res.status(200).send({
            payload: payload,
            message: "Tìm kiếm thành công"
        });
    } catch (error) {
        res.status(400).send({
            error,
            message: "Tìm kiếm không thành công hoặc sai mã Id"
        });
    }
};

//search
const search = async function (req, res, next) {
    try {
     const { fullName, email, phoneNumber} = req.query;
     const conditionFind = { isDeleted: false };
 
     if (fullName) conditionFind.fullName = fuzzySearch(fullName);
     if (email) conditionFind.email = fuzzySearch(email);
     if (phoneNumber) conditionFind.phoneNumber = fuzzySearch(phoneNumber);
 
     const payload = await Customer.find(conditionFind);
 
     res.status(200).send({
       payload,
       message: "Tìm kiếm thành công"
     });
   } catch (error) {
    res.status(400).send({
       error,
       message: "Tìm kiếm không thành công"
     });
   }
 };

/** CREATE */

const create = async function (req, res, next) {
    const { fullName, gender, birthday ='', email, phoneNumber, isDeleted = false, city, district, ward,street, password, address } = req.body;

    try {
        const newCustomer = new Customer({
            fullName,
            phoneNumber,
            email,
            city,
            district,
            ward,
            street,
            password,
            gender,
            isDeleted,
            address
        });

        const payload = await newCustomer.save();


        res.status(200).send({
            payload: payload,
            message: "Tạo thành công"
        });
    } catch (err) {
        console.log('««««« err »»»»»', err);
        res.status(400).send({
            err,
            message: "Tạo thất bại"
        });
    }
};

/** UPDATE */
const update = async function (req, res, next) {
    try {
      const { id } = req.params;
  
      const payload = await Customer.findOneAndUpdate(
        { _id: id, isDeleted: false },
        { ...req.body },
        { new: true },
      );
  
      if (payload) {
        return res.send(200, {
          payload,
          message: "Cập nhập thành công"
        });
      }
      return res.send(404, { message: "Không tìm thấy" });
    } catch (error) {
      res.send(400, {
        error,
        message: "Cập nhập không thành công"
      });
    }
  };


/** DELETE */
const hardDelete = async function (req, res, next) {

    try {
        const { id } = req.params;
        const payload = await Customer.findOneAndUpdate(
            {
                _id: id,
                isDeleted: false
            },
            { isDeleted: true },
            { new: true }
        );
        if (payload) {
            res.send(200, {
                payload: payload,
                message: "Xóa thành công"
            });
        }
        return res.send(200, 'Không tìm thấy tên nhà cung cấp')
    } catch (err) {
        res.send(400, {
            err,
            message: "Xóa thất bại"
        });
    }
};

module.exports = {
    getAll,
    search,
    getDetail,
    create,
    hardDelete,
    update
};