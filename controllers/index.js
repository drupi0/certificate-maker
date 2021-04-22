const generator = require("./generator");
const mongoClient = require("./mongo-client");

module.exports = { ...generator, ...mongoClient };