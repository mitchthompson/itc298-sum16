var express = require('express');
var app = express();
var terms = require('./lib/techTerms.js');

var goBack = "<br><br><a href='/'>Back</a>";
var allLink = "<br><br><a href='/all'>See all tech terms</a>";

//express setup
app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));
app.use(require("body-parser").urlencoded({extended: true}));

app.get('/', function(req, res){
    var options = { root: __dirname + '/public/' }
    res.sendFile('home.html', options); 
});

app.get('/about', function(req, res){;
    res.send('about');
});

app.get('/all', function(req,res){
    res.type('text/html');
    var header = '<h1>List of all tech terms</h1>';
    var result =  terms.allTechTerms();
    res.send(header + result + goBack);
});

app.post('/search', function(req,res){
    res.type('text/html');
    var header = 'Searching for: ' + req.body.term + '<br>';
    var result =  terms.getTechTerm(req.body.term);
    res.send(header + result + allLink + goBack);
});

app.post('/update', function(req,res){
    res.type('text/html');
    var update =  terms.updateTechTerm(req.body.term, req.body.defined);
    res.send(update + allLink + goBack);
});

app.post('/add', function(req,res){
    res.type('text/html');
    var add =  terms.addTechTerm(req.body.term, req.body.defined);
    res.send(add + allLink + goBack);
});

app.post('/delete', function(req,res){
    res.type('text/html');
    var removed =  terms.removeTechTerm(req.body.term);
    res.send(removed + allLink + goBack);
});


//404 catch-all handler
app.use(function(req,res){
    res.status(404);
    var options = { root: __dirname + '/public/' }
    res.sendFile('404.html', options); 
});

//500 catch-all handler (middleware)
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.send('500 - Server Error');
});

app.listen(app.get('port'), function(){
    console.log('Express started on http:/localhost:' +
               app.get('port') + '; press Ctrl-C to terminate.');
});
