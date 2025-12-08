
const mongoose = require('mongoose');

const InnerProductSchema = new mongoose.Schema({
  productid: { type: Number, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  name: { type: String, required: true },
  instock: { type: Boolean, default: true },
});

const ProductSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  product: { type: InnerProductSchema, required: true },
});

module.exports = mongoose.model('Product', ProductSchema);
