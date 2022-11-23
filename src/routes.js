const { Router } = require('express');
const TirdIntentionController = require('./app/Controllers/TirdIntentionController');

const routes = new Router();

const ThirdIntentionController = require('./app/Controllers/TirdIntentionController');

routes.get('/thirdIntention/:intention', ThirdIntentionController.getIntention)
routes.post('/thirdIntention/:intention', ThirdIntentionController.save)
routes.get('/thirdIntention/', ThirdIntentionController.get)
routes.post('/newthirdIntention/:intention', TirdIntentionController.postPrayintentionObject)
module.exports = routes;