import mongoose from 'mongoose';

// Define the schema for the order model
const orderSchema = mongoose.Schema({
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    groceries: [{
        name: {
            type: String,
            required: true
        },
        category: {
            type: String,
            enum: ['Produce', 'Dairy', 'Grains', 'Meat', 'Spice'],
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    total_cost: {
        type: Number,
        required: true,
        default: 0
    },
    notes: String
}, { timestamps: true });

// Pre-save hook to calculate the total cost before saving the order
orderSchema.pre('save', function (next) {
    this.total_cost = this.groceries.reduce((total, grocery) => {
        return total + (grocery.price * grocery.quantity);
    }, 0);
    next();
});

// Export the model
const Order = mongoose.model('Order', orderSchema);
export default Order;
