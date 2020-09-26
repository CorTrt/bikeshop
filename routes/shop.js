const stripe = require('stripe')('sk_test_51GyDjgKFvi617IjsQgFONBHeai8oXj0C85VFj0JYm5dvp3ge4pmOxC9GhYNUhDHLs8xtshP5mbDKCrO7DRgWx5El00vqCi14fl');

var express = require('express');
var router = express.Router();
const app = express();

const YOUR_DOMAIN = 'http://localhost:3000';


let dataBikes = [
  {
    imgUrl: '/images/BIKO45.jpg',
    model: 'BIKO45',
    price: 679,
  },
  {
    imgUrl: '/images/GEWO8.jpg',
    model: 'GEWO8',
    price: 1249,
  },
  {
    imgUrl: '/images/KIWIT.jpg',
    model: 'KIWIT',
    price: 899,
  },
  {
    imgUrl: '/images/LIKO89.jpg',
    model: 'LIKO89',
    price: 839,
  },
  {
    imgUrl: '/images/NASAY.jpg',
    model: 'NASAY',
    price: 1399,
  },
  {
    imgUrl: '/images/ZOOK7.jpg',
    model: 'ZOOK7',
    price: 799,
  },
]


/* GET shop page. */
router.get('/', async function(req, res, next) {

  /* Création session panier */
  if(req.session.dataCardBikes == undefined){
    req.session.dataCardBikes = [];
  }

  /* Remplissage panier session strip */
  itemCard = [];
  for(i=0;i<req.session.dataCardBikes.length;i++){
    itemCard.push(
      {
        price_data: {
          currency: 'eur',
          product_data: {
            name: req.session.dataCardBikes[i].model,
          },
          unit_amount: req.session.dataCardBikes[i].price,
        },
        quantity: req.session.dataCardBikes[i].qty,
      }
    )
  }

  /* Création session Stripe */
  if(itemCard.length>0){

    const stripeSession = await stripe.checkout.sessions.create({
      
      payment_method_types: ['card'],
  
      line_items: itemCard,
      mode: 'payment',
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/cancel',
    });
    
    res.render('shop', { title: 'BikeShop - Shop', dataCardBikes: req.session.dataCardBikes, id:stripeSession.id});

  } else {

    res.render('shop', { title: 'BikeShop - Shop', dataCardBikes: req.session.dataCardBikes});

  }

});

router.get('/addBike', function(req, res, next) {

  if(req.session.dataCardBikes == undefined){
    req.session.dataCardBikes = [];
  }


  if(req.session.dataCardBikes.length > 0){

    for(i=0;i<req.session.dataCardBikes.length;i++){
      if(req.session.dataCardBikes[i].model === req.query.model){
        console.log('TROUVE')
        var alreadyExist = true;
        req.session.dataCardBikes[i].qty++
      } else {
        console.log('PAS TROUVE')
        var alreadyExist = false;
      }
    }

    if(alreadyExist == false){
      req.session.dataCardBikes.push(req.query)
    }

  } else {
    req.session.dataCardBikes.push(req.query)
  }

  res.render('index', { title: 'BikeShop - Home', dataBikes })
})

router.get('/deleteBike', function(req, res, next) {

  req.session.dataCardBikes.splice(req.query.basketId, 1)

  res.render('shop', { title: 'BikeShop - Shop', dataCardBikes: req.session.dataCardBikes })
})

router.post('/updateQty', function(req, res, next) {

  /* Modifier qty dans dataCardBike */
  var index = 0;
  for(i=0;i<req.session.dataCardBikes.length;i++){
    if(req.session.dataCardBikes[i].model === req.body.model){
      index = i
    }
  }
  req.session.dataCardBikes[index].qty = req.body.qty

  console.log(stripeSession)

  res.render('shop', { title: 'BikeShop - Shop', dataCardBikes: req.session.dataCardBikes })
})

module.exports = router;
