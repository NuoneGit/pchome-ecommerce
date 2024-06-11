import express from 'express';
const router = express.Router();
import {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} from '../controllers/blogController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';
import Blog from '../models/blogModel.js';

router.route('/').get(getBlogs).post(protect, admin, createBlog);

router.route('/:id').get(checkObjectId, getBlogById).put(protect, admin, checkObjectId, updateBlog).delete(protect, admin, checkObjectId, deleteBlog);

// Define the route to add a new product
router.post('/add', async (req, res) => {
  const {
    title,
    image,
    description,
  } = req.body;

  try {
    const blog = new Blog({
      title,
      image,
      description,
    });

    const createdBlog = await blog.save();
    res.status(201).json(createdBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
