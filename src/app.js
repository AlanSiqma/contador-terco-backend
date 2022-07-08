const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const morgan = require('morgan');

require('./config/connection')

const whitelist = ['http://localhost:4200', 'http://developer2.com']
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error())
        }
    }
}

class App {
    constructor() {
        this.app = express();
        this.app.use(cors({
            origin: 'http://localhost:4200'
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