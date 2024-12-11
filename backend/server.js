// server.js
import 'dotenv/config';  // Load environment variables
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Import routes
import userRoute from './routes/user.route.js';  // Ensure the path and file extension are correct

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); 

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Use the user route
app.use("/api/user", userRoute);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



/// project2

///user name = nakrymut375
// password = P04xF1d05fWfCmjT