const ThirdIntention = require('../Models/ThirdIntention');
const yup = require('yup');
const _ = require('lodash');
const { response } = require('express');

class ThirdIntentionService {
    async schemaIsValid(body) {
        let schema = yup.object().shape({
            email: yup.string().required(),
            data: yup.string().required(),
            status: yup.bool().required(),
            numero: yup.number().required()
        });

        return await schema.isValid(body);
    }
    intentionInvalid(req) {
        return req.params.intention == undefined || req.params.intention == ''
    }


}
module.exports = new ThirdIntentionService();