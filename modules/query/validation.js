const yup = require('yup');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
  getProductSchema: yup.object({
    params: yup.object({
      id: yup.string().test('validationID', 'Invalid Id', (value) => {
        return ObjectId.isValid(value);
      }),
    }),
  }),
};