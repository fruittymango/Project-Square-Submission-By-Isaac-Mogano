const express = require('express');
const {v4} = require('uuid');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 3000;

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS brands (id INTEGER PRIMARY KEY AUTOINCREMENT, guid STRING, name TEXT, data BLOB)');
});

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Passes the Access-Control-Allow-Credentials CORS header
  optionsSuccessStatus: 200
};

app.options('*', cors(corsOptions));

app.use(cors(corsOptions));

app.get('/brands/', (req, res) => {
  const id = req.params.id;
  db.all('SELECT guid FROM brands', id, (err, rows) => {
    if (err) {
        console.log(err.message)
      return console.error(err.message);
    }
    if (rows) {
      res.status(200).send(rows.map((value, index) => value.guid));
    } else {
      res.status(404).send('Image not found');
    }
  });
});

app.get('/brands/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM brands WHERE guid = ?', id, (err, row) => {
    if (err) {
        console.log(err)
      return console.error(err.message);
    }
    
    if (row) {
      res.writeHead(200, { 'Content-Type': 'image/png' });
      res.end(row.data);
    } else {
      res.status(404).send('Image not found');
    }
  });
});

app.get('/', (req, res) => {
    res.send('Congratulations, you have reached the API server for brand icons.');
});


app.get('*', (req, res) => {
  res.status(404).send('You have reached the API server for brand icons. URI given cannot be found.');
});

function synRepoFilesIntoDB(dir, files = []) {
    const fileList = fs.readdirSync(dir);
    for (const file of fileList) {
        const name = `${dir}/${file}`;
        const blob = fs.readFileSync(name);
        const id = v4();
        db.run('INSERT INTO brands (guid, name, data) VALUES (?, ?, ?)', [id,file.replace('.png',''), blob], function (err) {
            if (err) {
            return console.log(err.message);
            }
            console.log(`A row has been inserted with rowid ${id}`);
        });
    }
}

app.listen(PORT, () => {
    synRepoFilesIntoDB('./repository/');
    console.log(`Server is running on http://localhost:${PORT}`);
});
