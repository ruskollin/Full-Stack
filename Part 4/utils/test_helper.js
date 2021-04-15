const Blog = require('../models/blog');

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((u) => u.toJSON());
};

module.exports = {
  blogsInDb,
};