const Product = require('../models/product');
const Cart = require('../models/cart')
exports.getProducts = (req, res, next) => {
  Product.findAll().then(products => {
    res.render('shop/products-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/'
    });
  }).catch(err=>{
    console.log(err)
  })
};

exports.getProduct = (req, res, next) => {
  const proId = req.params.productId;
  Product.findById(proId).then(([product])=>{
    res.render('shop/product-detail',{
      product: product[0],
      pageTitle : product.title,
      path: '/products'
  })
}).catch(err => console.log(err))
}
exports.getIndex = (req, res, next) => {
    Product.findAll().then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    }).catch(err=>{
      console.log(err)
    })
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price)
  })
  console.log(prodId)
  res.redirect('/cart')
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
