const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');



const app = express();

//Handlebars Middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Boody Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static Folder
app.use(express.static(path.join(__dirname, "public")));

//Index route
app.get('/', (req, res)=>{
    res.render('landing');
});
app.get('/stock', (req, res)=>{
    res.render('stock');
});






//Server Init
const port = process.env.PORT || 5732;

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
});