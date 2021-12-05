const mongoose = require('mongoose');

const { Schema } = mongoose;

const mtgCardSchema = new Schema({
  name: {
    type: String,
   
  },
  cmc: {
    type: Number,
  },
  colors:{
    type: [String]
  },
  colorIdentity:{
    type: [String]
  },
  type:{
    type: String
  },
  types:{
    type: [String]
  },
  subtypes:{
    type: [String]
  },
  set:{
    type: String
  },
  setName:{
    type: String
  },
  number:{
    type: String
  },
  imageUrl:{
    type: String
  },
  rarity:{
    type: String
  },
  mvId:{
    type: String
  },
  quantity: {
    type: Number
  },
  id: {
    type: String
  }
  
});

// const MTGCard = mongoose.model('MTGCard', mtgCardSchema);

module.exports = mtgCardSchema;
