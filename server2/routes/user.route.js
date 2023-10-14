const express = require('express');
const bcrypt = require('bcrypt');
const { UserModel } = require('../models/user.model'); // Updated import statement
const mongoose = require('mongoose');

const userRouter = express.Router();

// Login route
userRouter.post('/login', async (req, res) => {
  try {
    const body = req.body;

    if (!body.name) {
      return res.status(422).json({ message: 'Please provide your name' });
    }

    if (!body.email) {
      return res.status(422).json({ message: 'Please provide your email' });
    } else if (!body.password || body.password.length < 4) {
      return res.status(422).json({ message: 'Please provide the password you used while registering...' });
    } else {
      const userExists = await UserModel.findOne({ email: body.email }); // Updated to use UserModel

      if (!userExists) {
        return res.status(404).json({ message: 'No user exists with this email, please register' });
      } else {
        const mongoPassword = userExists.password;
        const isPasswordValid = await bcrypt.compare(body.password, mongoPassword);

        if (!isPasswordValid) {
          return res.status(422).json({ message: 'Wrong password' });
        } else {
          return res.status(200).json({ message: 'OK', token: userExists._id });
        }
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error', error });
  }
});

// Register route
userRouter.post('/register', async (req, res) => {
  try {
    const body = req.body;

    if (!body.name) {
      return res.status(422).json({ message: 'Please provide your name' });
    }

    if (!body.email) {
      return res.status(422).json({ message: 'Please provide your email' });
    } else if (!body.password || body.password.length < 4) {
      return res.status(422).json({ message: 'Please provide a strong password' });
    } else {
      const userExists = await UserModel.findOne({ email: body.email }); // Updated to use UserModel

      if (userExists) {
        return res.status(409).json({ message: 'User already exists with this email, please login' });
      } else {
        // Save the new user to the database
        const newUser = new UserModel(body); // Updated to use UserModel
        const output = await newUser.save();

        return res.status(200).json({ message: 'OK', data: output });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error', error });
  }
});


userRouter.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Ensure the userId is a valid ObjectId
    if (!userId || !userId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }
 
    // Find the user and their chats using aggregation
    const userData = await UserModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(userId) } }, // Find the user with the provided ID
      {
        $lookup: {
          from: 'chats', // Use the actual MongoDB collection name for ChatModel
          localField: '_id',
          foreignField: 'userId',
          as: 'chats',
        },
      },
      {
        $project: {
          name: 1,
          email: 1,
          profilePic: 1,
          chats: '$chats._id', // Only return the _id of each chat
        },
      },
    ]);

    // Check if a user was found
    if (!userData || userData.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the found user data
    res.json({ data: userData[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});





module.exports = {userRouter};
