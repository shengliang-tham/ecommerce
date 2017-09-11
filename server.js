'use strict';
let express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  Shopify = require('shopify-api-node'),
  ShopifyBuy = require('shopify-buy'),
  ShopifyToken = require('shopify-token'),
  request = require('request-promise'),
  async = require('async'),
  http = require('http');
let app = express();


//Specifies the port number
let port = process.env.PORT || 3000;

//Body Parser Middleware
app.use(bodyParser.json());

//https://hello-retail.myshopify.com/admin/oauth/authorize?client_id=be675cfe0b90d53f7c0f9a7c7ddb382c&scope=read_products,write_products,read_orders,write_orders,read_checkouts,write_checkouts&redirect_uri=https://hello-retail.myshopify.com&state=4214340404

let scopes = ['read_products', 'write_products', 'read_orders', 'write_orders', 'read_checkouts', 'write_checkouts'];
// Generation of token
let shopifyToken = new ShopifyToken({
  sharedSecret: '1af1c052305ecb6bdb584eeb77fa7692',
  redirectUri: 'https://hello-retail.myshopify.com/',
  apiKey: 'be675cfe0b90d53f7c0f9a7c7ddb382c',
  scopes: scopes,
});

let shopify = new Shopify({
  shopName: 'hello-retail',
  accessToken: 'a0b78632bf10a45b59f0b48ab976268b'
  // apiKey: '391a6c89e6a5d305f0d43fe600da06f2',
  // password: '15f630639339895ef8a9bfa839ce4f0d'
});

// let shopClient = ShopifyBuy.buildClient({
//   accessToken: '94ed69b15b199294ee24ca895e3b3f14',
//   domain: 'hello-retail.myshopify.com',
//   appId: '8'
// });

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/test', (req, res, next) => {
  const code = 'd6406fc6f8f126ecd0cbd5c6d9b7c2a5'
  const hostname = 'hello-retail.myshopify.com';

  shopifyToken.getAccessToken(hostname, code).then((token) => {
    res.json({
      token: token
    })
    // => f85632530bf277ec9ac6f649fc327f17
  }).catch((err) => console.err(err));
})

app.post('/checkout', (req, res, next) => {
  shopify.checkout.create({
      line_items: req.body
    })
    .then(data => {
      res.json(data)
    })
  // async.waterfall([
  //   createCheckout,
  //   cardVaulting,
  //   completePayment
  // ], function (err, result) {
  //   // result now equals 'done'
  //   if (err) {
  //     res.json({
  //       error: err
  //     })
  //   } else {
  //     res.json({
  //       data: result
  //     })
  //   }
  // });

  // function createCheckout(callback) {
  //   shopify.checkout.create({
  //       email: "test@hotmail.com",
  //       line_items: [{
  //         product_id: '10753675783',
  //         variant_id: '47592213831',
  //         quantity: 1
  //       }],
  //       billing_address: {
  //         address1: "Chestnut Street 92",
  //         address2: "Apt 2",
  //         city: "Louisville",
  //         country: "United States",
  //         first_name: "Bob",
  //         last_name: "Norman",
  //         phone: "555-625-1199",
  //         province: "Kentucky",
  //         zip: "40202",
  //         country_code: "US",
  //         province_code: "KY"
  //       },
  //       shipping_address: {
  //         address1: "Chestnut Street 92",
  //         address2: "Apt 2",
  //         city: "Louisville",
  //         country: "United States",
  //         first_name: "Bob",
  //         last_name: "Norman",
  //         phone: "555-625-1199",
  //         province: "Kentucky",
  //         zip: "40202",
  //         country_code: "US",
  //         province_code: "KY"
  //       }
  //     })
  //     .then(checkout => {
  //       let result = {
  //         paymentUrl: checkout.payment_url,
  //         token: checkout.token
  //       };

  //       callback(null, result);
  //     })
  //     .catch(err => {
  //       callback(err.response.body)
  //     })
  //   // .catch(err => res.json({
  //   //   result: err.response.body
  //   // }))
  // }

  // function cardVaulting(data, callback) {
  //   console.log(data)
  //   let options = {
  //     method: 'POST',
  //     uri: data.paymentUrl,
  //     body: {
  //       "amount": "0.01",
  //       "unique_token": data.token,
  //       "credit_card": {
  //         "number": "5555555555554444",
  //         "month": "12",
  //         "year": "19",
  //         "verification_value": "123",
  //         "first_name": "John",
  //         "last_name": "Smith"
  //       }
  //     },
  //     json: true // Automatically stringifies the body to JSON
  //   };

  //   request(options)
  //     .then(function (result) {
  //       // POST succeeded...
  //       result.token = data.token;
  //       callback(null, result);
  //     })
  //     .catch(function (err) {
  //       // POST failed...
  //       callback(err)
  //     });
  // }

  // function completePayment(data, callback) {
  //   console.log(data)
  //   shopify.payment.create(data.token, {
  //       amount: "0.01",
  //       session_id: data.id,
  //       unique_token: data.token
  //     })
  //     .then(payment => {
  //       callback(null, payment);
  //     })
  //     .catch(err => {
  //       callback(err.response.body)
  //     })
  // }
})

app.get('/categories', (req, res, next) => {
  shopify.collectionListing.list()
    .then(collection => {
      res.json({
        collections: collection
      })
    })
    .catch(err => console.error(err))
});

app.get('/categories-product', (req, res, next) => {
  let collectionId = req.query.collectionId;
  shopify.product.list({
      collection_id: collectionId
    })
    .then(collectionListing => {
      res.json({
        listing: collectionListing
      })
    })
    .catch(err => console.error(err))
});

app.get('/listing', (req, res, next) => {
  shopify.product.list()
    .then(product =>
      res.json({
        product: product
      }))
    .catch(err => console.error(err))
})


app.post('/cart-listing', (req, res, next) => {
  shopify.product.list({
      ids: req.body.toString(),
      fields: ['id', 'title', 'images', 'variants']
    })
    .then(product => {
      res.json({
        result: product
      })
    })
})

// app.get('/customers', (req, res, next) => {
//   shopify.customer.list()
//     .then(customer =>
//       res.json({
//         customer: customer
//       }))
//     .catch(err => console.error(err))
// });

// app.post('/sign-up', (req, res, next) => {
//   shopify.customer.create(req.body)
//     .then(result => {
//       res.json({
//         success: true,
//         result: result
//       })
//     })
//     .catch(err => res.json({
//       success: false,
//       result: err
//     }))
//   // .catch(err => console.error(err))
// });

//Start the server
app.listen(port, () => {
  console.log('Server started on port' + port);
});