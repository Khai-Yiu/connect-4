import 'dotenv/config';
import mongoose from 'mongoose';

interface MongoDBClientInterface {
    connect: () => void;
}

export default class MongoDBClient implements MongoDBClientInterface {
    connect() {
        mongoose.connect(process.env.MONGODB_URI);
    }
}
