router.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const query = connect.con.query(`SELECT * FROM user WHERE username = ? AND password = ?`, [username, password],
        (err, rows, fields) => {
            console.log(query.sql);
            if (err) return res.status(400).send(err)
            if (rows.length == 0) return res.status(404).send({ msg: "incorrect password" });
            return res.status(200).send({ msg: "correct password" });
        });
});