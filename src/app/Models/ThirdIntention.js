const mongoose = require('mongoose');
const { bool, number, boolean } = require('yup');

const thirdIntentionSchema = mongoose.Schema({
    descriptionIntention: String,
    prayedRosaries: [{ email: String, data: String, status: Boolean, numero: Number }]
},
    {
        timestamps: true,
    });

module.exports = mongoose.model('ThirdIntention', thirdIntentionSchema);