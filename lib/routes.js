module.exports = function(app){
    var terms = require('./techTerms.js');

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
    
    //API for routes
    app.get('/api/techterms', function(req,res) {
       var found = terms.allTechTerms();
       if (found) {
           res.json(found);
       }else{
           res.status(404).send("404 - not found");   
       }
        
    });
    
    app.get('/api/detail/:term', function(req,res) {
        var found = terms.getTechTerm(req.params.term);
        if(found){
            res.json(found);
        }else{
            res.status(404).send("404 - not found"); 
        }
    });
}