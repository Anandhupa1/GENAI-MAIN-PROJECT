import mongoose, { Document, Model } from 'mongoose';

interface IRecipe {
  name: string;
  description: string;
  imageUrl: string;
  expense: number;
  ingredients:string;
  type:"veg"|"non-veg";
  instructions:string;
}

interface IRecipeDocument extends IRecipe, Document {}

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  expense: { type: Number, required: true },
  ingredients:{type:String},
  type: { type: String, enum: ['veg', 'non-veg'], required: true },
  instructions:{type:String,required:true}
});

// Singleton pattern to avoid OverwriteModelError
let RecipeModel: Model<IRecipeDocument> | null = null;

try {
   // Trying to get the existing model
  RecipeModel = mongoose.model('Recipe');
} catch {
  // Model doesn't exist, making a new one
  RecipeModel = mongoose.model<IRecipeDocument>('Recipe', recipeSchema);
}

export default RecipeModel;
