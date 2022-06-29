const express = require('express')
const fs = require('fs');
const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');
const { UserController } = require('./controllers/User');
const path = require('path')

const app = express()
const db = await sqlite.open({
    filename: './db.db',
    driver: sqlite3.Database
})

app.use('/', express.static(path.join(__dirname, '../public')))
app.use(express.json());

UserController(app, db);  
app.listen(80)