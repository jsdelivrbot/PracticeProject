var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var dbconfig = require('./database.js');
var connection = mysql.createConnection( dbconfig );

/* GET home page. */
router.get( '/', function( req, res, next ) {
  res.render( 'index', { title: 'Express' });
});

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

router.get('/gudong/:gudong', function( req, res ) {
  var gudong = req.params.gudong;
  var selectQuery = `SELECT * from addr_gudong where dong like "%${gudong}%";`;
  selectFunction( req, res, selectQuery );
});

router.get('/notice/:offset', function( req, res ) {
  var offset = req.params.offset;
  var selectQuery = `SELECT * from notice order by id desc limit ${offset}`;
  selectFunction( req, res, selectQuery );
});

module.exports = router;
