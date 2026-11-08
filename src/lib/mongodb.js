import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI?.trim();
const databaseName = process.env.MONGODB_DB?.trim() || "portfolio";

const globalMongo = globalThis;
if (!globalMongo.__portfolioMongo) {
  globalMongo.__portfolioMongo = {};
}
const state = globalMongo.__portfolioMongo;

function getUri() {
  if (!uri) {
    throw new Error("MONGODB_URI is required for server-side MongoDB access.");
  }
  return uri;
}

export async function getMongoClient() {
  if (state.client) return state.client;
  // Fail fast: an unreachable database must not hold a contact-form request for the 30s default.
  state.connection ??= MongoClient.connect(getUri(), { serverSelectionTimeoutMS: 5000 });
  try {
    state.client = await state.connection;
    return state.client;
  } catch (error) {
    state.connection = undefined;
    throw error;
  }
}

export async function getDb() {
  const client = await getMongoClient();
  return client.db(databaseName);
}
