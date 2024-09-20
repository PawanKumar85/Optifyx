import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/route.js"; // Ensure route.js is correctly set up

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// Routes
app.use('/api/v2/portfolio', router); // Ensure 'router' points to a valid file

// Base route for testing the API
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Node.js API!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
