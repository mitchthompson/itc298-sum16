var http = require('http');
var fs = require('fs');

function serveStaticFile(res, path, ContentType, responseCode){
                
                if(!responseCode) responseCode = 200;
    
                fs.readFile(__dirname + path, function(err, data) {
                    
                    if(err) {
                        console.log(err);
                        res.writeHead(500, { 'Content-Type': 'text/plain'});
                        res.end("500 - Internal Error");
                        
                    } else {
                        
                        res.writeHead(responseCode, { 'Content-Type': ContentType });
                        res.end(data);
                        
                    }
                    
                    
                });
}

http.createServer(function(req, res){
    
                var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
                switch(path) {
                        
                    case '': 
                        serveStaticFile(res, '/public/home.html', 'text/html');
                        break;
                        
                    case '/about':
                        serveStaticFile(res, '/package.json', 'text/html');
                        break;                      
                    
                    default:
                        serveStaticFile(res, '/public/404.html', 'text/html', 404);
                        break;
                        
                }
    
}).listen(3000);

//fs.readFile(__dirname + '/package.json', 'utf8', function(err, data){
//    if (err) {
//        console.log(err);
//    } else {
//        
//        fs.writeFile(__dirname + '/public/about.html', data.name, function(err) {
//            if (err){
//                console.log(err)
//            }
//        });
//    }
//        
//});   

console.log('Server started on localhost:3000; press Ctrl-C to termiate...');
