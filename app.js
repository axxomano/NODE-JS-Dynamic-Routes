const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database')
const cors = require('cors')
const app = express();

app.use(cors())

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const usersRoutes = require('./routes/users');
const expenseRoutes = require('./routes/expenses');


app.use(bodyParser.json({ extended: false })); //EJS supports .urlencoded
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use('/users', usersRoutes);
app.use('/expense', expenseRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

sequelize.sync().then(result =>{
    //console.log(result)
    app.listen(3000)
})
.catch( err => console.log(err))

//app.listen(3000);
