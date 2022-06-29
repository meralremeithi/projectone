export const UserController = (app, db) => {
    app.get('/api/user', async(req, res) => {
        const result = await db.all('SELECT * FROM User');
        res.send(JSON.stringify(result));
    })
    app.post('/api/user', async(req, res) => {

      const result = await db.run(
          'INSERT INTO User (name, password) VALUES (?, ?)',
          req.body.name,
          req.body.password
        )

        res.send(JSON.stringify(result))
    })
    app.put('/api/user/:id', async(req, res) => {

      const result = await db.run(
          'UPDATE User SET password = ? WHERE id = ?',
          req.body.password,
          req.params.id
        )
        res.send(JSON.stringify(result));
    })
    app.delete('/api/user/:id', async(req, res) => {
        const result = await db.run(
    ' DELETE FROM User WHERE id = (?);',
      req.params.id
    )
        res.end();
    })
}
  