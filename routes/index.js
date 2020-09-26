var express = require('express');
var router = express.Router();


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



/* GET home page. */
router.get('/', function(req, res, next) {  

  res.render('index', { title: 'BikeShop - Home', dataBikes });
});

module.exports = router;
