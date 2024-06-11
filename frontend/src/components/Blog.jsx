import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/blog/${blog._id}`}>
        <Card.Img src={blog.image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/blog/${blog._id}`}>
          <Card.Title as="div" className='blog-title' style={{color: 'black'}}>
            <strong>{blog.title}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">{blog.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Blog;
