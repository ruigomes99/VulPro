const router = require('express').Router();
const csrf = require('csurf');
const csrfProtection = csrf();

router.post('/sec/change-password', csrfProtection, async (req, res) => {
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

// render the html page (ejs engine) with the CSRF token
router.get('/change-password', csrfProtection, (req, res) => {
    console.log({ csrfToken: req.csrfToken() });
    res.render('sec-change-password', { csrfToken: req.csrfToken() })
});