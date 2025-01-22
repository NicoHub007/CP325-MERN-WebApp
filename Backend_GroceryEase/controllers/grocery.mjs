import Grocery from "../models/grocery.mjs";

async function seed(req, res) {
  
    try {
        await Grocery.create([
            {
                name: 'apple',
                category: 'Produce',
                price:  4.99,
                quantity: 23,
                description: '3lbs golden apples bag'
            },
            {
                name: 'plantains',
                category: 'Produce',
                price: 7.99,
                quantity: 50,
                description: '20lbs plantain box'
            },
        ]);
        res.send("success").status(200);
    } catch (err) {
        res.send(err).status(400);
    }
}

const getEntries = async (req, res) => {
    try {
        const foundEntries = await Grocery.find({});
        res.status(200).json(foundEntries);
    } catch (err) {
        res.send(err).status(400);
    }
};

const addEntry = async (req, res) => {
    console.log(req.body);
    try {
        const createdEntry = await Grocery.create(req.body);
        console.log(createdEntry);
        res.status(200).json(createdEntry);
    } catch (err) {
        res.send(err).status(400);
    }
};

const editEntry = async (req, res) => {
    try {
        const updatedEntry = await Grocery.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedEntry);
    } catch (err) {
        res.send(err).status(400);
    }
};

const deleteEntry = async (req, res) => {
    try {
        const deletedEntry = await Grocery.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedEntry);
    } catch (err) {
        res.send(err).status(400);
    }
};

export default { seed, getEntries, addEntry, deleteEntry, editEntry };