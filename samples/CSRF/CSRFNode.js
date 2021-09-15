const router = require('express').Router();

router.post('/change-password', async (req, res) => {
    try {
        // check seassion
        const user = await readSession(req);
        if (!user) return res.status(404).send({ msg: "no session available" });
        //
        const password = req.body.password;
        const query = connect.con.query(`UPDATE user SET password = ? WHERE id = ?`, [password, user.id],
            (err, rows, fields) => {
                console.log(query.sql);
                if (err) return res.status(400).send({ msg: "something went wrong" });
                return res.status(200).send({ status: 200, msg: "success" });
            });
    } catch (err) {
        console.log(err)
        return res.status(404).send({ msg: "no session available" });
    }
});