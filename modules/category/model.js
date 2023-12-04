const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const categorySchema = new Schema(
    {
        name: { 
            type: String, 
            required: [true,"The category's name must not be left blank"], 
            maxLength: [50,"The category's name must not exceed 50 characters"],
            unique:[true, "The category's name must be unique"]
        },
        description: { 
            type: String, 
            maxLength: [500,"The category's name must not exceed 500 characters"] 
        },
        isDeleted: { 
            type: Boolean, 
            required: true, 
            default: false 
        }
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

const Category = model('categories', categorySchema);

module.exports = Category;