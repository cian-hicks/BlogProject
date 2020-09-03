const http = require('http');
const fs = require('fs'); //import file system
const _ = require('lodash');
//takes callback function that will run everytime a request comes into server.
//access to 2 different objects in callback. 1st is the request object and second is the response object.
//req obj come loaded with info about request. ex:(url, request type(get, post))
//res obj is used to send response to the user 
//alone this is just a server floating in file not doing anything, it is not activley listening for requests
// to do this we need to invoke the listen method
const server = http.createServer((req, res) => {
//lodash method examples
    const num = _.random(0,20);
    console.log(num);

    const greet = _.once(() => {
        console.log('hello');
    });
    greet();

//set header content type
    res.setHeader('Content-Type', 'text/html')//metadata
    //basic routing using switch case. all html file in the view folder
    //if case match then we add dpages to the path.
    //default status code is 200 ie everything is ok
    //this is raw node way of dealing with routing, we can use express which is a simpler and cleaner way of doing all this. However it is good to know what goes on under the hood in node
    let path = './views/';
    switch(req.url){
        case '/': 
          path += "index.html";
          res.statusCode = 200;     //adds status codes 
         break;

        case '/about':
          path += "about.html";
          res.statusCode = 200;
         break;

         //redirect example. about-me -> about
        case '/about-me':
          path += "about.html";
          res.statusCode = 301;     //resource moved
          res.setHeader('Location', './about');
          res.end();
         break;

        default:
          path += "404.html";
          res.statusCode = 404;     //error 404
         break;
    }
    //take resulting path from abouve and use it to send the html file
    //send html file
    fs.readFile(path, (err, data) => {
        if(err){
            console.log(err);
            res.end();
        } else {
            //res.write(data);//if only writing one response you can put that data into the .end() method like so end(data)
            res.end(data);
        }
    });


}); 

//first arg is port #, second is host name(default value is local host), third is function that fires when we start listening 
//now listening for requests on server host and 3000 port #
//ongoing process that waits for request.
server.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000');
});
