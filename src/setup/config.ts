export const mongoUri = process.env.MONGO_URI ?? 'mongodb://mongo:27017';

export const jwtSecret = process.env.JWT_SECRET || 'secret';
export const jwtExp = process.env.JWT_EXP || '1d';