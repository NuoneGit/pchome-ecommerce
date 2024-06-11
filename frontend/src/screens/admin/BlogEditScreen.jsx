import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import {
    useGetBlogDetailsQuery,
    useUpdateBlogMutation,
  useUploadBlogImageMutation,
} from '../../slices/blogsApiSlice';

const BlogEditScreen = () => {
  const { id: blogId } = useParams();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');


  const {
    data: blog,
    isLoading,
    refetch,
    error,
  } = useGetBlogDetailsQuery(blogId);

  const [updateBlog, { isLoading: loadingUpdate }] =
    useUpdateBlogMutation();

  const [uploadBlogImage, { isLoading: loadingUpload }] =
    useUploadBlogImageMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateBlog({
        blogId,
        title,
        image,
        description
,
      }).unwrap(); // NOTE: here we need to unwrap the Promise to catch any rejection in our catch block
      toast.success('blog updated');
      refetch();
      navigate('/admin/bloglist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setImage(blog.image);
      setDescription(blog.description);
    }
  }, [blog]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadBlogImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link to='/admin/bloglist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Blog</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error.data.message}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter price'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
              ></Form.Control>
              <Form.Control
                label='Choose File'
                onChange={uploadFileHandler}
                type='file'
              ></Form.Control>
              {loadingUpload && <Loader />}
            </Form.Group>

            <Button
              type='submit'
              variant='primary'
              style={{ marginTop: '1rem' }}
            >
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default BlogEditScreen;