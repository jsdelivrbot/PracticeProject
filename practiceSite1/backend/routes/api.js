var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var dbconfig = require('./database.js');
var connection = mysql.createConnection( dbconfig );

/* GET home page. */

// select query 를 처리하는데 반복적으로 쓰이는 코드를 추상화함.
function selectFunction( req, res, query ) {
  console.log( query );
  connection.query( query, function( err, rows ) {
    if( err ) {console.log("error!!" + query + req)}
    console.log(rows);
    res.send( rows )
  })
}

router.get( '/test', function( req, res ) {
  selectFunction( req, res, "SELECT * from notice" );
});

router.get( '/test2', function( req, res ) {
  selectFunction( req, res, 'SELECT * from faq' );
});

// 동네 입력시 해당 동네를 찾는다.
router.get('/gudong/:gudong', function( req, res ) {
  var gudong = req.params.gudong;
  selectFunction( req, res, `SELECT * from addr_gudong where dong like "%${gudong}%";` );
});

// 공지사항에 대해서 원하는 개수만큼 찾는다.
router.get('/notice/:offset', function( req, res ) {
  var offset = req.params.offset;
  selectFunction( req, res, `SELECT * from notice order by id desc limit ${offset}` );
});

module.exports = router;
