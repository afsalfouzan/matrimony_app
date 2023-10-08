const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  firstName: String,
  lastName: String,
  photos: [String],
  gender: String,
  dateOfBirth: Date,
  age: Number,
  religion: String,
  caste: String,
  subCaste: String,
  motherTongue: String,
  height: String,
  weight: String,
  phoneNumber: String,
  address: String,
  occupation: String,
  educationLevel: String,
  annualIncome: Number,
  aboutMe: String,
  interests: [String],
  familyInformation: {
    fatherName: String,
    motherName: String,
    numberOfSiblings: Number,
    siblingsDetails: [String],
    familyBackground: String,
    familyContactNumber: String,
  },
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
