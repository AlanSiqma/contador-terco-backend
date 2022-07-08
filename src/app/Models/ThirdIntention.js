const mongoose = require('mongoose');

const thirdIntentionSchema = mongoose.Schema({
    descriptionIntention: String,
    prayedRosaries: [{ email: String, dataRezado: String }]
},
    {
        timestamps: true,
    });

module.exports = mongoose.model('ThirdIntention', thirdIntentionSchema);