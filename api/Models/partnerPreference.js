const mongoose = require('mongoose');

const partnerPreferenceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  ageRange: String,
  heightRange: String,
  educationalLevel: String,
  occupation: String,
  religion: String,
  caste: String,
  maritalStatus: String,
  preferences: String,
});

const PartnerPreference = mongoose.model('PartnerPreference', partnerPreferenceSchema);

module.exports = PartnerPreference;
