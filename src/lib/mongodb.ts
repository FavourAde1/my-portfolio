import { Db, MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI?.trim();
const databaseName = process.env.MONGODB_DB?.trim() || "portfolio";

type MongoState = {
  client?: MongoClient;
  connection?: Promise<MongoClient>;
};

const globalMongo = globalThis as typeof globalThis & {
  __portfolioMongo?: MongoState;
};

const state = (globalMongo.__portfolioMongo ??= {});

function getUri(): string {
  if (!uri) {
    throw new Error("MONGODB_URI is required for server-side MongoDB access.");
  }
  return uri;
}

export async function getMongoClient(): Promise<MongoClient> {
  if (state.client) return state.client;

  state.connection ??= MongoClient.connect(getUri());
  try {
    state.client = await state.connection;
    return state.client;
  } catch (error) {
    state.connection = undefined;
    throw error;
  }
}

export async function getMongoDb(): Promise<Db> {
  const client = await getMongoClient();
  return client.db(databaseName);
}
