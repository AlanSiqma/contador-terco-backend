const { Router } = require('express');

const routes = new Router();

const ThirdIntentionController = require('./app/Controllers/TirdIntentionController');

routes.get('/thirdIntention/:intention', ThirdIntentionController.getIntention)
routes.post('/thirdIntention/:intention', ThirdIntentionController.save)
routes.get('/thirdIntention/', ThirdIntentionController.get)

module.exports = routes;