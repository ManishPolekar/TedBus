const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const routeSchema = new Schema({
    departureLocation: {
        name: {
            type: String,
            required: true,
        },
        subLocation: { type: [String] },
    },
    arrivalLocation: {
        name: {
            type: String,
            required: true,
        },
        subLocation: { type: [String] },
    },
    duration: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("Routes", routeSchema);