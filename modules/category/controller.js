const { default: mongoose } = require('mongoose');

const { fuzzySearch } = require('../../utils');

const Category = require('./model');

//------------------------------------------GET-----------------------------------------------//

const getAll = async (req, res, next) => {
    try {
        const payload = await Category.find({
            isDeleted: false
        });
        res.send(200, {
            payload: payload,
            message: "Tạo thành công"
        });
    } catch (error) {
        res.send(400, {
            error,
            message: "Tạo thất bại"
        });
    }
};

//get detail
const getDetail = async function (req, res, next) {

    try {
        const { id } = req.params;

        const payload = await Category.findOne({
            _id: id,
            isDeleted: false,
        });

        res.send(200, {
            payload: payload,
            message: "Tạo thành công"
        });
    } catch (error) {
        res.send(400, {
            error,
            message: "Tạo thất bại"
        });
    }
};

//-----------------------------------------------SEARCH--------------------------------------------//

const search = async function (req, res, next) {
    try {
        const { name } = req.query;

        const conditionFind =  {isDeleted: false};

        if(name){
            conditionFind.name = fuzzySearch(name)
        }

        const payload = await Category.find(conditionFind);

        res.send(200, {
            payload: payload,
            message: "Tim kiếm tên thành công"
        });
    } catch (error) {
        res.send(400, {
            error,
            message: "Tim kiếm tên thất bại"
        });
    }
};

/** ------------------------------------------CREATE--------------------------------------------- */

const create = async function (req, res, next) {
    const { name, isDeleted, description } = req.body;

    try {
        const newCategory = new Category({
            name,
            description,
        });

        const payload = await newCategory.save();

        res.send(200, {
            payload: payload,
            message: "Tạo thành công"
        });
    } catch (err) {
        res.send(400, {
            err,
            message: "Tạo thất bại"
        });
    }
};

module.exports = {
    getAll,
    getDetail,
    search,
    create,
};