var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
// router.get( '/', function( req, res, next ) {
//   res.render( 'index', { title: 'Express' });
// });

// 배포용, 자기 폴더의 public과 index.html를 본다.
// router.get( '/', function( req, res, next ) {
//   res.sendFile(path.join(__dirname, '../public', 'index.html'))
// });

module.exports = router;
