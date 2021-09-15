const router = require('express').Router();
const connect = require('../config/conMySQL');
// module to prevent CSRF
const csrf = require('csurf');
const csrfProtection = csrf();

// ---------------------------------- LOGIN ---------------------------------->

// render view
router.get('/login', csrfProtection, (req, res) => {
    console.log({ csrfToken: req.csrfToken() });
    res.render('sec-login', { csrfToken: req.csrfToken() })
});
//

// Vulnerable Sample (SQLi)
router.post('/login/sample', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const query = connect.con.query(`SELECT * FROM user WHERE username = '${username}' AND password = '${password}'`,
        (err, rows, fields) => {
            console.log(query.sql);
            if (err) return res.status(400).send(err)
            if (rows.length == 0) return res.status(404).send({ msg: "incorrect password" });
            return res.status(200).send({ msg: "correct password" });
        });
});
//

router.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const query = connect.con.query(`SELECT * FROM user WHERE username = '${username}' AND password = '${password}'`,
        (err, rows, fields) => {
            console.log(query.sql);
            if (err) return res.status(400).send(err)
            if (rows.length == 0) return res.status(404).send({ msg: "incorrect password" });
            createSession(res, rows[0]);
            return res.status(200).send({ status: 200, msg: "correct password" });
        });
});

router.post('/sec/login', csrfProtection, async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const query = connect.con.query(`SELECT * FROM user WHERE username = ? AND password = ?`, [username, password],
        (err, rows, fields) => {
            console.log(query.sql);
            if (err) return res.status(400).send(err)
            if (rows.length == 0) return res.status(404).send({ msg: "incorrect password" });
            createSession(res, rows[0]);
            return res.status(200).send({ status: 200, msg: "correct password" });
        });
});

// ---------------------------------- UPDATE PASSWORD ---------------------------------->

// render page
router.get('/change-password', csrfProtection, (req, res) => {
    console.log({ csrfToken: req.csrfToken() });
    res.render('sec-change-password', { csrfToken: req.csrfToken() })
});
//

// Vulnerable Sample (CSRF)
router.post('/change-password', async (req, res) => {
    try {
        console.log(req.get('origin'));
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
//

router.post('/sec/change-password', csrfProtection, async (req, res) => {
    try {
        console.log(req.get('origin'));
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

// ---------------------------------- JSON/XML BODY PARSER ---------------------------------->

// example
// this route receives json or xml data and sends it back
router.post('/test/bodyparser', async (req, res) => {
    return res.status(200).send(req.body);
});
//

// ---------------------------------- CONFIGS ---------------------------------->

// example how to use it
router.post('/xml/libxmljs', async (req, res) => {
    try {
        // content
        const xml = '<?xml version="1.0" encoding="UTF-8"?>' +
            '<data>' +
            'test' +
            '</data>';
        //

        const data = await parseXml(xml);
        res.send(data.get('//data').text());
    } catch (err) {
        console.log(err)
        res.send(err)
    }
});
//

// XML parser
const libxmljs = require("libxmljs");
const parseXml = (str) => {
    return new Promise((resolve, reject) => {

        try {
            // noent: false --> allows External Entities
            const parserOptions = {
                noblanks: true,
                noent: true,
                nocdata: true
            };
            const doc = libxmljs.parseXmlString(str, parserOptions);
            resolve(doc);
        } catch (err) {
            reject(err)
        }

    });
}
//

// session config
const jwt = require('jsonwebtoken');
function createSession(res, value) {

    let options = {
        maxAge: 60 * 60 * 1000, // would expire after 60 minutes
        httpOnly: true, // the cookie only accessible by the web server
        signed: false // indicates if the cookie should be signed
    }

    // Set cookie
    const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60 * 60), data: value }, "superstrongsecret");
    res.cookie('session', token, options)
}
function readSession(req) {
    return new Promise((resolve, reject) => {
        const token = req.cookies.session;
        jwt.verify(token, "superstrongsecret", (err, verifiedJwt) => {
            if (err) {
                reject(err);
            } else {
                const data = verifiedJwt.data;
                resolve(data);
            }
        });
    });
}
//

module.exports = router;