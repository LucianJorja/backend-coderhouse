    import mongoose from 'mongoose';

    const userSchema = new mongoose.Schema({
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        age: {
            type: Number,
            required: true,
            default: 0,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: 'user'
        },
        isGithub:{
            type: Boolean,
            required: true,
            default: false,
        }

    })

    export const userModel = mongoose.model('Users', userSchema)