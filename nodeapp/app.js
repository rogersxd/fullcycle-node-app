const express = require('express');
const mysql = require('mysql');
const app = express();

const connection = mysql.createConnection({
  host: 'mysql',
  user: 'root',
  password: 'root',
  database: 'nodedb'
});

connection.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

app.get('/', (req, res) => {
  const sql = `INSERT INTO people(name) values('Full Cycle Rocks')`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    connection.query('SELECT name FROM people', (err, results) => {
      if (err) throw err;
      const names = results.map(r => r.name).join('<br>');
      res.send(`<h1>Full Cycle Rocks!</h1><br>${names}`);
    });
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
