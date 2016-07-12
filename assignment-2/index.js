var express = require('express');
var app = express();

var techTerms = [
    {id: 0, term: "mvc", defined: "A software architectural pattern for implementing user interfaces on computers. It divides a given software application into three interconnected parts, so as to separate internal representations of information from the ways that information is presented to or accepted from the user"},
    {id: 1, term: "node.js", defined: "An open-source, cross-platform runtime environment for developing server-side Web applications. Although Node.js is not a JavaScript framework, many of its basic modules are written in JavaScript, and developers can write new modules in JavaScript."},
    {id: 2, term: "express.js", defined: "A Node.js web application server framework, designed for building single-page, multi-page, and hybrid web applications. It is the de facto standard server framework for node.js."},
    {id: 3, term: "javascript", defined: "An object-oriented computer programming language commonly used to create interactive effects within web browsers."},
    {id: 4, term: "jquery", defined: "A JavaScript library that allows web developers to add extra functionality to their websites. It is open source and provided for free under the MIT license. In recent years, jQuery has become the most popular JavaScript library used in web development."},
];

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

app.post('/search', function(req,res){
    res.type('text/html');
    var header = 'Searching for: ' + req.body.term + '<br>';
    var found = techTerms.find(function(item) {
       return item.term == req.body.term;
    });
    
    if (found) {
        res.send(header + "Definition: " + found.defined);
    } else {
        res.send(header + "Not found");
    }
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
