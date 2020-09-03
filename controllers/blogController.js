//blog_index, blog_details, blog_create_get, blog_create_post, blog_delete
const Blog = require('../models/blog'); 


const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1}) //sort by descending order, ie: newest to oldest
    .then((result) => {
        res.render('index', {blogs: result, title: 'All Blogs'})
    })
        .catch((err) => {
            console.log(err)
        })
}

const blog_details = (req, res) => {
    const id = req.params.id;//(id comes from the path defined above :id )
    Blog.findById(id) //once we get the result we want to render a details page so we need to create a details view
        .then(result => {
            res.render('details', {blog: result, title: 'Blog Details'});
        })
            .catch(err => {
                res.status(404).render('404', {title: 'Blog not found'});
            })
}

const blog_create_get = (req, res) => {
    res.render('create', {title: 'Create a new Blog'});
}

const blog_create_post = (req, res) => {
    //console.log(req.body); //can only do this when using middleare .urlextender.
 const blog = new Blog(req.body); //new instance of blog with title, snippet and body.
   
 blog.save()
     .then((result) => {
         res.redirect('/blogs')
     })
         .catch(err => {
             console.log(err); 
         })
}

const blog_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs'})
        })
            .catch(err => {
                console.log(err);
            })
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}



 