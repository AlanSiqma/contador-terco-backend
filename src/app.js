require("dotenv").config();
console.log(`porta ${process.env.PORT}`)

const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const morgan = require('morgan');

require('./config/connection')

class App {
    constructor() {
        this.app = express();
        this.app.use(cors({
            origin: process.env.ORIGIN,
        }));
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.app.use(express.json());
        this.app.use(morgan('dev'));
        this.app.use((req, res, next) => {
            res.header("Access-Controll-Allow-Origin", "*");
            res.header("Access-Controll-Allow-Methods", "GET,POST,PUT,DELETE");
            res.header("Access-Controll-Allow-Headers", "Access, Content-type, Authorization, Acept, Origin, X-Requested-With")

            next();
        });
    }
    routes() {
        this.app.use(routes);
    }

}
module.exports = new App().app;