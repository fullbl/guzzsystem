var express = require('express');
var DBUtils = require('../db/DBUtils')
var router = express.Router();
var debug = require('debug')('guzzsystem:routing');
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
var config = require('config');

var authCheck = jwt({
  secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: config.get('auth0.jwksUri')
    }),
    // This is the identifier we set when we created the API
    aud: config.get('auth0.audience'),
    issuer: config.get('auth0.issuer'),
    algorithms: ['RS256']
});

var handleError = function(res){
	return (error) =>{
		debug(error);
		res.status(500);
		res.send({"message":error});
	};
};

router.get('/', function(req, res, next) {
	res.send('alive');
});

router.get('/bar', authCheck, function(req, res, next) {
	req.query.type = 'bar';
	DBUtils.read(req.query, function(data){
		res.send(data);
	},handleError(res));
});

router.post('/bar', authCheck, function(req, res, next) {
	req.body.type = 'bar';
	DBUtils.write(req.body, function(){
		res.send({"message":"salvato"});
	},handleError(res));
});

router.get('/ingresso', authCheck, function(req, res, next) {
	req.query.type = 'ingresso';
	DBUtils.read(req.query, function(data){
		res.send(data);
	},handleError(res));
});

router.post('/ingresso', authCheck, function(req, res, next) {
	req.body.type = 'ingresso';
	DBUtils.write(req.body, function(){
		res.send({"message":"salvato"});
	},handleError(res));
});

router.get('/list', authCheck, function(req, res, next) {
	DBUtils.list(req.query, function(data){
		res.send(data);
	},handleError(res));
});


module.exports = router;
