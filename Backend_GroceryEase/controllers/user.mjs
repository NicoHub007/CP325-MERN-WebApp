import User from '../models/user.mjs';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

async function create(req, res) {
    try {
        // add the user to the database
        const createdUser = await User.create(req.body);
        // create a JWT token
        //token will be a string
        const token = createJWT(createdUser);
        res.status(200).json(token);
    } catch (err) {
        res.status(400).json(err);
    }
}
async function login(req, res) {
    try {
        // Query the database to find a user with the email provided
        const user = await User.findOne({ email: req.body.email });
        // If the email doesn't exist, throw an error
        if (!user) {
            throw new Error('User not found');
        }
        // Compare the password
        // 1st argument is from the credentials that the user typed in
        // 2nd argument is what is stored in the database
        const match = await bcrypt.compare(req.body.password, user.password);
        // If the passwords don't match, throw an error
        if (!match) {
            throw new Error('Invalid password');
        }
        // If everything is correct, create a JWT token
        const token = createJWT(user);
        res.json(token);
    } catch (err) {
        res.status(400).json({ err });
    }
}

async function getAllUsers(req, res) {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}


async function editUser(req, res) {
    try {
        const { id } = req.params; // Get user ID from the route
        const updates = req.body; // Get updates from request body

        const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedUser) throw new Error('User not found');

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

async function deleteUser(req, res) {
    try {
        const { id } = req.params; // Get user ID from the route

        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) throw new Error('User not found');

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// helper function to create a JWT token
// ================================== Helper Method/Function =================================
function createJWT(user) {
    return jwt.sign(
        // data payload
        { user },
        process.env.SECRET,
        { expiresIn: '24h' }, // expires in 24 hours
    )
}
export default { create, login, getAllUsers, editUser, deleteUser };

