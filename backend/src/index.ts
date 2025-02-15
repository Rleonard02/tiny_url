import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";  // your DB connection file
import router from "./routes/url";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to database
connectDB();

// Hook up the router on /api
app.use("/api", router);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
