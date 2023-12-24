export const mapError = (error: any): { message: string, status: number } => {
  console.log('mapError', error)

  if (error.name === 'ValidationError') return { message: error.message, status: 400 };

  if (error.name === 'MongoServerError') {
    if (error.code === 11000) return { message: 'Resource already exists!', status: 422 };
  }

  return { message: 'Unable to save entry to the database!', status: 500 };
}