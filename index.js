// creates an express app
const express = require('express');
const app = express();

// JSON body parser
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// XML body parser
require('body-parser-xml')(express);
app.use(
    express.xml({
        limit: '1MB', // Reject payload bigger than 1 MB
        xmlParseOptions: {
            normalize: true, // Trim whitespace inside text nodes
            normalizeTags: true, // Transform tags to lowercase
            explicitArray: false, // Only put nodes in array if >1
            explicitRoot: true
        },
    }),
);

// cookie parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// express-session
// used to save the CSRF token reference ID
const session = require('express-session');
app.use(session({ secret: "supersecret", resave: false, saveUninitialized: false }));

// creates static routes
const path = require('path');
app.use(express.static(path.join(__dirname, "/public")));

app.get('/', async (req, res) => {
    res.send("Hello World")
});

// require routes
app.use('/', require('./routes/tests'));

// EJS engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(function (err, req, res, next) {
    if (err.code !== 'EBADCSRFTOKEN') return next(err);

    // handle CSRF token errors here
    res.status(403);
    res.send({ msg: 'invalid CSRF token' });
});

// listen app
app.listen(3000, function (err) {
    if (!err) {
        console.log('Server is running');
    }
    else {
        console.log(err);
    }
});