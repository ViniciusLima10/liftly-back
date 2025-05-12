const mongoose = require("mongoose");

const connectMongo = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/liftly', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Mongo conectado");
    } catch(err) {
        console.error("mongo nao conectado")
    }
};

module.exports = connectMongo;