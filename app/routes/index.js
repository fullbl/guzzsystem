var express = require('express');
var DBUtils = require('../db/DBUtils')
var router = express.Router();
var debug = require('debug')('guzzsystem:routing');

router.get('/', function(req, res, next) {
	res.send('alive');
});
router.post('/bar', function(req, res, next) {
	req.body.type = 'bar';
	DBUtils.write(req.body, function(){
		res.send({"message":"ok"});
	},function(error){
		res.status(500);
		res.send({"message":error});
	});
});


module.exports = router;
