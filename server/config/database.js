const mongoose = require('mongoose');

const { MONGO_URI } = process.env;

exports.connect = async () => {
    await mongoose
        .connect(MONGO_URI)
        .then(() => console.log("Successfully connected to database"))
        .catch(err => {
            console.log("database connection failed. exiting now...");
            console.error(err);
            process.exit(1);
        });
};
