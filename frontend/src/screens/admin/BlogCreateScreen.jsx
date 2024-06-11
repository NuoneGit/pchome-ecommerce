import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loader from '../../components/Loader';

const BlogCreateScreen = () => {
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    description: '',

  });
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const fileData = new FormData();
    fileData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('http://localhost:5000/api/upload', fileData, config);
      setFormData((prevFormData) => ({ ...prevFormData, image: data.image }));
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
      toast.error('Error uploading image');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await axios.post('http://localhost:5000/api/blogs/add', formData);
      console.log("Successfully Added", response.data);
      toast.success("Blog Post Created Successfully!");
      navigate('/admin/bloglist');
    } catch (error) {
      console.error('Error adding data:', error); 
      toast.error('Error adding blog post');
    }
  };
  

  return (
    <FormContainer>
      <Link to='/admin/bloglist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <h1>Create Blog Post</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='title'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type='text'
            name='title'
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId='image'>
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter image url or choose a file'
            value={formData.image}
            onChange={handleChange}
            required
          />
          <Form.Control
            type='file'
            onChange={uploadFileHandler}
          />
          {uploading && <Loader />}
        </Form.Group>

        <Form.Group controlId='description'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type='text'
            name='description'
            value={formData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>



        <Button type='submit' variant='primary'>
          Submit
        </Button>
      </Form>
    </FormContainer>
  );
};

export default BlogCreateScreen;
