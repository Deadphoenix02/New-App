const path = require('path');
const express = require('express');

const bodyParser = require('body-parser');

const sequelize = require('./util/db');

const errorController = require('./controllers/error');

const product =  require('./models/product');
const user = require('./models/user');
const Cart = require('./models/cart');

const CartItem = require('./models/cart-item');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use( (req,res,next) => {
    user.findByPk(1)
    .then((user) => {
        req.user = user;
        next();
    })
    .catch((err) => console.log(err));
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);
product.belongsTo(user, {constraints: true, onDelete:'CASCADE'});
user.hasMany(product);
user.hasOne(Cart);
Cart.belongsTo(user);
Cart.belongsToMany(product, {through: CartItem});
product.belongsToMany(Cart, {through: CartItem});

sequelize
//.sync({force:true})
.sync()
.then(result => {
    return user.findByPk(1);
})
.then(User => {
    if(!User){
        return user.create({id:1, name: "SK", emailId: "sk18@devb"})
    }
    return User;
})
.then( (user)=>{
    return user.createCart();
})
.then(cart => {
    app.listen(3000);
})
.catch(err =>
    console.log(err));

// db.execute('SELECT * FROM db1.Products')
//     .then( result => {
//         console.log(result[0]);
//     })
//     .catch(err => {
//         console.log(err);
//     });