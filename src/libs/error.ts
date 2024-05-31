export const mapError = (fnName: string, error: any): { message: string, status: number } => {
  console.debug(fnName, error)

  if (error.name === 'ValidationError') return { message: error.message, status: 400 };

  if (error.name === 'MongoServerError') {
    if (error.code === 11000) return { message: 'RESOURCE_ALREADY_EXISTS', status: 422 };
  }

  return { message: 'UNABLE_TO_SAVE_ENTRY_TO_DATABASE', status: 500 };
}