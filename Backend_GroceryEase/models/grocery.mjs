import mongoose from 'mongoose'

const grocerySchema = new mongoose.Schema({
    user: String,
    name: {
        type: String,
        required: true,
        unique: true,
        uppercase: true
    },
    category: {
        type: String,
        enum:['Produce', 'Dairy', 'Grains', 'Meat', 'Sprice'],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
},{timestamps: true});


export default mongoose.model('Grocery', grocerySchema);
