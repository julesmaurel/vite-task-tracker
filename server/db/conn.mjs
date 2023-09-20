import { MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI || "";

const client = new MongoClient(connectionString);

let db;

export const connectDB = async() => {
  try {
    const conn = await client.connect();
    console.log('Connected to Mongo DB')
    db = client.db("sample_training")
  } catch(e) {
    console.error(e);
  }
}

export { db }

export default {
  db,
  connectDB
}