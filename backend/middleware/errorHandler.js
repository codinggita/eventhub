// Global error-handling middleware — must have 4 args so Express recognises it
const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${req.method} ${req.originalUrl} →`, err.stack || err.message);

  const statusCode = res.statusCode && res.statusCode >= 400 ? res.statusCode : 500;

  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
};

module.exports = errorHandler;
