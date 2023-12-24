import mongoose from 'mongoose';
import { mongoUri } from './config';

mongoose.connect(mongoUri)
  .then(() => console.log('🦝 Mongo DB is connected'));

export default mongoose;