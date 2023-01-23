const sdk = require('node-appwrite');
const { config } = require("../environment");

const client = new sdk.Client();

client.setEndpoint(`${config.APPWRITE_URL}/v1`); // Your API Endpoint
client.setProject(config.APPWRITE_PROJECTID); // Your project ID
client.setKey(config.APPWRITE_SECRET); // Your secret API key


async function fetchUser(userId) {
    const databases = new sdk.Databases(client);
    return await databases.getDocument(config.APPWRITE_DATABASE, config.APPWRITE_USERCOLLECTIONID, userId);
}



async function fetchEvent(eventId) {
    const databases = new sdk.Databases(client);
    return await databases.getDocument(config.APPWRITE_DATABASE, config.APPWRITE_EVENTCOLLECTIONID, eventId);
}

async function fetchDocument(fileId) {
    const storages = new sdk.Storage(client);
    return await storages.getFileDownload(config.APPWRITE_STORAGEBUCKETID, fileId);
}

module.exports = { fetchUser, fetchEvent, fetchDocument }