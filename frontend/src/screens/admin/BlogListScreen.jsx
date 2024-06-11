import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useParams, Link } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import Paginate from "../../components/Paginate";
import { toast } from "react-toastify";
import {
  useGetBlogsQuery,
  useCreateBlogMutation,
  useDeleteBlogMutation,
} from "../../slices/blogsApiSlice";

const BlogListScreen = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, error, refetch } = useGetBlogsQuery({ pageNumber });

  const [createBlog, { isLoading: loadingCreate }] = useCreateBlogMutation();
  const [deleteBlog, { isLoading: loadingDelete }] = useDeleteBlogMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Do you want to delete this blog post?")) {
      try {
        await deleteBlog(id);
        toast.success("Blog Post Deleted Successfully!");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const createBlogHandler = async () => {
    if (window.confirm("Do you want to create a new blog post?")) {
      try {
        await createBlog();
        // toast.success("Blog Post Created Successfully!");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Blog Posts</h1>
        </Col>
        <Col className="text-end">
          <Link to={'/createblogs'}>
          <Button className="btn-md m-3" onClick={createBlogHandler}>
            <FaEdit /> Create Blog Post
          </Button>
          </Link>
        </Col>
      </Row>

      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.data.message}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>TITLE</th>
                <th>DESCRIPTION</th>
                <th>IMAGE</th>
                <th>EDIT/DELETE</th>
              </tr>
            </thead>
            <tbody>
              {data.blogs.map((blog) => (
                <tr key={blog._id}>
                  <td>{blog._id}</td>
                  <td>{blog.title}</td>
                  <td>{blog.description}</td>
                  <td>
                    <img
                      src={blog.image}
                      alt={blog.title}
                      style={{ width: "50px", height: "50px" }}
                    />
                  </td>
                  <td>
                    <LinkContainer to={`/admin/blog/${blog._id}/edit`}>
                      <Button variant="light" className="btn-sm mx-2">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(blog._id)}
                    >
                      <FaTrash style={{ color: "white" }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={data.pages} page={data.page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default BlogListScreen;
