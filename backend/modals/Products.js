import mongoose from 'mongoose';

// Define Product Schema
const ProductSchema = new mongoose.Schema({
  names: { type: String, required: true },
  category_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category',  
    required: false 
  },
  price: { type: Number, required: false },
  sale_price: { type: Number, required: false },
  Image: { type: String, required: false },
  detail: { type: String, required: true, unique: true },
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
});

// Create Product model
const Product = mongoose.model('Product', ProductSchema);
export default Product;
