const ThirdIntention = require('../Models/ThirdIntention');
const yup = require('yup');
const _ = require('lodash');
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
        } else {

            return res.status(400).json({
                erro: true,
                result: "intention é um campo obrigatorio"
            });
        }
    }
    async save(req, res) {

        var body = req.body;

        let schema = yup.object().shape({
            email: yup.string().required(),
            data: yup.string().required(),
            status: yup.bool().required(),
            numero: yup.number().required()
        });
        let validateSchema = await schema.isValid(body);

        if (req.query.intention != '') {
            let intention = req.query.intention;
            ThirdIntention.find({ descriptionIntention: intention }, (err, found) => {
                if (!err) {
                    if (found.length > 0 && validateSchema) {
                        if (validateSchema || body == '') {
                            if (found[0].prayedRosaries.length == 0) {
                                found[0].prayedRosaries.push(body);
                                found[0].save();
                            } else {
                                console.log(found[0].prayedRosaries);

                                var teste = _.filter(found[0].prayedRosaries, function (item) {
                                    return item.email == body.email &&
                                        item.numero == body.numero
                                })
                                if (teste.length == 0) {
                                    found[0].prayedRosaries.push(body);
                                    found[0].save();
                                } else {

                                    teste[0].status = body.status;
                                    found[0].save();
                                }
                            }

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