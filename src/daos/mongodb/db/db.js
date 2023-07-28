import mongoose from "mongoose";
import config from '../../../../config.js';

const connectionString = config.MONGO_URL;

try {
    await mongoose.connect(connectionString);
    console.log('Connected to MongoDB server');
} catch (error) {
    console.log(error);
}