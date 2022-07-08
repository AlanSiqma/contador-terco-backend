const ThirdIntention = require('../Models/ThirdIntention');
const yup = require('yup')

class ThirdIntentionController {


    get(req, res) {
        if (req.query.intention != '') {
            let intention = req.query.intention;

            ThirdIntention.find({ descriptionIntention: intention }, (err, found) => {
                if (!err) {
                    return res.status(200).json({
                        erro: false,
                        result: found
                    });
                } else {
                    return res.status(400).json({
                        erro: true,
                        result: "Erro ao retornar lista"
                    });
                }
            });
        }
    }
    async save(req, res) {

        var body = req.body;

        let schema = yup.object().shape({
            email: yup.string().required(),
            dataRezado: yup.string().required()
        });
        let validateSchema = await schema.isValid(body);

        if (req.query.intention != '') {
            let intention = req.query.intention;
            ThirdIntention.find({ descriptionIntention: intention }, (err, found) => {
                if (!err) {
                    if (found.length > 0 && validateSchema) {
                        if (validateSchema || body == '') {
                            found[0].prayedRosaries.push(body);
                            found[0].save();
                        }
                    } else if (found.length == 0) {

                        if (!validateSchema) {
                            body = [];
                        }

                        let thirdIntention = new ThirdIntention({
                            descriptionIntention: intention,
                            prayedRosaries: body
                        });
                        thirdIntention.save().then(() => console.log("One entry added"), (err) => console.log(err));
                    }
                    return res.status(200).json({
                        erro: false,
                        result: found
                    });
                } else {
                    return res.status(400).json({
                        erro: true,
                        result: "Erro ao retornar lista"
                    });
                }
            });


        } else {

            return res.status(400).json({
                erro: true,
                result: "intention é um campo obrigatorio"
            });
        }
    }
}

module.exports = new ThirdIntentionController();