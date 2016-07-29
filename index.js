var express = require('express');
var app = express();

//express setup
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/../public'));
app.use(require("body-parser").urlencoded({extended: true}));
app.use('/api', require('cors')()); // set Access-Control-Allow-Origin header for api route

//handlebars setup
var handlebars = require('express-handlebars').create({
    defaultLayout: 'main',
    partialsDir: './views/partials' 
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

var routes = require('./lib/routes.js')(app);

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