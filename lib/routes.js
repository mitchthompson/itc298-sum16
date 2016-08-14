module.exports = function(app){
    var TermModel = require('../models/term.js');

    app.get('/', function(req, res){
        res.type('text/html');
        TermModel.find(function (err, allterms){
            if (err) return next(err);
            res.render('home', {
            title: 'Home',
            terms: allterms
            });
        });
    });
    

    app.get('/detail/:term', function(req,res){
        res.type('text/html');
        var term = req.params.term;
        
        TermModel.findOne({'term': term}, function (err, found_term){
            if(err) return next(err);
            if(!found_term){
                res.render('detail', {
                    title: 'Detail',
                    result: true,
                    term: term
                });
            }else {
                res.render('detail', {
                    title: 'Detail',
                    term: found_term
                });
            }  
        });  
    });

    app.get('/about', function(req, res){;
        res.send('about');
    });
    
    //old
    app.get('/all', function(req,res){
        res.type('text/html');
        var header = '<h1>List of all tech terms</h1>';
        var result =  terms.allTechTerms();
        res.send(header + result + goBack);
    });

    app.post('/search', function(req,res){
        res.type('text/html');
        var term = req.body.term;
        TermModel.findOne({'term': {'$regex' : '^' + term, '$options' : 'i'}}, function (err, found_term){
            if(err) return next(err);
            if(!found_term){
                res.render('detail', {
                    title: 'Detail',
                    result: true,
                    term: term
                });
            }else {
                res.render('detail', {
                    title: 'Detail',
                    term: found_term
                });
            }  
        });
    });

    app.post('/update', function(req,res){
        res.type('text/html');        
        TermModel.findOneAndUpdate(
            {'term': {'$regex' : '^' + req.body.term, '$options' : 'i'}},
            { $set: {"definition":req.body.defined}}, 
            function(err, result){
            if(err) return next(err);
        });
        TermModel.findOne({'term': {'$regex' : '^' + req.body.term, '$options' : 'i'}}, function (err, found_term){
            if(err) return next(err);
            if(found_term){
                    res.render('detail', {
                        title: 'Detail',
                        term: found_term,
                        updated: true
                    });
                }else{
                    res.render('detail', {
                            title: 'Detail',
                            term: req.body.term,
                            updated: false
                        });
                }
        }); 
    });

    app.post('/add', function(req,res){
        res.type('text/html');
        
        var new_term = {"term":req.body.term, "definition":req.body.defined};
        TermModel.findOne({'term': {'$regex' : '^' + req.body.term, '$options' : 'i'}}, function (err, found_term){
            if(err) return next(err);
            if (found_term) {
                res.render('detail', {
                    title: 'Detail',
                    notAdded: true,
                    term: req.body.term 
                });            
            } else {
                new TermModel(new_term).save(function(err){
                   res.render('detail', {
                    title: 'Detail',
                    added:true,
                    term: new_term
                });  
                    
                });
            }
        });
        
    });

    app.post('/delete', function(req,res){
        res.type('text/html');
        TermModel.findOneAndRemove({'term': {'$regex' : '^' + req.body.term, '$options' : 'i'}},
            function (err, found_term){
            if(err) return next(err);
            TermModel.find(function (err, allterms){
            if (err) return next(err);
                res.render('Home', {
                    title: 'Home',
                    removed: true,
                    terms: allterms
                });
            }); 
        });
    });
    
    
    //API for routes
    app.get('/api/techterms', function(req,res) {
       TermModel.find(function (err, terms) {
            if (err) return next(err);
            if (terms) {
                res.json(terms);    
            } else {
                res.status(404).send("404 - not found");    
            }
       });
        
    });
    
    app.get('/api/detail/:term', function(req,res) {
        TermModel.findOne({"term": {'$regex' : '^' + req.params.term, '$options' : 'i'}}, function (err, found) {
            if (found) {
                res.json(found);    
            } else {
                res.status(404).send("404 - not found");    
            }
        });
    });
}