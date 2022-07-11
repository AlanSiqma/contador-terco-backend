const { Router } = require('express');

const routes = new Router();

const ThirdIntentionController = require('./app/Controllers/TirdIntentionController');

routes.get('/thirdIntention', ThirdIntentionController.get)
routes.post('/thirdIntention', ThirdIntentionController.save)

module.exports = routes;