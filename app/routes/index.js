var express = require('express');
var DBUtils = require('../db/DBUtils')
var router = express.Router();

router.post('/bar', function(req, res, next) {
	req.body.type = 'bar';
	DBUtils.write(req.body).then(function(){
		res.send('');
	});
});


module.exports = router;
