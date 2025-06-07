const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');
const path = require('path');

dotenv.config();

const app = express();
const PORT = 3000;

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// Proxy API route
app.get('/api/movie', async (req, res) => {
  const title = req.query.title;

  if (!title) {
    return res.status(400).json({ error: 'Movie title is required' });
  }

  try {
    const response = await axios.get('https://www.omdbapi.com/', {
      params: {
        apikey: process.env.OMDB_API_KEY,
        t: title,
      },
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movie data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
