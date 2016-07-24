var express = require('express');
var app = express();
var terms = require('./lib/techTerms.js');

//express setup
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/../public'));
app.use(require("body-parser").urlencoded({extended: true}));

//handlebars setup
var handlebars = require('express-handlebars').create({
    defaultLayout: 'main',
    partialsDir: './views/partials' 
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

var goBack = "<br><br><a href='/'>Back</a>";
var allLink = "<br><br><a href='/all'>See all tech terms</a>";

app.get('/', function(req, res){
    res.type('text/html');
    res.render('home', {
        title: 'Home',
        terms: terms.allTechTerms()
    });
});

app.get('/detail/:term', function(req,res){
    res.type('text/html');
    var found = terms.getTechTerm(req.params.term);
    res.render('detail', {
        title: 'Detail',
        term: found
    });    
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
    var search = terms.getTechTerm(req.body.term);
    if(!search){
        res.render('detail', {
            title: 'Detail',
            result: true,
            term: req.body.term
        });
    }else {
        res.render('detail', {
            title: 'Detail',
            term: search
        });
    }  
});

app.post('/update', function(req,res){
    res.type('text/html');
    var update =  terms.updateTechTerm(req.body.term, req.body.defined);
    var found = terms.getTechTerm(req.body.term);
    res.render('detail', {
        title: 'Detail',
        term: found,
        updated: true
    });
});

app.post('/add', function(req,res){
    res.type('text/html');
    var add =  terms.addTechTerm(req.body.term, req.body.defined);
    if(!add){
        res.render('detail', {
            title: 'Detail',
            notAdded: true,
            term: req.body.term
        });
    }else {
        var newTerm = terms.getTechTerm(add); 
        res.render('detail', {
            title: 'Detail',
            added:true,
            term: newTerm
        });
    }  
});

app.post('/delete', function(req,res){
    res.type('text/html');
    var removed =  terms.removeTechTerm(req.body.term);
    res.render('home', {
        title: 'Home',
        removed: true,
        terms: terms.allTechTerms()
    });
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
