const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./config/db'); // Database connection
const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
    const { email, password, role } = req.body; // Role can be 'doctor' or 'patient'
    if (!email || !password || !role) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert into database
        const query = 'INSERT INTO users (email, password, role) VALUES (?, ?, ?)';
        await db.query(query, [email, hashedPassword, role]);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user', error });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Check if user exists
        const query = 'SELECT * FROM users WHERE email = ?';
        const [user] = await db.query(query, [email]);

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate a token
        const token = jwt.sign({ id: user.id, role: user.role }, 'secret_key', { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Error logging in', error });
    }
});

module.exports = router;
