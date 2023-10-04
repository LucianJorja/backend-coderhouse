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
        },
        carts: {type: mongoose.Schema.Types.ObjectId,
            ref:'carts', 
            required: true
        },    
        lastActivity: {
            type: Date,
            default: Date.now,
        },
    })

    userSchema.pre('find', function () {
        this.populate('carts');
    });
    
export const userModel = mongoose.model('users', userSchema)