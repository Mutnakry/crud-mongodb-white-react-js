// require('dotenv').config();  // Load environment variables

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();
// const PORT = 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MongoDB connection using the environment variable
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.log(err));

// // Sample route
// app.get('/', (req, res) => {
//   res.send('Hello from backend');
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });




// /// project2

// ///user name = nakrymut375
// // password = P04xF1d05fWfCmjT


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // To parse incoming JSON requests

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Define the User schema
const UserSchema = new mongoose.Schema({
  names: String,
  email: String,
  age: Number,
});

const UserModel = mongoose.model('tblusers', UserSchema);

// POST route to create a user
app.post('/users', (req, res) => {
  const { names, email, age } = req.body;

  // Create a new user using the data from the request body
  const newUser = new UserModel({ names, email, age });

  // Save the user to the database
  newUser.save()
    .then((user) => res.status(201).json(user))  // Respond with the created user
    .catch((err) => res.status(400).json({ error: err.message }));  // Handle errors
});

// Sample route
app.get('/', (req, res) => {
  res.send('Hello from backend');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
