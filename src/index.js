const express = require('express')
const app = express()
const fs = require('fs');
const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

(async() => {


    const db = await sqlite.open({
        filename: './db.db',
        driver: sqlite3.Database
      })
    

      const path = require('path')
      app.use('/', express.static(path.join(__dirname, '../public')))
      app.use(express.json());
      
      app.get('/api', async(req, res) => {
          const result = await db.all('SELECT * FROM User');
          res.send(JSON.stringify(result));
      })
      app.post('/api', async(req, res) => {

        const result = await db.run(
            'INSERT INTO User (name, password) VALUES (?, ?)',
            req.body.name,
            req.body.password
          )

        //   const value = req.body.data;
        //   users[index] = value;
          res.send(JSON.stringify(result))
        //   index++;
      })
      app.put('/api/:id', async(req, res) => {

        const result = await db.run(
            'UPDATE User SET password = ? WHERE id = ?',
            req.body.password,
            req.params.id
          )
    //       const value = req.body.data;
    //       const key = req.params.id;
      
    //       users[key] = value;
      
      
          res.send(JSON.stringify(result));
      })
      app.delete('/api/:id', async(req, res) => {
    //       delete users[req.params.id]
    const result = await db.run(
        ' DELETE FROM User WHERE id = (?);',
        req.params.id
      )
          res.end();
      })
      
    //   app.get('/save', () => {
    //     fs.writeFileSync('./db.db', JSON.stringify(store, null, 2))
    //   })
      
      app.listen(80)

})()