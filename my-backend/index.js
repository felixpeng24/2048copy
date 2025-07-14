// Import required modules
const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const fs = require('fs');

// Load Firebase service account key
const serviceAccount = require('./firebase-key.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const scoresCollection = db.collection('scores');

const app = express();
app.use(cors());
app.use(express.json());

// POST /highscores: Save a new high score
app.post('/highscores', async (req, res) => {
  const { name, score } = req.body;
  if (!name || typeof score !== 'number') {
    return res.status(400).json({ error: 'Name and score are required.' });
  }
  try {
    await scoresCollection.add({ name, score, created: admin.firestore.FieldValue.serverTimestamp() });
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save score.' });
  }
});

// GET /highscores: Return top 5 scores sorted by score (descending)
app.get('/highscores', async (req, res) => {
  try {
    const snapshot = await scoresCollection.orderBy('score', 'desc').limit(5).get();
    const highscores = snapshot.docs.map(doc => doc.data());
    res.json(highscores);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch scores.' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
}); 