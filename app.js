const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database')
const Product = require('./models/product')
const User = require('./models/user')

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
app.use((req,res,next)=>{
    User.findByPk(1).then(user=>{
        req.user = user;
        next()
    })
    .catch(err=>console.log(err))
})
app.use('/admin', adminRoutes);
app.use('/users', usersRoutes);
app.use('/expense', expenseRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, {constraints:true, onDelete: 'CASCADE'})
User.hasMany(Product)

sequelize.sync({force:true}).then(result =>{
    //console.log(result)
    return User.findByPk(1)
}).then(user =>{
    if(!user){
        return User.create({name:'Mano', email:'test@test.com'})
    }
    return user
}).then(user =>{
    app.listen(3000)
})
.catch( err => console.log(err))

//app.listen(3000);
