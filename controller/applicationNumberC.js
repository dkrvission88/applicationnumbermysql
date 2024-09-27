const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid'); // To generate random strings
const moment = require('moment');

// Utility function to generate a unique application number
const generateApplicationNumber = (userId) => {
  const timestamp = moment().format('YYYYMMDD'); // E.g., 20230920 for the date
  const randomPart = uuidv4().split('-')[0];    // Random part from UUID
  return `APP-${timestamp}-${userId}-${randomPart}`; // Example: APP-20230920-1-a1b2c3
};

// Register user and create application number
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Create user first
    const user = await User.create({ name, email, password });

    // Generate and update the application number
    const applicationNumber = generateApplicationNumber(user.id);
    user.applicationNumber = applicationNumber;

    // Save the user with the application number
    await user.save();

    res.status(201).json({ message: 'User registered successfully', applicationNumber: user.applicationNumber });
  } catch (err) {
    res.status(400).json({ error: 'Error registering user', details: err });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ error: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid email or password' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err });
  }
};
