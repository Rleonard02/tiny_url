import express from "express";
import connectDB from "./config/db";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.get("/", (req,res) => {
    res.send("URL Shortener Backend");
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
});