# 2048 High Score Backend

This backend provides a simple high score API for the 2048 game using Node.js, Express, and Firebase Firestore.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Add Firebase credentials:**
   - Go to your Firebase project settings > Service accounts > Generate new private key.
   - Download the JSON file and save it as `firebase-key.json` in this folder.

3. **Start the server:**
   ```bash
   node index.js
   ```

## API Endpoints

- `POST /highscores` — Save a new high score
  - Body: `{ "name": "Felix", "score": 2048 }`
- `GET /highscores` — Get top 5 high scores (sorted by score)

## Example Frontend Usage

```js
// Save a score
fetch('http://localhost:3000/highscores', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Felix', score: 2048 })
});

// Load scores
fetch('http://localhost:3000/highscores')
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById('leaderboard');
    list.innerHTML = '';
    data.forEach(entry => {
      const li = document.createElement('li');
      li.textContent = `${entry.name}: ${entry.score}`;
      list.appendChild(li);
    });
  });
``` 