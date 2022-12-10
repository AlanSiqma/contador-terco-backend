
const app = require('./app');

var PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`App lsten on port : ${PORT}`)
})