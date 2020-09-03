const mongoose = require('mongoose');
const { truncate } = require('fs');
const Schema = mongoose.Schema;// schema defines the structure of the documents that we later store in a collection. The thing that a model wraps around. 

//new instance of schema obj
const blogSchema = new Schema ({
    author: {
        type: String, 
        required: true
    },
    category: {
        type: Array,
        required: true
    },
    title: {
        type: String, 
        required: true
    },
    snippet: {
        type: String, 
        required: true
    },
    body: {
        type: String, 
        required: true
    }
    
}, {timestamps: true }); // 2nd arg automatically generates timestap properties on our blog entries.
//auto assign values to properties.

//model give Capital letter
//model method takes name of this model, name is important. It look at name, pluralizes it and then looks for that 
//collection in db whenever we use the model in the future to communicate with the database. 
//when it connects it will look for blogs collection in mongodb

// 2nd arg is the schema that we want to base this model on. In this case it is the blogSchema created above.
const Blog = mongoose.model('Blog', blogSchema);

//finally export model so we can use it elsewhere in the project.

module.exports = Blog;



