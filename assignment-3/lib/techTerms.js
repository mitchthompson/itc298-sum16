var techTerms = [
    {term: "mvc", defined: "A software architectural pattern for implementing user interfaces on computers. It divides a given software application into three interconnected parts, so as to separate internal representations of information from the ways that information is presented to or accepted from the user"},
    {term: "node.js", defined: "An open-source, cross-platform runtime environment for developing server-side Web applications. Although Node.js is not a JavaScript framework, many of its basic modules are written in JavaScript, and developers can write new modules in JavaScript."},
    {term: "express.js", defined: "A Node.js web application server framework, designed for building single-page, multi-page, and hybrid web applications. It is the de facto standard server framework for node.js."},
    {term: "javascript", defined: "An object-oriented computer programming language commonly used to create interactive effects within web browsers."},
    {term: "jquery", defined: "A JavaScript library that allows web developers to add extra functionality to their websites. It is open source and provided for free under the MIT license. In recent years, jQuery has become the most popular JavaScript library used in web development."},
];

var termsCount = techTerms.length + 1;

exports.getTechTerm = function(term){
    var found = techTerms.find(function(item) {
       return item.term == term;
    });
    
    if (found) {
        return "Definition: " + found.defined;
    } else {
        return term + " not found";
    }
};

exports.updateTechTerm = function(term, defined){
    var found = techTerms.find(function(item) {
       return item.term == term;
    });
    if (found) {
        if (defined != ''){
            found.term = term;
            found.defined = defined;    
            return term + " updated!"
        }else{
            return "You do not enter a new defintion for " + term;
        }
    } else {
        return term + " not found";
    }
};

exports.addTechTerm = function(term, defined){
    var found = techTerms.find(function(item) {
       return item.term == term;
    });
    
    if (found) {
        return term + " already in list!";
    } else {
        techTerms.push({
            term: term,
            defined: defined    
            });
        termsCount += 1;
        return term + " added to tech terms list! There are now " + termsCount + " Tech Terms in the list.";
    }
};

exports.removeTechTerm = function(term){
    var found = techTerms.find(function(item) {
        if (item.term == term){
             delete item.defined;
             return delete item.term;
        }
    });
    
    if (found) {
        termsCount -= 1;
        return term + " deleted. There are now " + termsCount + " Tech Terms in the list.";
    } else {
        return term + " not found";
    }
};

exports.allTechTerms = function(){
    var allTerms = "<ul>";
    for (i = 0; i < techTerms.length; i++) {
        if (techTerms[i].term != undefined){;
          allTerms += "<li><b>Term:</b> " + techTerms[i].term + "<br>" +
                     "<i>Definition</i>: " + techTerms[i].defined + "</li><br>";       
        }
    }
    allTerms += "</ul>"
    return allTerms;
};
