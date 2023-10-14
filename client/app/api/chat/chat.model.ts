import mongoose, { Document, Model, Schema } from 'mongoose';

// Interface for Chat document
interface IChat {
  userId: mongoose.Types.ObjectId;
  data: any[];
  messageType: "recommend" | "location" | "other";
}

// Interface for Chat document including mongoose.Document
interface IChatDocument extends IChat, Document {}

const ChatSchema = new Schema<IChatDocument>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    data: [Schema.Types.Mixed], // Allowing any type of data in the data array
    type: {
      type: String,
      enum: ['recommend', 'location', 'other'],
      required: true
    },
  },
  {
    timestamps: true, // Adding timestamps
  }
);

// Singleton pattern to avoid OverwriteModelError
let ChatModel: Model<IChatDocument> | null = null;

try {
  // Trying to get the existing model
  ChatModel = mongoose.model('Chat');
} catch {
  // Model doesn't exist, making a new one
  ChatModel = mongoose.model<IChatDocument>('Chat', ChatSchema);
}

export default ChatModel;
