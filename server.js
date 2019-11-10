const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const db = require('./db');

app.get('/', (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, 'index.html'));
  } catch (ex) {
    console.log('index: '+ ex.message);
    next(ex);
  }
});

app.get('/api/users', async (req, res, next) => {
  try {
      console.log('Imhere');
    res.send(await db.getAllUsers());
  } catch (ex) {
    console.log('users: ' + ex.message);
    next(ex);
  }
});

app.get('/api/departments', async (req, res, next) => {
  try {
    res.send(await db.getAllDepartments());
  } catch (ex) {
    console.log('dep: ' + ex.message);
    next(ex);
  }
});

db.sync().then( () => app.listen(PORT, () => {
    console.log(`Running on port: ${PORT}`);
  })).catch(e => e);