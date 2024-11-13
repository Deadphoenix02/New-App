const Product = require('../models/product');
const Cart = require('../models/cart');
const CartItem = require('../models/cart-item');
const product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'Products',
        path: '/product'
      })
    })
    .catch();
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then((prod) => {
      console.log(prod);
      res.render('shop/product-detail', {
        pageTitle: 'Edit Product',
        path: '/products',
        editing: false,
        product: prod
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      })
    })
    .catch();
};

exports.getCart = (req, res, next) => {

  req.user.getCart()
    .then((cart) => {
      return cart
        .getProducts()
        .then((Products) => {
          res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: Products
          });
        })
    })
    .catch((err) => console.log(err));

};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let UserCart;
  req.user
    .getCart()
    .then(cart => {
      console.log(cart);
      UserCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      let newQuant = 1;
      if (product) {
        const oldQuant = product.cartItems.quantity;
        newQuant = oldQuant +1;
        return UserCart.addProduct(prod, {through: {quantity:newQuant}});
      }
      return Product.findByPk(prodId)
      .then((prod) => {
        console.log(prod)
        return UserCart.addProduct(prod, {through: {quantity:newQuant}});
      })
      .catch((err) => console.log(err));
    })
    .catch((err) => {console.log(err)
      res.redirect('/');
    });
  res.redirect('/cart');
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
