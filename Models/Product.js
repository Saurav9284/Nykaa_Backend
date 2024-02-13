const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50
  },
  picture: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true
  },
  category: {
    type: String,
    enum: ['makeup', 'skincare', 'haircare'],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel