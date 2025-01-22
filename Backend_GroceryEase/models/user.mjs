import mongoose from 'mongoose';
import bcrypt from "bcrypt";

const SALT_ROUNDS = 6;

const userSchema = new mongoose.Schema({
    role:{
        type: String,
        enum: ['admin', 'employee'],
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },
    is_active: {
        type: Boolean,
        default: true
    }
},{ timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            delete ret.password;
            return ret;
        }
    }
})

userSchema.pre('save', async function (next) {
    // 'this' is the user doc 
    if (!this.isModified('password')) return next();
    // if the password HAS changed, we need to update the password with the computed hash
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    return next();
})

const User = mongoose.model('User', userSchema);

export default User;
 