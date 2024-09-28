import mongoose from "mongoose";

declare global {
    namespace globalThis {
        var mongoose: { conn: any; promise: any };
    }
}

const DATABASE_URL = process.env.MONGO_URI!;

if (!DATABASE_URL) {
    throw new Error("Please define the DATABASE_URL environment variable inside .env.local");
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function MongoConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(DATABASE_URL, opts).then(mongoose => {
            return mongoose;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

export default MongoConnect;
