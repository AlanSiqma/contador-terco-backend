require("dotenv").config(); // environment variable

// require packages
const express = require("express");
const mongoose = require("mongoose");
const _ = require('lodash');
const bodyParser = require('body-parser');

// initialise express
const app = express();
app.use(bodyParser.json({ type: 'application/*+json' }))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//  mondodb connect
mongoose
    .connect(
        process.env.MONGODB_URI,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));


const thirdIntentionSchema = new mongoose.Schema({
    descriptionIntention: String,
    prayedRosaries: [{ email: String, dataRezado: String }]
});


const ThirdIntention = mongoose.model('ThirdIntention', thirdIntentionSchema);

// const thirdIntention = new ThirdIntention({
//     descriptionIntention: 'Missa Tridentina Osasco',
//     prayedRosaries: [{ email: 'alansiqma@gmail.com', dataRezado: '07/07/2022' }, { email: 'alansiqma@gmail.com', dataRezado: '08/07/2022' }]
// });



// thirdIntention.save().then(() => console.log("One entry added"), (err) => console.log(err));

app.get('/', (req, res) => {
    if (req.query.intention != '') {
        let intention = req.query.intention;

        ThirdIntention.find({ descriptionIntention: intention }, (err, found) => {
            if (!err) {
                res.send(found);
            } else {
                console.log(err);
                res.send("Some error occured!")
            }
        });
    }
});

// POST method route
app.post('/', function (req, res) {
    if (req.query.intention != '') {
        let intention = req.query.intention;
        var body = req.body;
        ThirdIntention.find({ descriptionIntention: intention }, (err, found) => {

            if (!err) {
                if (found.length > 0) {
                    found[0].prayedRosaries.push(body);
                    found[0].save();
                    res.send("foi");
                } else {
                    let thirdIntention = new ThirdIntention({
                        descriptionIntention: intention,
                        prayedRosaries: [req.body]
                    });
                    thirdIntention.save().then(() => console.log("One entry added"), (err) => console.log(err));
                    res.send("foi");
                }

            } else {
                console.log(err);
                res.send("Some error occured!")
            }
        });
    }
});

// Server listen
app.listen(3000, () => console.log("Server listening to port 3000"));