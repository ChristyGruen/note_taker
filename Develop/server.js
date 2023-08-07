//28miniproject copy
const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog');  //not sure what this is for
const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;

const app = express();

// Import custom middleware, "cLog"
app.use(clog);  //not sure if I need this

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/assets/index.html'))
);

// GET Route for feedback page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/assets/notes.html'))
);

// Wildcard route to direct users to a 404 page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/assets/404.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);