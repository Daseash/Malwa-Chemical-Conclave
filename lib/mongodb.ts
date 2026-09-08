import { MongoClient } from "mongodb";

let cachedClientPromise: Promise<MongoClient> | null = null;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

/**
 * Lazily connects on first use rather than at import time, so the rest of
 * the site still builds and runs before MONGODB_URI is configured.
 */
export default function getMongoClientPromise(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error(
      "MONGODB_URI is not set. Copy .env.example to .env.local and fill in your connection string."
    );
  }

  if (cachedClientPromise) return cachedClientPromise;

  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
  });

  const promise = client.connect().catch((err) => {
    // Reset cache on error so subsequent requests can retry fresh instead of reusing a rejected promise
    cachedClientPromise = null;
    if (global._mongoClientPromise) {
      global._mongoClientPromise = undefined;
    }
    throw err;
  });

  if (process.env.NODE_ENV === "development") {
    global._mongoClientPromise = promise;
    cachedClientPromise = global._mongoClientPromise;
  } else {
    cachedClientPromise = promise;
  }

  return cachedClientPromise;
}
