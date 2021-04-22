const { MongoClient } = require("mongodb");
const { config } = require("../environment");

const uri = `mongodb+srv://${config.MONGO_USERNAME}:${config.MONGO_PASSWORD}@${config.MONGO_CLUSTER}/${config.MONGO_DATABASE}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useUnifiedTopology: true });

async function searchRecord(email) {
  await client.connect();
  return await client
    .db()
    .collection(config.MONGO_COLLECTION)
    .findOne(
      { email },
      {
        projection: { first_name: 1, last_name: 1, _id: 0 },
      }
    );
}

module.exports = { searchRecord };
