import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Global configuration
const mongoURI = process.env.ATLAS_URI;
const db = mongoose.connection;

// connect to mongo
mongoose.connect(mongoURI);
mongoose.connection.once('open', () => {
    console.log('MongoDB Connected...');
})

export default db;