const express = require('express');
const logger = require('winston');

const app = express();

// Middleware to log requests
app.use((req, res, next) => {
  logger.log('info', `${req.method} ${req.url}`);
  next();
});

// Middleware for handling 404 errors
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// Middleware for handling errors
app.use((error, req, res, next) => {
  logger.log('error', `${error.status || 500} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  
  res.status(error.status || 500).json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
