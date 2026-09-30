import "bootstrap/dist/css/bootstrap.min.css";

import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState("");

  useEffect(() => {
    axios({
      url: apiUrl + "/book/" + id,
      method: "get",
    })
      .then((res) => {
        setBook(res.data.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  return (
    <Container className="py-4">
      <Button
        variant="secondary"
        className="mb-4"
        onClick={() => navigate("/books")}
      >
        ← Back
      </Button>

      <Card className="shadow-sm border-0">
        <Card.Body>
          <Row>
            <Col md={4} className="text-center">
              <img
                src={book.bookImage}
                alt={book.bookTitle}
                style={{
                  width: "100%",
                  maxWidth: "350px",
                  height: "450px",
                  objectFit: "contain",
                }}
              />
            </Col>

            <Col md={8}>
              <h2 className="fw-bold">{book.bookTitle}</h2>

              <p className="text-muted fs-5">By {book.authorName}</p>

              <div className="mb-3">
                <Badge bg="success">★ {book.rating || "0"}</Badge>

                <span className="ms-2 text-muted">
                  {book.reviews || "0"} Reviews
                </span>
              </div>

              <hr />

              <div className="mb-4">
                <span className="fs-1 fw-bold">₹{book.finalPrice}</span>

                {book.originalPrice && (
                  <span className="ms-3 text-muted text-decoration-line-through fs-5">
                    ₹{book.originalPrice}
                  </span>
                )}

                {book.discount && (
                  <span className="ms-3 text-success fw-bold">
                    {book.discount}

                    {book.discountType === "percentage" ? "% off" : " off"}
                  </span>
                )}
              </div>

              {book.shortDescription && (
                <div className="mb-4">
                  <h5 className="fw-bold">About this book</h5>

                  <p>{book.shortDescription}</p>
                </div>
              )}

              <h5 className="fw-bold mb-3">Book Details</h5>

              <BookDetailLocal label="Author" value={book.authorName} />

              <BookDetailLocal label="Publisher" value={book.publisher} />

              <BookDetailLocal
                label="Publication Year"
                value={book.publicationYear}
              />

              <BookDetailLocal label="ISBN" value={book.isbnNo} />

              <BookDetailLocal label="Edition" value={book.edition} />

              <BookDetailLocal label="Language" value={book.language} />

              <BookDetailLocal label="Genre" value={book.genre} />

              <BookDetailLocal label="Category" value={book.bookCategory} />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {book.description && (
        <Card className="shadow-sm border-0 mt-4">
          <Card.Body>
            <h4 className="fw-bold">Description</h4>

            <p className="mt-3">{book.description}</p>
          </Card.Body>
        </Card>
      )}

      <Card className="shadow-sm border-0 mt-4">
        <Card.Body>
          <h4 className="fw-bold mb-3">Product Information</h4>

          <BookDetail label="Country of Origin" value={book.countryOfOrigin} />

          <BookDetail label="Manufacturer" value={book.nameOfManufacturer} />

          <BookDetail
            label="Manufacturer Address"
            value={book.addressOfManufacturer}
          />

          <BookDetail label="Packager" value={book.nameOfPackager} />

          <BookDetail label="Packager Address" value={book.addressOfPackager} />
        </Card.Body>
      </Card>
    </Container>
  );
}

function BookDetailLocal({ label, value }) {
  return (
    <Row className="border-bottom py-2">
      <Col xs={5} className="text-muted">
        {label}
      </Col>

      <Col xs={7} className="fw-semibold">
        {value || "-"}
      </Col>
    </Row>
  );
}

export default BookDetail;
