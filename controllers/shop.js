const Product = require('../models/product');
const Cart = require('../models/cart')

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

exports.getProducts = (req, res, next) => {
  Product.findAll().then(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  }).catch(err=>{
    console.log(err)
  })
};

exports.getProduct = (req, res, next) => {
  const proId = req.params.productId;
  Product.findByPk(proId).then((product)=>{
    res.render('shop/product-detail',{
      product: product,
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
  console.log(req.user.cart)
  // res.render('shop/cart', {
  //   path: '/cart',
  //   pageTitle: 'Your Cart'
  // });
  req.user
    .getCart()
    .then(cart=> {
      return cart.getProducts()
      .then(products => {
        res.render('shop/cart',{
          path: '/cart',
          pageTitle: 'Your Cart',
          products: products
        })
      })
      //console.log(cart)
    })
    .catch(err=>console.log(err))

};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId
  let fetchedCart ; 
  let newQuantity = 1;

  // Product.findByPk(prodId, (product) => {
  //   Cart.addProduct(prodId, product.price)
  // })
  // console.log(prodId)
  // res.redirect('/cart')

  req.user.getCart()
  .then(cart =>{
    fetchedCart = cart
    return cart.getProducts({ where: { id: prodId}})
  })
  .then(products => {
    let product
    if(products.length>0){
      product = products[0]
    }

     if(product){
       const oldQuantity = product.cartItem.quantity;
       newQuantity = oldQuantity + 1
       return product
     }

     return Product.findByPk(prodId)
    })
    .then(product => {
        return fetchedCart.addProduct(product, {
           through: { quantity: newQuantity }
        }) //addProduct is sequlize method
      })
  .then(()=>{
    res.redirect('/cart')
  })
}

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  console.log('req', req); // Debug the req.body object

  req.user
    .getCart()
    .then(cart => {
      return cart.getProducts({ where: { id: prodId} });
    })
    .then(products => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then(result => {
      res.redirect('/cart'); // Redirect to the cart page
    })
    .catch(err => console.log(err));
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
