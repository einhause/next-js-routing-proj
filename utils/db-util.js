import { MongoClient } from 'mongodb';

async function connectDB() {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@nextjsprojectcluster.arqwv.mongodb.net/events?retryWrites=true&w=majority`
  );
  return client;
}

async function insertDocument(client, collection, document) {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);
  return result;
}

async function getAllDocuments(client, collection, sortObj) {
  const db = client.db();
  const documents = await db
    .collection(collection)
    .find()
    .sort(sortObj)
    .toArray();
  return documents;
}

export { connectDB, insertDocument, getAllDocuments };
