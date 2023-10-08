const express = require('express');
const router = express.Router();
const Profile = require('../models/profile'); // Import your Profile model here

// Create a new profile
router.post('/add-profile', async (req, res) => {
  try {
    // Retrieve profile details from the request body
    const {
      firstName,
      lastName,
      photos,
      gender,
      dateOfBirth,
      age,
      religion,
      caste,
      subCaste,
      motherTongue,
      height,
      weight,
      phoneNumber,
      address,
      occupation,
      educationLevel,
      annualIncome,
      aboutMe,
      interests,
      familyInformation,
      user,
    } = req.body;

    const newProfile = new Profile({
      firstName,
      lastName,
      photos,
      gender,
      dateOfBirth,
      age,
      religion,
      caste,
      subCaste,
      motherTongue,
      height,
      weight,
      phoneNumber,
      address,
      occupation,
      educationLevel,
      annualIncome,
      aboutMe,
      interests,
      familyInformation,
      user,
    });

    // Save the profile document to the database
    const savedProfile = await newProfile.save();

    // Send a success response with the saved profile
    res.status(201).json({ message: 'Profile created successfully', profile: savedProfile });
  } catch (error) {
    // Handle errors and send an error response
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
