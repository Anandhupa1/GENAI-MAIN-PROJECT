const mongoose = require('mongoose');

// Interface for Chat document
const chatSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    data: [],
    type: {
      type: String,
      enum: ['recommend', 'location', 'other'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);



  ChatModel = mongoose.model('Chat', chatSchema);


module.exports = { ChatModel};
