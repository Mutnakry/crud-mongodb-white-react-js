import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  names: { type: String, required: true },
  detail: { type: String, required: true, unique: true },
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
});

const Category = mongoose.model('Category', CategorySchema);  // Capitalized 'Category'
export default Category;
