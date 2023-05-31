import mongoose from "mongoose";

const connectionString = 'mongodb+srv://admin:12344@cluster0.lywpi16.mongodb.net/';

try {
    await mongoose.connect(connectionString);
    console.log('Connected to MongoDB server');
} catch (error) {
    console.log(error);
}