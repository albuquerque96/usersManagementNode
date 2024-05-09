const Blog = require('./models/blog');

// Função para criar um novo usuário
exports.createBlog = async (blog) => {
    const newBlog = new Blog({
        author: blog.userId,
        content: blog.content,
      });
      await newBlog.save();
      
};

exports.getAllBlogs = async () => {
    Blog.find().then(blogs => {
        console.log(blogs);
        return blogs
    });
   };

  

exports.getMyBlogs = async (userId) => {
    Blog.findById(userId).then(blogs => {
        console.log(blogs);
        return blogs
      });
      
};

exports.updateBlog = async (blog) => {
     return  await Blog.findByIdAndUpdate(blog.blogId, blog.content);
};


exports.deleteBlog = async (blogId) => {
   return  await Blog.findByIdAndDelete(blogId);
};
