const mongoose = require('mongoose');

const { Schema } = mongoose;

const mtgSchema = new Schema({
  mtgDate: {
    type: Date,
    default: Date.now
  },
  mtgCards: [
    {
      type: Schema.Types.ObjectId,
      ref: 'MTGCard'
    }
  ]
});

const MTG = mongoose.model('MTG', mtgSchema);

module.exports = MTG;
