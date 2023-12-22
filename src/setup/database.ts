import mongoose from 'mongoose';

const mongoDBURI = process.env.MONGODB_URI ?? 'mongodb://localhost:27017';

mongoose.connect(mongoDBURI);

export default mongoose;