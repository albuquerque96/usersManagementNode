const express = require('express');
const Blog = require('../controllers/blogController')
const router = express.Router();


router.post('/blog', (req, res) => {
    Blog.createBlog(req.body)
});

router.put('/blog/:blogid', (req, res) => {
 Blog.updateBlog(req.body)
});

router.delete('/blog/:blogid', (req, res) => {
    Blog.deleteBlog()
  });
  

module.exports = router;
