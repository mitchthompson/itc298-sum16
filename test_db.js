var Term = require("./models/term.js");

new Term({term:"API", definition:"An application programming interface is a set of routine definitions, protocols, and tools for building software and applications."}).save();
new Term({term:"MVC", definition:"A software architectural pattern for implementing user interfaces on computers. It divides a given software application into three interconnected parts, so as to separate internal representations of information from the ways that information is presented to or accepted from the user"}).save();
new Term({term:"CDN", definition:"A content delivery network or content distribution network is a globally distributed network of proxy servers deployed in multiple data centers. The goal of a CDN is to serve content to end-users with high availability and high performance."}).save();
new Term({term:"Node.js", definition:"An open-source, cross-platform runtime environment for developing server-side Web applications. Although Node.js is not a JavaScript framework, many of its basic modules are written in JavaScript, and developers can write new modules in JavaScript."}).save();
new Term({term:"Express.js", definition:"A Node.js web application server framework, designed for building single-page, multi-page, and hybrid web applications. It is the de facto standard server framework for node.js."}).save();
new Term({term:"Javascript", definition:"An object-oriented computer programming language commonly used to create interactive effects within web browsers."}).save();
new Term({term:"jQuery", definition:"A JavaScript library that allows web developers to add extra functionality to their websites. It is open source and provided for free under the MIT license. In recent years, jQuery has become the most popular JavaScript library used in web development."}).save();

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