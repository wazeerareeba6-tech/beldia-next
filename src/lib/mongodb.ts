import { MongoClient, ServerApiVersion } from "mongodb"

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local')
}

const uri = process.env.MONGODB_URI
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }
  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client.connect()
      .then(c => {
        console.log("✅ MongoDB Connected Successfully");
        return c;
      })
      .catch(err => {
        console.error("❌ MongoDB Connection Error:", err.message);
        throw err;
      });
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect();
}

export default clientPromise

export async function getDb() {
  try {
    const client = await clientPromise
    return client.db(process.env.MONGODB_DB || "health_certificates")
  } catch (e: any) {
    console.error("Failed to get DB instance:", e.message);
    throw e;
  }
}