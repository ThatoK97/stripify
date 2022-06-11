import { MongoClient } from "mongodb";

// Global is used here to maintain a cached connection across hot reloads
// in development
let cached = global.mongo;
if (!cached) {
  cached = global.mongo = {conn: null, promise: null};
}

// middleware fn to connect to db
export default async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true
      ,useUnifiedTopology: true
    }

    cached.promise = 
      MongoClient.connect(process.env.MONGO_URI, opts)
      .then(client => ({
        client
        ,db: client.db(process.env.DB_NAME)
      }))
  }
  cached.conn = await cached.promise;
  return cached.conn;
}