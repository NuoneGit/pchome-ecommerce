import asyncHandler from '../middleware/asyncHandler.js';
import Blog from '../models/blogModel.js';

// @desc   Fetch all blogs
// @route  GET /api/blogs
// @access Public
const getBlogs = asyncHandler(async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? { title: { $regex: req.query.keyword, $options: 'i' } }
    : {};

  const count = await Blog.countDocuments({ ...keyword });
  const blogs = await Blog.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ blogs, page, pages: Math.ceil(count / pageSize) });
});

// @desc   Fetch a blog
// @route  GET /api/blogs/:id
// @access Public
const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    return res.json(blog);
  } else {
    res.status(404);
    throw new Error('Blog not found');
  }
});

// @desc   Create a blog
// @route  POST /api/blogs
// @access Private
const createBlog = asyncHandler(async (req, res) => {
  const {
    title,
    image,
    description
  } = req.body;
 try{
  const blog = new Blog({
    title,
    user: req.user._id,
    image,
    description,
   
  });

  const createdBlog = await blog.save();
  res.status(201).json(createdBlog);
}catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc   Update a blog
// @route  PUT /api/blogs/:id
// @access Private/Admin
const updateBlog = asyncHandler(async (req, res) => {
  const { title, image, description  } = req.body;

  const blog = await Blog.findById(req.params.id);

  if (blog) {
    blog.title = title;
    blog.image = image;
    blog.description = description;
    
    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } else {
    res.status(404);
    throw new Error('Blog not found');
  }
});

// @desc   Delete a blog
// @route  DELETE /api/blogs/:id
// @access Private/Admin
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    await Blog.deleteOne({ _id: blog._id });
    res.status(200).json({ message: 'Blog deleted' });
  } else {
    res.status(404);
    throw new Error('Blog not found');
  }
});

export {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};
