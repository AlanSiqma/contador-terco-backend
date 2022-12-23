const ThirdIntention = require('../Models/ThirdIntention');
const ThirdIntentionService = require('../Services/ThirdIntentionService');

const _ = require('lodash');
const { response } = require('express');
class ThirdIntentionController {
    getIntention(req, res) {
        var respose = { erro: true, result: [] };
        var status = 400;
        if (req.params.intention != '') {
            let intention = req.params.intention;
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

    createIntention(intention, body, isuserCreated) {
        if (isuserCreated) {
            createIntentionAndUsertCreated(intention, body)
        } else {
            let thirdIntention = new ThirdIntention({
                descriptionIntention: intention,
                prayedRosaries: body
            });
            thirdIntention.save();
        }
    }
    createIntentionAndUsertCreated(intention, body) {
        let thirdIntention = new ThirdIntention({
            userCreated: body.userCreated,
            descriptionIntention: intention,
            prayedRosaries: body.prayedRosaries
        });
        thirdIntention.save();
    }
    genericResponse(res, status, respose) {
        return res.status(status).json(respose);
    }
    intentionInvalid(req) {
        return req.params.intention == undefined || req.params.intention == ''
    }
    updateIntention(found, body) {
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

    async save(req, res) {
        var respose = { erro: true, result: [] };
        var status = 400;
        var body = req.body;

        if (this.intentionInvalid(req)) {
            respose.result = "intention é um campo obrigatorio";
            return res.status(status).json(respose);
        }

        let intention = req.params.intention;
        let validateSchema = await ThirdIntentionService.schemaIsValid(body);

        if (!validateSchema) {
            body = [];
        }

        ThirdIntention.find({ descriptionIntention: intention }, (err, found) => {
            if (err) {
                respose.result = "Erro ao retornar lista";
                return this.genericResponse(res, status, respose);
            }

            if (found.length == 0) {
                this.createIntention(intention, body, false);
            }
            else if (found.length > 0 && validateSchema) {
                this.updateIntention(found[0], body);
            }
            respose.erro = false;
            response.result = found;
            return this.genericResponse(res, 200, respose);
        });
    }

    async postPrayintentionObject(req, res) {
        var respose = { erro: true, result: [] };
        var status = 400;
        var body = req.body;

        if (this.intentionInvalid(req)) {
            respose.result = "intention é um campo obrigatorio";
            return res.status(status).json(respose);
        }

        let intention = req.params.intention;
        let validateSchema = await ThirdIntentionService.schemaIsValid(body.prayedRosaries);

        if (!validateSchema) {
            body = [];
        }

        ThirdIntention.find({ descriptionIntention: intention }, (err, found) => {
            if (err) {
                respose.result = "Erro ao retornar lista";
                return this.genericResponse(res, status, respose);
            }

            if (found.length == 0) {
                this.createIntention(intention, body, true);
            }
            else if (found.length > 0 && validateSchema) {
                this.updateIntention(found[0], body);
            }
            respose.erro = false;
            response.result = found;
            return res.status(200).json(respose);
        });
    }

    get(req, res) {
        var respose = { erro: true, result: [] }; var status = 400;

        ThirdIntention.find((err, found) => {
            if (!err) {
                respose.result = found;
                respose.erro = false;
                return res.status(200).json(respose);
            } else {
                respose.result = "Erro ao retornar lista";
                return res.status(status).json(respose);
            }
        });

    }
}
module.exports = new ThirdIntentionController();