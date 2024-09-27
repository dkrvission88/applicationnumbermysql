// models/user.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('user', 'admin', 'superadmin'),
    defaultValue: 'user',
  },
  applicationNumber: {
    type: DataTypes.STRING, // Application number will be a string
    allowNull: true,
    unique: true, // Ensure the application number is unique
  },
}, {
  hooks: {
    beforeCreate: async (user) => {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
  },
});

module.exports = User;


// ALTER TABLE Users ADD COLUMN applicationNumber VARCHAR(255) UNIQUE;


// POST /api/users/register
// Content-Type: application/json
// {
//   "name": "John Doe",
//   "email": "john@example.com",
//   "password": "password123"
// }

// output 
// {
//     "message": "User registered successfully",
//     "applicationNumber": "APP-20230920-1-a1b2c3"
//   }


// Summary of the Workflow
//****  User Registration: When a user registers, they are created in the database without the application number.
// Application Number Generation: After registration, the application number is generated based on the user’s ID, the registration date, and a random UUID part to ensure uniqueness.
// Save Application Number: The application number is then saved to the User model.
// This structure ensures that every user has a unique application number that can be used for future processes like application tracking, verification, etc.
 

// Approach
// 1.  Generate Application Number: After a user is successfully registered, we generate a unique application number.
//2.  Format: The application number could be based on:
//       User ID or another field like email or phone.
//      Timestamp or Date of registration.
//      A random alphanumeric string.
// 3. Store Application Number: Store this in the database in the User model, which gets populated after user registration.
// Steps to Implement
// Step 1: Modify the User Model to Include an applicationNumber Field

