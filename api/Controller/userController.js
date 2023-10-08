const User = require('../Models/users'); // Import the User model
const { jwtTokenGeneration } = require('../middlewares/authMiddleware')
const bcrypt = require('bcrypt');

// Controller function to create a new user
exports.createUser = async (req, res) => {
    try {

        const { email, password, confirmPassword } = req.body;

        if (!email || !password || !confirmPassword) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'Email is already registered' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Password and confirm password do not match' });
        }
        const saltRounds = 10; 
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log("hashed password")

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword, // Store the hashed password in the database
        });

        // Save the user to the database
        await newUser.save().then((user) => {
            res.status(200).json({
                message: "User added successfully", user: user
            })
        });

    } catch (error) {
        // Handle errors and send an error response
        res.status(400).send(error);
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Find the user by email in the database
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare the provided password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate a JWT token for authentication
        const token = await jwtTokenGeneration(user.email);

        console.log(user,"user")

        // Send a success response with the token
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.log(error,"error")
        // Handle errors and send an error response
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller function to get all users
exports.getAllUsers = async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await User.find();

        // Send a success response with the list of users
        res.status(200).send(users);
    } catch (error) {
        // Handle errors and send an error response
        res.status(500).send(error);
    }
};

exports.getUserByEmail = async (req, res) => {
    try {
        const email = req.params.email; // Retrieve the email parameter from the URL

        // Find the user by email in the database
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Send a success response with the user's details
        res.status(200).json({ user });
    } catch (error) {
        // Handle errors and send an error response
        res.status(500).json({ error: 'Internal server error' });
    }
};

