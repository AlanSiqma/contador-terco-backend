const ThirdIntention = require('../Models/ThirdIntention');
const yup = require('yup');
const _ = require('lodash');
const { response } = require('express');
class ThirdIntentionController {

    get(req, res) {
        var respose = { erro: true, result: [] };
        var status = 400;
        if (req.query.intention != '') {
            let intention = req.query.intention;
            ThirdIntention.find({ descriptionIntention: intention }, (err, found) => {
                if (!err) {
                    respose.result = found;
                    respose.erro = false;
                    return res.status(200).json(respose);
                } else {
                    respose.result = "Erro ao retornar lista";
                    return res.status(status).json(respose);
                }
            });
        } else {
            respose.result = "intention é um campo obrigatorio";
            return res.status(status).json(respose);
        }
    }

    async save(req, res) {
        var respose = { erro: true, result: [] };
        var status = 400;
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
                                var filterPrayed = _.filter(found[0].prayedRosaries,
                                    function (item) {
                                        return item.email == body.email &&
                                            item.numero == body.numero
                                    }
                                )
                                if (filterPrayed.length == 0) {
                                    found[0].prayedRosaries.push(body);
                                    found[0].save();
                                } else {
                                    filterPrayed[0].status = body.status;
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
                    respose.erro = false;
                    response.result = found;
                    return res.status(200).json(respose);
                } else {
                    respose.result = "Erro ao retornar lista";
                    return res.status(status).json(respose);
                }
            });
        } else {
            respose.result = "intention é um campo obrigatorio";
            return res.status(status).json(respose);
        }
    }
}

module.exports = new ThirdIntentionController();