const { Schema, model } = require('mongoose');

const CallsSchema = new Schema({
    START_DATE: String,
    END_DATE: String,
    STATUS: String,
    SUPPORT_AGENT_ID: Number
})

module.exports = model("CALLS", CallsSchema)