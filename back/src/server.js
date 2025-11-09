const express = require('express');
const cors = require('cors');
const { testConnection, getNombresEspana } = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health endpoint
app.get('/health', async (req, res) => {
  const dbConnected = await testConnection();
  res.status(200).json({
    status: 'OK',
    message: 'Backend is running successfully',
    timestamp: new Date().toISOString(),
    database: dbConnected ? 'Connected' : 'Disconnected'
  });
});

// Basic API endpoint
app.get('/api/data', (req, res) => {
  res.status(200).json({
    message: 'Hello from Minima Backend!',
    data: {
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development'
    }
  });
});

// Endpoint para obtener nombres de España
app.get('/api/nombres-espana', async (req, res) => {
  try {
    const nombres = await getNombresEspana();
    res.status(200).json({
      success: true,
      count: nombres.length,
      data: nombres
    });
  } catch (error) {
    console.error('Error fetching nombres:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching data from database',
      error: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong!'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  });
});

// Start server only if not in test environment
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;