const express = require('express');
const winston = require('winston'); 
// const logger = require('winston');
const errorHandling = require('./errorHandling');

const app = express();
const PORT = process.env.PORT || 3000;

const logger = winston.createLogger({ 
    level: 'info', 
    format: winston.format.json(), 
    defaultMeta:
        { service: 'calculator-microservice' }, 
        transports: [ 
            new winston.transports.Console({ 
            format: winston.format.simple(), 
        }), 
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }), 
        new winston.transports.File({ filename: 'logs/combined.log' }), 
        ], 
}); 

// Logger setup
// logger.add(new logger.transports.File({ filename: 'logs.log' }));

// Middleware to log requests
app.use((req, res, next) => {
  logger.log('info', `${req.method} ${req.url}`);
  next();
});

// API endpoints
app.get('/add', (req, res) => {
  const { num1, num2 } = req.query;
  if (!num1 || !num2 || isNaN(num1) || isNaN(num2)) {
    const error = new Error('Invalid input. Please provide valid numbers.');
    error.status = 400;
    return next(error);
  }
  const result = parseFloat(num1) + parseFloat(num2);
  res.json({ result });
});

app.get('/subtract', (req, res, next) => {
  const { num1, num2 } = req.query;
  if (!num1 || !num2 || isNaN(num1) || isNaN(num2)) {
    const error = new Error('Invalid input. Please provide valid numbers.');
    error.status = 400;
    return next(error);
  }
  const result = parseFloat(num1) - parseFloat(num2);
  res.json({ result });
});

app.get('/multiply', (req, res, next) => {
  const { num1, num2 } = req.query;
  if (!num1 || !num2 || isNaN(num1) || isNaN(num2)) {
    const error = new Error('Invalid input. Please provide valid numbers.');
    error.status = 400;
    return next(error);
  }
  const result = parseFloat(num1) * parseFloat(num2);
  res.json({ result });
});

app.get('/divide', (req, res, next) => {
  const { num1, num2 } = req.query;
  if (!num1 || !num2 || isNaN(num1) || isNaN(num2)) {
    const error = new Error('Invalid input. Please provide valid numbers.');
    error.status = 400;
    return next(error);
  }
  if (parseFloat(num2) === 0) {
    const error = new Error('Cannot divide by zero.');
    error.status = 400;
    return next(error);
  }
  const result = parseFloat(num1) / parseFloat(num2);
  res.json({ result });
});

// Mount error handling middleware
app.use(errorHandling);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
