const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');

exports.googleLogin = async (req, res) => {
    const { email, password } = req.body;

    if (email !== process.env.ALLOWED_EMAIL || password !== process.env.ALLOWED_EMAIL_PASSWORD) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        let admin = await Admin.findOne({ email });
        if (!admin) {
            admin = new Admin({ email, password });
            await admin.save();
        }

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
