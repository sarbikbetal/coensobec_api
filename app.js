const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const ismorphic_fetch = require('isomorphic-fetch');


const app = express();

//Handlebars Middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Boody Parser Middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Static Folder
app.use(express.static(path.join(__dirname, "public")));

//Index route
app.get('/', (req, res) => {
    res.render('landing');
});
//Index route
app.get('/about', (req, res) => {
    res.render('about');
});
//Stock Route
app.post('/stock', (req, res) => {
    let tick = req.body.ticker;
    let start = req.body.start;
    let end = req.body.end;
    fetch(`https://stockapp-dwai.herokuapp.com/stock?ticker=${tick}&start=${start}&end=${end}`, {
        method: "GET"
    }).then(res => res.json()).then(data => {
        res.render('stock', {
            eJson: encodeURIComponent(JSON.stringify(data))
        });
    }).catch(error => {
        console.log(error)
    });

});

//Server Init
const port = process.env.PORT || 5732;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});