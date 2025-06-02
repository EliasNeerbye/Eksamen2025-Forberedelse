const User = require('../../models/User');
const validateUser = require('../../utils/validateUser');
const { hashPassword } = require('../../utils/hashing')

module.exports = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const validation = validateUser({ username, email, password }); if (!validation.isValid) {
            return res.status(400).json({ msg: null, error: validation.errors[0], data: null });
        }

        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        }); if (existingUser) {
            return res.status(400).json({ msg: null, error: 'User with this email or username already exists.', data: null });
        }; const hashedPassword = await hashPassword(password);
        if (!hashedPassword) {
            return res.status(500).json({ msg: null, error: 'Error hashing password', data: null });
        } const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        const userResponse = {
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            role: newUser.role
        };

        res.status(201).json({ msg: 'User created successfully', error: null, data: userResponse });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ msg: null, error: 'Internal server error', data: null });
    }
}