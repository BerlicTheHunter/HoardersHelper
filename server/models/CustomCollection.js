const mongoose = require('mongoose');

const { Schema } = mongoose;

const customSchema = new Schema({
  creationDate: {
    type: Date,
    default: Date.now
  },
  customItem: [
    {
      type: Schema.Types.ObjectId,
      ref: 'CustomItem'
    }
  ]
});

const CustomCollection = mongoose.model('CustomCollection', customSchema);

module.exports = CustomCollection;
