const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const bcrypt = require('bcryptjs');


const customerSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "The customer's full name must not be left blank"],
      maxLength: [100, "The customer's full name must not exceed 100 characters"]
    },

    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },

    gender: {
      type: String || Number,
      default: ''
    },

    email: {
      type: String,
      validate: {
        validator: function (value) {
          const emailRegex =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
          return emailRegex.test(value);
        },
        message: `{value} is an invalid email`,
      },
      required: [true, "The customer's email must not be left blank"],
      unique: true,
    },

    phoneNumber: {
      type: String,
      validate: {
        validator: function (value) {
          const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
          return phoneRegex.test(value);
        },
        message: `{VALUE} is an invalid VN phone number`,
      },
      unique: true,
    },

    // birthday: {
    //   type: Date
    // },

    city: {
      type: String,
      maxLength: [100, "The customer's city must not exceed 100 characters"],
      required: [true, "The customer's city must not be left blank"],
    },

    district: {
      type: String,
      maxLength: [100, "The customer's district must not exceed 100 characters"],
      required: [true, "The customer's district must not be left blank"],
    },

    ward: {
      type: String,
      maxLength: [100, "The customer's ward must not exceed 100 characters"],
      required: [true, "The customer's ward must not be left blank"],
    },

    street: {
      type: String,
      maxLength: [500, "The customer's street must not exceed 100 characters"],
      unique: false,
    },

    password: {
      type: String,
      validate: {
        validator: function (value) {
          const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/gm
          return passRegex.test(value);
        },
        message: `{VALUE} is an invalid password`,
      },

    },
  },
  {
    versionKey: false,
    timestamps: true,
  }

);
customerSchema.virtual('address').get(function () {
  return `${this.street}, ${this.ward}, ${this.district}, ${this.city}`;
});

customerSchema.pre('save', async function (next) {
  try {
    // generate salt key
    const salt = await bcrypt.genSalt(10);

    // generate password = salt key + hash key
    const hashPass = await bcrypt.hash(this.password, salt);

    // override password
    this.password = hashPass;

    next();
  } catch (err) {
    next(err);
  }
});

customerSchema.methods.isValidPass = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    throw new Error(err);
  }
};

// Config
customerSchema.set('toJSON', { virtuals: true });
customerSchema.set('toObject', { virtuals: true });

customerSchema.plugin(mongooseLeanVirtuals);

const Customer = model("customers", customerSchema);

module.exports = Customer;
