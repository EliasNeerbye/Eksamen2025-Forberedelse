const User = require('../../models/User');
const validateUser = require('../../utils/validateUser');
const { hashPassword } = require('../../utils/hashing')

module.exports = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const validation = validateUser({ username, email, password });

        if (!validation.isValid) {
            return res.status(400).json({ msg: null, error: validation.errors[0], newUser: null });
        }

        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            return res.status(400).json({ msg: null, error: 'User with this email or username already exists.', newUser: null });
        };

        const hashedPassword = await hashPassword(password);
        if (!hashedPassword) {
            return res.status(500).json({ msg: null, error: 'Error hashing password', newUser: null });
        }

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ msg: 'User created successfully', error: null, newUser });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ msg: null, error: 'Internal server error', newUser: null });
    }
}