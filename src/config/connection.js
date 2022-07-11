const mongoose = require('mongoose');
require("dotenv").config();

class Connection {
    constructor() {
        this.dataBaseConnectionMongoDB();
    }
    dataBaseConnectionMongoDB() {
        this.mongoose =
            mongoose
                .connect(
                    process.env.MONGODB_URI,
                    { useNewUrlParser: true, useUnifiedTopology: true }
                )
                .then(() => console.log("MongoDB connected"))
                .catch(err => console.log(err));

    }
}

module.exports = new Connection();