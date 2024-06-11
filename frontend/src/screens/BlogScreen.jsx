import { useParams, Link } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";

import { useGetBlogsQuery } from "../slices/blogsApiSlice"; // Correctly import the hook

const BlogScreen = () => {
  const { keyword = '', pageNumber = 1 } = useParams();

  const { data, isLoading, error } = useGetBlogsQuery({ keyword, pageNumber });

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <h1>Latest Blogs</h1>
          <Row>
            {data.blogs.map((blog) => (
              <Col key={blog._id} sm={12} md={6} lg={6} xl={4}>
                <Card className="my-4 p-4 rounded">
                  <Card.Img src={blog.image} variant="top" />
                  <Card.Body>
                    <Card.Title as="div">
                      <strong>{blog.title}</strong>
                    </Card.Title>
                    <Card.Text as="div">
                      <p>{blog.description}</p>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default BlogScreen;
