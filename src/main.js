const express = require('express')
const morgan = require('morgan');
const path = require('path');
const methodOverride = require('method-override');
const app = express();
const port = 3000;
//--------------------------------------------//
const handlebars = require('express-handlebars');

const route = require('./routes/index');
const db = require('./config/db/db');

// Connect to Database
db.connect();

// TEMPLATE ENGINE
app.engine('hbs', handlebars({
    extname: '.hbs',
    helpers: {
        sum: (a, b) => a + b,
    }
}))
app.set('view engine', 'hbs');
app.set("views", path.join(__dirname, 'rsc/views'));
// console.log('PATH: ', path.join(__dirname, 'rsc/views')) //xem đường dẫn

//

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());
// Over ride lại theo phương thức method override để chuyển post sang put,patch,delete
app.use(methodOverride('_method'));
//HTTP logger
// app.use(morgan('combined'));

// Route init 
route(app);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})