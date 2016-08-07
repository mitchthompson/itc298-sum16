var Term = require("./models/term.js");

new Term({term:"API", definition:"An application programming interface is a set of routine definitions, protocols, and tools for building software and applications."}).save();
new Term({term:"CDN", definition:"A content delivery network or content distribution network is a globally distributed network of proxy servers deployed in multiple data centers. The goal of a CDN is to serve content to end-users with high availability and high performance."}).save();


// find all documents 
Term.find(function(err, terms) {
    // output error if one occurred
    if (err) {
        console.log(err);
    } else {
        // otherwise output the array of documents
        console.log(terms);
    }
});