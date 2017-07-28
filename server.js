'use strict';
let express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  Shopify = require('shopify-api-node'),
  ShopifyBuy = require('shopify-buy'),
  request = require('request'),
  http = require('http');
let app = express();


//Specifies the port number
let port = process.env.PORT || 3000;

//Set Static Folder
// app.use(express.static(path.join(__dirname, 'dist')));
// var distDir = __dirname + "/dist/";
// app.use(express.static(distDir));

//Body Parser Middleware
app.use(bodyParser.json());

let shopify = new Shopify({
  shopName: 'hello-retail',
  apiKey: '391a6c89e6a5d305f0d43fe600da06f2',
  password: '15f630639339895ef8a9bfa839ce4f0d'
});

let shopClient = ShopifyBuy.buildClient({
  accessToken: 'f8da95633331a97c293fff8c8b4b0e6d',
  domain: 'hello-retail.myshopify.com',
  appId: '8'
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// app.get('/asset', (req, res, next) => {
//   shopify.asset.list(178329543, {})
//     .then(asset => {
//       res.json({
//         asset: asset
//       })
//     })
//     .catch(err => console.error(err))
// })

app.get('/categories', (req, res, next) => {
  shopClient.fetchAllCollections()
    .then(collection => {
      res.json({
        collections: collection
      })
    })
    .catch(err => console.error(err))
});

app.get('/categories-product', (req, res, next) => {
  let collectionId = req.query.collectionId;
  shopClient.fetchQueryProducts({
    collection_id: collectionId
  })
    // shopClient.fetchCollection(collectionId)
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


app.get('/customers', (req, res, next) => {
  shopify.customer.list()
    .then(customer =>
      res.json({
        customer: customer
      }))
    .catch(err => console.error(err))
});

app.post('/sign-up', (req, res, next) => {
  console.log(req.body);
  shopify.customer.create(req.body)
    .then(result => {
      res.json({
        result: result
      })
    })
    .catch(err => console.error(err))
});

//Start the server only the connection to database is successful
app.listen(port, () => {
  console.log('Server started on port' + port);
});