import React, { useState } from "react";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { BiPhoneCall, BiInfoCircle } from "react-icons/bi";
import { Form, Row, Col, Button } from "react-bootstrap";
import { toast } from "react-toastify";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    comments: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { name, email, mobile, comments } = formData;
    const newErrors = {};

    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    if (!mobile) newErrors.mobile = "Mobile number is required";
    if (!comments) newErrors.comments = "Comments are required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);

      // Simulate form submission
      setTimeout(() => {
        setLoading(false);
        toast.success("Form submitted successfully!");
      }, 2000);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Row>
        <Col md={12}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106492.9585624268!2d80.56735655656504!3d7.289863063440027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae367d494c7ee39%3A0xb17d85f2446511aa!2sPC%20Home%20Computer%20System!5e0!3m2!1sen!2slk!4v1716083711893!5m2!1sen!2slk"
            width="600"
            height="450"
            className="border-0 w-100"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Location of PC Home Computer System"
          ></iframe>
        </Col>

        <Col md={12} className="mt-5">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "2rem",
            }}
          >
            <div>
              <h3 className="contact-title mb-4">Contact</h3>
              <Form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                  maxWidth: "600px",
                  width: "100%",
                }}
              >
                <Form.Group controlId="name">
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    aria-label="Name"
                    style={{ width: "500px" }}
                  />
                  {errors.name && (
                    <span className="text-danger">{errors.name}</span>
                  )}
                </Form.Group>
                <Form.Group controlId="email">
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    aria-label="Email"
                    style={{ width: "100%" }}
                  />
                  {errors.email && (
                    <span className="text-danger">{errors.email}</span>
                  )}
                </Form.Group>
                <Form.Group controlId="mobile">
                  <Form.Control
                    type="tel"
                    name="mobile"
                    placeholder="Mobile Number"
                    value={formData.mobile}
                    onChange={handleChange}
                    aria-label="Mobile Number"
                    style={{ width: "100%" }}
                  />
                  {errors.mobile && (
                    <span className="text-danger">{errors.mobile}</span>
                  )}
                </Form.Group>
                <Form.Group controlId="comments">
                  <Form.Control
                    as="textarea"
                    name="comments"
                    rows={4}
                    placeholder="Comments"
                    value={formData.comments}
                    onChange={handleChange}
                    aria-label="Comments"
                    style={{ width: "100%" }}
                  />
                  {errors.comments && (
                    <span className="text-danger">{errors.comments}</span>
                  )}
                </Form.Group>
                <Button
                  type="submit"
                  className="button border-0"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </Button>
              </Form>
            </div>
            <div>
              <h3 className="contact-title mb-4">Get in touch with us</h3>
              <ul className="ps-0">
                <li
                  className="mb-3 d-flex gap-15 align-items-center"
                  style={{ gap: "1rem" }}
                >
                  <AiOutlineHome className="fs-5" />
                  <address className="mb-0">
                    No. 234, D.S. Senanayke Street, Kandy, Sri Lanka
                  </address>
                </li>
                <li
                  className="mb-3 d-flex gap-15 align-items-center"
                  style={{ gap: "1rem" }}
                >
                  <BiPhoneCall className="fs-5" />
                  <p className="mb-0">(+94) 77 2 982 666</p>
                </li>
                <li
                  className="mb-3 d-flex gap-15 align-items-center"
                  style={{ gap: "1rem" }}
                >
                  <AiOutlineMail className="fs-5" />
                  <p className="mb-0">pchome@gmail.com</p>
                </li>
                <li
                  className="mb-3 d-flex gap-15 align-items-center"
                  style={{ gap: "1rem" }}
                >
                  <BiInfoCircle className="fs-5" />
                  <p className="mb-0">Monday – Friday 10 AM – 6 PM</p>
                </li>
              </ul>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Contact;
