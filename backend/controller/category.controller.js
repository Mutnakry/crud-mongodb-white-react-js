import Category from '../modals/Categorys.js';  // Correct path if using 'modals'

export const create = async (req, res) => {
    try {
        const { names, detail } = req.body;

        // Check if the category already exists
        const categoryExist = await Category.findOne({ names });
        if (categoryExist) {
            return res.status(400).json({ message: "Category already exists." });
        }

        // Create a new category
        const newCategory = new Category({ names, detail });
        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        console.error("Error creating category:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const updateCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;  // Use a meaningful name for the ID variable
        const updateData = req.body;

        // Find category by ID and update
        const updatedCategory = await Category.findByIdAndUpdate(categoryId, updateData, { new: true });

        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });  // Changed 'User' to 'Category'
        }

        res.status(200).json(updatedCategory);  // Send the updated category as response (fixed variable name)
    } catch (error) {
        console.error("Error updating category:", error);  // Updated log message
        res.status(500).json({ error: "Internal server error" });
    }
};


export const deleteCategory = async (req, res) => {
    try {
        const id = req.params.id;  // Get category ID from URL parameter

        // Find the category by ID and delete it
        const deletedCategory = await Category.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found" });  // If category is not found
        }

        res.status(200).json({ message: "Category deleted successfully" });  // Success response
    } catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getCategory = async (req, res) => {
    try {
        const categories = await Category.find(); // Retrieve categories, not products
        if (!categories || categories.length === 0) {
            return res.status(404).json({ message: "No categories found" }); // Return appropriate message
        }

        res.status(200).json(categories); // Send categories as response
    } catch (error) {
        console.error("Error retrieving categories:", error); // More specific error message
        res.status(500).json({ error: "Internal server error" });
    }
};


