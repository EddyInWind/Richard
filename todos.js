var express = require('express');
var router = express.Router();
var dbHandler = require('./dbHandler');

var cachedAll;
router.get('/', function(req, res){
	dbHandler.queryQuotesAll().then(function(quotesAry){
		if (!cachedAll)	{
			var quotesObj = {};
			for (var i = 0; i < quotesAry.length; i++) {
				var data = quotesAry[i];	// like this: {"id":1,"year":"1732","quote":"A abc ttest"}
				if (!(data.year in quotesObj)) {
					quotesObj[data.year] = [];
				}
				quotesObj[data.year].push(data);
			}
			cachedAll = quotesObj;
		}
		res.render('index', {
			title: "Poor Richard's Almanack", 
			quotesObj: cachedAll
		});
	});
	
})

router.get('/articles', function(req, res){
	res.render('articles');
})

router.post('/addQuote', function(req, res){
	var quoteYear = req.body.quoteYear;
	var newQuote = req.body.newQuote;
	dbHandler.insertQuote({
		year: quoteYear,
		quote: newQuote
	})
	cachedAll = null;
	res.redirect('/');
})

router.post('/deleteQuote', function(req, res){
	var id = req.body.id;
	dbHandler.deleteQuote(id).then(function(){
		dbHandler.queryQuotesAll().then(function(quotesAry){
			var quotesObj = {};
			for (var i = 0; i < quotesAry.length; i++) {
				var data = quotesAry[i];	// like this: {"id":1,"year":"1732","quote":"A abc ttest"}
				if (!(data.year in quotesObj)) {
					quotesObj[data.year] = [];
				}
				quotesObj[data.year].push(data);
			}
			cachedAll = quotesObj;
			res.send(id);
			//res.end();
		})
	}, function (err) {
		res.send('Fail');
	})
})

module.exports = router;