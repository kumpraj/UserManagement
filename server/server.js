const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const User = require('./models/User');
const Sectors = require('./models/Sectors');
require('dotenv').config();

const app = express();

// using middlewares
app.use(cors());
app.use(bodyParser.json());

//  connect to mongodb
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err))


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`))



// post route to submit the form data
app.post('/submit', async (req, res) => {

    const { name, sectors, agreedToTerms} = req.body;

    if(!name || !sectors || agreedToTerms === undefined){
        res.status(400).json({ message: "All fields are required"});
    }

    try {
        const newUser = new User({ name, sectors, agreedToTerms});
        await newUser.save();
        res.status(201).json({
            message: "User saved successfully",
             newUser
            });

    } catch (error) {
        res.status(500).json({ message: error.message});
    }
})

// update the user
app.put('/user/:id', async (req, res) => {
    const { name, sectors, agreedToTerms } = req.body;

    // Optional: Add validation for the input data
    if (!name || !sectors || agreedToTerms === undefined) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { name, sectors, agreedToTerms },
            { new: true } // This option returns the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            message: "User updated successfully",
            updatedUser
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



//  get route to fetch a user data
app.get('/user/:id', async (req, res) => {

    try {
        const user = await User.findById(req.params.id);

        if(!user){
            res.status(404).json({ message: "User not found"})
        }
        res.json({
            message: "User found successfully",
            user
        });

    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});


//  get route to fetch all sectors
app.get('/sectors', async (req, res) => {
    try {
        const sectors = await Sectors.find({});
        res.status(201).json({ message: "Sectors fetched successfully", sectors});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

//  get route to fetch all users
app.get('/getUsers', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(201).json({ users });

    } catch (error) {
        res.status(500).json({message: error.message});
    }
})