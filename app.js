//express app
const express = require('express'); //require express, returns functionl that is stored in express 
const morgan = require('morgan');
const mongoose = require('mongoose');
const { ESRCH } = require('constants');
const blogRoutes = require('./routes/blogRoutes');

//express app 
const app = express();  //setup express app, //invoking function to create an instance of express app which is stored in app

//connect to mongodb
const dbURI = "mongodb+srv://hix258:test189@cluster0.92gl4.mongodb.net/node-tuts?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }) //2nd arg stops deprecation warning.
    .then(result => app.listen(3000))//listen for requests after the connection is complete, dont want server listening for requests until connection has been made
    //for ex if user wants to go go to the homepage but the homepage lists data connected to the database. Then we cant show that until the connection to the DB has been established 
    .catch(err => console.log(err));
//register view engine
app.set('view engine', 'ejs');
app.set('views', 'views_ejs');

//middleware and static files(css, images that are going to be made public)
app.use(express.static('public'));//create folder called public, this will make any file in that folder available as a static file to the front end.
app.use(express.urlencoded({extended: true}))
//3rd party middleware(morgan) using next stops the hangups on the middleware. 
//just need to invoke it 
app.use(morgan('dev'));
app.use((req,res,next) => {
    res.locals.path = req.path;
    next();
});

//-----------------------------------------------------------------------------------------------------------------------------------------------------
// //mongoose and mongo sandbox routes, to demonstrate interactions with database. 
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({    //create instance of blog document
//     title: 'new blog 2',
//     snippet: 'about new blog',
//     body: 'more about new blog'
//     });
//     blog.save()
//         .then((result) => {
//             res.send(result);
//         })
//             .catch((err) => {
//                 console.log(err);
//             })
// });

// //find a single blog
// app.get('/single-blog', (req, res) => {
//     Blog.findById("5f23304e5351c68313edfc03")
//         .then((result) => {
//             res.send(result) //send result to the browser
//         })
//             .catch((err) => {
//                 console.log(err);// catch any error ifg there is one and log it
//             })
// });


// //get all the blogs from collection 
// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//     .then((result) => {
//         res.send(result);
//     })
//         .catch((err) => {
//             console.log(err);
//         })
// });
//-----------------------------------------------------------------------------------------------------------------------------------------------------

//routes
//get request for home page
app.get('/', (req, res) => {
    //express method that infers content type of message being sent to the server and automatically sets the header
    // also infers the status code.
    //res.send('<p>home page</p>'); 
    
    //need to tell express where path is relative from so we need to pass an options object that specifies what  the route should be and where it is relative to.
    //says {root: __dirname} is the folder and that the path is relative, forom project folder to views folder to index.html file
     res.redirect('/blogs');
});

//if middle ware was placed after the home page request and we were to go to the homepage 
// the middleware will not run because the homepage response was sent to the browser.

app.get('/about', (req, res) => {
    //res.send('<p>about page</p>');
    res.render('about', {title: 'About'});
});
 
//blog routes
app.use('/blogs/', blogRoutes) //applies all handlers to the app

// 404 PAGE if someone goes to the wrong url
//use() creates middle ware and fires middleware function in express.
app.use((req, res) => { //use function fires for every request coming in but only if it reaches this point in the code
    //once express finds a match it will stop and not continue down the code so none of the other functions will fire even if there is a match because we sent a respnse.
    //if by this point there has not been a match then it will fire this function. 
    //this use function says use its callback function for every incoming request, not scoped out to a particular url and will send 404 page to browser.
    //this must be at the bottom because if not it will be the first to match and express will stop reading the code and the other hanmdlers will not be reached. 
    res.render('404', {title: 'ERROR: 404'});
    res.status(404)//sends 404 page to browser
    //express doesnt realize this is a 404 page so we need to set a 404 status code 
});
