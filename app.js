const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database')
const Product = require('./models/product')
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item')

const UserTwo = require('./models/userTwo')

const cors = require('cors')
const app = express();

app.use(cors())


app.use(bodyParser.urlencoded({ extended: true })); //EJS supports .urlencoded
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const usersRoutes = require('./routes/users');
const expenseRoutes = require('./routes/expenses');


app.use(express.static(path.join(__dirname, 'public')));
app.use((req,res,next)=>{
    UserTwo.findByPk(1).then(user=>{
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

Product.belongsTo(UserTwo, {constraints:true, onDelete: 'CASCADE'})
UserTwo.hasMany(Product)
UserTwo.hasOne(Cart)
Cart.belongsTo(UserTwo)
Cart.belongsToMany(Product, { through:CartItem })
Product.belongsToMany(Cart, { through:CartItem })

sequelize.sync({force:false}).then(result =>{
    //console.log(result)
    return UserTwo.findByPk(1)
}).then(user =>{
    if(!user){
        return UserTwo.create({name:'Mano', email:'test@test.com'})
    }
    return Promise.resolve(user)    
}).then(user =>{
    user.createCart()
}).then(cart=>{
    app.listen(3000)
})
.catch( err => console.log(err))

//app.listen(3000);
