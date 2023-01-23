const generator = require("./generator");
const mongoClient = require("./mongo-client");
const appWrite = require("./appwrite-client");

module.exports = { ...generator, ...mongoClient, ...appWrite };