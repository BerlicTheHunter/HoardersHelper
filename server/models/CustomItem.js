const mongoose = require('mongoose');

const { Schema } = mongoose;

const itemSchema = new Schema({
  itemName: {
    type: String,
    required: true,
  },
  category:{
    type: String
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  value: {
    type: Number,
  },
  quantity: {
    type: Number,
    min: 0,
    default: 0
  },
});

const CustomItem = mongoose.model('CustomItem', itemSchema);

// module.exports = CustomItem;
