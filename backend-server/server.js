const express = require('express');
const {v4, validate, version} = require('uuid');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 3000;

/**
 * Creates an in memory database using sqlite3 everytime the server starts up.
*/
const db = new sqlite3.Database(':memory:');

/**
 * Using the db object, this create a table called brands in the database
 * that has id, guid, name, published_date and data as columns.
*/
db.serialize(() => {
  db.run('CREATE TABLE brands (id INTEGER PRIMARY KEY AUTOINCREMENT, guid STRING, name TEXT, published_date TEXT, data BLOB)');
});


/**
 * Allow requests from any origin to access server resourses using the  http
 * methods as given below.
*/
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 200
};


app.options('*', cors(corsOptions));


/**
 * Setup the cors middleware for server.
*/
app.use(cors(corsOptions));


/**
 * Endpoint used too get available guids for existing brands.
 * @param sortBy {alphabetical | published_date} - will filter records retrieved according to the either one of these. 
 * @param sortOrder {asc | desc} - will sort the retrieved records in either ascending or descending order.
*/
app.get('/brands/', (req, res) => {
  
  const id = req.params.id;
  const sortBy = req.query.sortBy || 'alphabetical';
  const sortOrder = req.query.sortOrder || 'asc';

  let selectQuery = 'SELECT guid FROM brands';
  if (sortBy === 'published_date') {
      selectQuery = `SELECT guid FROM brands ORDER BY published_date ${sortOrder === 'desc' ? 'DESC' : 'ASC'}`;
  } else {
      selectQuery = `SELECT guid FROM brands ORDER BY name ${sortOrder === 'desc' ? 'DESC' : 'ASC'}`;
  }


  db.all(selectQuery, id, (err, rows) => {
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


/**
 * Enpoint used to get images with the matching guid.
*/
app.get('/brands/:guid', (req, res) => {
  const guid = req.params.guid;
  if (validate(guid) && version(guid) === 4) {
    db.get('SELECT * FROM brands WHERE guid = ?', guid, (err, row) => {
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
  } else {
    res.status(400).send('Invalid guid given.');
  }
});


/**
 * Enpoint serves as the root and returns a congratulatory message to user.
*/
app.get('/', (req, res) => {
    res.send('Congratulations, you have reached the API server for brand icons.');
});


/**
 * Endpoint serves to inform user of incorrect URI provided where applicable.
*/
app.get('*', (req, res) => {
  res.status(404).send('You have reached the API server for brand icons. URI given cannot be found.');
});


/**
 * Function used to seed database records with files read from folder to provided by the parameter.
 * @param {string} dir - directory to read files from
*/
async function synRepoFilesIntoDB(dir) {
    const fileList = fs.readdirSync(dir);
    for (const file of fileList) {
        const name = `${dir}/${file}`;
        const blob = fs.readFileSync(name);
        const id = v4();
        const today = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const dateString = today.toLocaleDateString(options);
        db.run('INSERT INTO brands (guid, name, published_date, data) VALUES (?, ?, ?, ?)', [id,file.replace('.png',''), dateString, blob], function (err) {
            if (err) {
            return console.log(err.message);
            }
        });
    }
}


/**
 * Entry point of the program that is used to start the server then seed data in the database.
*/
app.listen(PORT, async () => {
    await synRepoFilesIntoDB('./repository');
    console.log(`Server is running on http://localhost:${PORT}`);
});
