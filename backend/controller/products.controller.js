import Product from '../modals/Products.js';  // Adjust the import path
import Category from '../modals/Categorys.js';  // Adjust the import path

export const createProduct = async (req, res) => {
    try {
        const { names, price, sale_price, Image, detail, category_id } = req.body;

        const category = await Category.findById(category_id);
        if (!category) {
            return res.status(400).json({ message: "Category not found" });
        }

        const newProduct = new Product({
            names,
            price,
            sale_price,
            Image,
            detail,
            category_id
        });

        // Save the product to the database
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};



export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;  // Get the product ID from the request params
        const { names, price, sale_price, Image, detail, category_id } = req.body;

        // Check if the category exists
        const category = await Category.findById(category_id);
        if (!category) {
            return res.status(400).json({ message: "Category not found" });
        }

        // Find the product by ID and update it
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { names, price, sale_price, Image, detail, category_id },
            { new: true }  // This option returns the updated document
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};



export const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedCategory = await Product.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const getProductWithCategory = async (req, res) => {
    try {
        const productId = req.params.id;

        // Find the product and populate the category details
        const product = await Product.findById(productId).populate('category_id');
        
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error("Error retrieving product:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};



export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category_id');
        if (!products || products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }

        res.status(200).json(products);
    } catch (error) {
        console.error("Error retrieving products:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};