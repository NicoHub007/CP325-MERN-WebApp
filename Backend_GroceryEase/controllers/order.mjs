import Order from '../models/order.mjs';
import User from '../models/user.mjs';

// Seed function to populate initial data
async function seed(req, res) {
    try {
        const user = await User.findOne(); // Look for an existing user
        if (!user) {
            return res.status(400).send('User not found');
        }

        await Order.create([
            {
                created_by: user._id,
                groceries: [
                    {
                        name: 'Apple',
                        category: 'Produce',
                        price: 2,
                        quantity: 3
                    },
                    {
                        name: 'Milk',
                        category: 'Dairy',
                        price: 1.5,
                        quantity: 2
                    }
                ],
                total_cost: 0, // Will be calculated automatically
                notes: 'Please deliver by noon'
            }
        ]);
        res.status(200).send('Success');
    } catch (err) {
        res.status(400).send(err.message);
    }
}

// Fetch all orders with populated user data
const getEntries = async (req, res) => {
    try {
        const foundEntries = await Order.find({}).populate('created_by', 'name email');
        res.status(200).json(foundEntries);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

// Add a new order
const addEntry = async (req, res) => {
    try {
        const createdEntry = await Order.create(req.body);
        res.status(200).json(createdEntry);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

// Edit an existing order by ID
const editEntry = async (req, res) => {
    try {
        const updatedEntry = await Order.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedEntry);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

// Delete an order by ID
const deleteEntry = async (req, res) => {
    try {
        const deletedEntry = await Order.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedEntry);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

export default { seed, getEntries, addEntry, deleteEntry, editEntry };
