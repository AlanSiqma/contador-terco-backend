const ThirdIntention = require('../Models/ThirdIntention');
const ThirdIntentionService = require('../Services/ThirdIntentionService');

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

        if (ThirdIntentionService.intentionInvalid(req)) {
            respose.result = "intention é um campo obrigatorio";
            return res.status(status).json(respose);
        }

        let intention = req.query.intention;
        let validateSchema = await ThirdIntentionService.schemaIsValid(body);

        if (!validateSchema) {
            body = [];
        }

        ThirdIntention.find({ descriptionIntention: intention }, (err, found) => {
            if (err) {
                respose.result = "Erro ao retornar lista";
                return res.status(status).json(respose);
            }

            if (found.length == 0) {
                let thirdIntention = new ThirdIntention({
                    descriptionIntention: intention,
                    prayedRosaries: body
                });
                thirdIntention.save();
            } else if (found.length > 0 && validateSchema) {
                var thirdIntention = found[0];

                if (thirdIntention.prayedRosaries.length == 0) {
                    thirdIntention.prayedRosaries.push(body);
                } else {
                    var filterPrayed = _.filter(thirdIntention.prayedRosaries,
                        function (item) {
                            return item.email == body.email &&
                                item.numero == body.numero
                        }
                    );
                    if (filterPrayed.length == 0) {
                        thirdIntention.prayedRosaries.push(body);
                    } else {
                        var filterPrayedFirst = filterPrayed[0];
                        filterPrayedFirst.status = body.status;
                    }
                }
                thirdIntention.save();
            }
            respose.erro = false;
            response.result = found;
            return res.status(200).json(respose);
        });
    }
}
module.exports = new ThirdIntentionController();