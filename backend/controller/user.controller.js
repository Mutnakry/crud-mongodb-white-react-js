// controllers/user.controller.js
import User from '../modals/User.js';
import mongoose from 'mongoose';

export const create = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if the user already exists
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User already exists." });
        }

        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const getuser = async (req, res) => {
    try {
        const users = await User.find();  // Fetch all users
        if (users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }
        res.status(200).json(users);  // Return all users
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


// export const getusersingle = async (req, res) => {
//     try {
//         const { id } = req.params;

//         // Validate the ID format (ensure it's a valid MongoDB ObjectId)
//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({ message: "Invalid user ID format" });
//         }

//         // Find the user by ID
//         const user = await User.findById(id);

//         // If user doesn't exist, return a 404 error
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // Return the user data if found
//         res.status(200).json(user);
//     } catch (error) {
//         console.error("Error fetching user:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// };


// Get a single user by ID
export const getusersingle = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the user by ID
        const user = await User.findById(id);
        
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const updateuser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updateData = req.body;

        // Find user by ID and update
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(updatedUser);  // Send the updated user as response
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};



// export const deleteuser = async (req, res) => {
//     try {
//         const userId = req.params.id;  // Get the user ID from the URL parameters

//         // Check if the ID is valid (MongoDB ObjectId format)
//         if (!mongoose.Types.ObjectId.isValid(userId)) {
//             return res.status(400).json({ message: "Invalid user ID format" });
//         }

//         // Find the user by ID and delete them
//         const deletedUser = await User.findByIdAndDelete(userId);

//         // If no user is found, return a 404 error
//         if (!deletedUser) {
//             return res.status(404).json({ message: "User not found" });
//         }
//         res.status(200).json({ message: "User deleted successfully" });
//     } catch (error) {
//         console.error("Error deleting user:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// };


export const deleteuser = async (req, res) => {
    try {
      const userId = req.params.id;
  
      // Check if the ID is valid (MongoDB ObjectId format)
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user ID format" });
      }
  
      // Find the user by ID and delete them
      const deletedUser = await User.findByIdAndDelete(userId);
  
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };