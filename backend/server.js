import 'dotenv/config';  
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Import routes
import userRoute from './routes/user.route.js'; 
import categoryRoute from './routes/category.route.js'; 
import productsRoute from './routes/product.route.js'; 

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); 

// MongoDB connection
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.log(err));


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000 // 30 seconds
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("Error connecting to MongoDB:", err));


// Use routes
app.use("/api/user", userRoute);
app.use("/api/category", categoryRoute);
app.use("/api/products", productsRoute);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


// /// project2

// ///user name = nakrymut375
// // password = P04xF1d05fWfCmjT




