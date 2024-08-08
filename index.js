const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const exphbs = require('express-handlebars');
const path=require("path");
require("dotenv").config();

//handlebars
const hbs = exphbs.create({
    extname: 'hbs',
    defaultLayout: 'index',
    layoutsDir: path.join(__dirname, 'views'),
    partialsDir: path.join(__dirname, 'views'),
    allowProtoMethodsByDefault: true,
    allowProtoProperties: true
});
app.engine('hbs', hbs.engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','hbs');

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// Static files middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(bodyParser.json());
app.use(express.json());

// Import and use the blog router
const moneytracker = require('./router/tracker');
app.use('/', moneytracker);


const dbConnect = require('./config/database');
dbConnect();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("App is running at port", PORT);
});
