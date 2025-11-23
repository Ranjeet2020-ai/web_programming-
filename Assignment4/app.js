import express from 'express';
import catRouter from './routes/cat-router.js';

const app = express();
const port = 3002;  // Different port to avoid conflicts

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/cat', catRouter);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Assignment 4 - Thumbnail Generation with Sharp' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ error: 'File too large' });
  }
  if (err.message.includes('image')) {
    return res.status(400).json({ error: err.message });
  }
  
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(port, () => {
  console.log(`Assignment 4 server running at http://localhost:${port}`);
});

export default app;
