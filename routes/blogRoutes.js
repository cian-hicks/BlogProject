const express = require('express');
const router = express.Router(); //create instance of router
const blogController = require('../controllers/blogController');

//attach handler to router
router.get('/create', blogController.blog_create_get)
router.get('/', blogController.blog_index);
router.post('/', blogController.blog_create_post);
router.get('/:id', blogController.blog_details);
router.delete('/:id', blogController.blog_delete);

// export router
module.exports = router;

