import { useEffect, useState } from "react";
import axios from "axios";

import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Spinner,
  Table
} from "react-bootstrap";

const apiUrl = import.meta.env.VITE_API_URL;


const ProductAvailability = () => {

  const [books, setBooks] = useState([]);

  const [bookId, setBookId] = useState("");
  const [pincode, setPincode] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);

  const [availabilityList, setAvailabilityList] = useState([]);

  const [loading, setLoading] = useState(false);
  const [bookLoading, setBookLoading] = useState(true);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");


  // GET BOOKS
  useEffect(() => {

    axios
      .get(`${apiUrl}/books`)
      .then((response) => {

        setBooks(
          response.data.data || response.data
        );

      })
      .catch((error) => {

        console.log(error);

      })
      .finally(() => {

        setBookLoading(false);

      });

  }, []);


  // GET AVAILABILITY
  const getAvailability = async () => {

    try {

      const response =
        await axios.get(
          `${apiUrl}/availability`
        );

      setAvailabilityList(
        response.data.data || []
      );

    } catch (error) {

      console.log(error);

    }
  };


  useEffect(() => {

    getAvailability();

  }, []);


  // ADD AVAILABILITY
  const addAvailability = async (e) => {

    e.preventDefault();

    setMessage("");
    setMessageType("");


    // BOOK VALIDATION
    if (!bookId) {

      setMessage("Please select a book");
      setMessageType("danger");

      return;
    }


    // PINCODE VALIDATION
    if (!pincode) {

      setMessage("Please enter pincode");
      setMessageType("danger");

      return;
    }


    if (!/^[0-9]{6}$/.test(pincode)) {

      setMessage(
        "Please enter a valid 6 digit pincode"
      );

      setMessageType("danger");

      return;
    }


    try {

      setLoading(true);


      const response =
        await axios.post(
          `${apiUrl}/add/availability`,
          {
            bookId: bookId,
            pincode: pincode,
            isAvailable: isAvailable
          }
        );


      setMessage(
        response.data.message
      );

      setMessageType("success");


      // CLEAR FORM
      setBookId("");
      setPincode("");
      setIsAvailable(true);


      // REFRESH LIST
      getAvailability();


    } catch (error) {

      console.log(error);

      setMessage(
        error.response?.data?.message ||
        "Unable to add product availability"
      );

      setMessageType("danger");

    } finally {

      setLoading(false);

    }

  };


  return (

    <Container fluid className="py-4">

      {/* PAGE HEADING */}

      <Row className="mb-4">

        <Col>

          <h2 className="text-center text-primary fw-bold border-bottom pb-3">

            ADD PRODUCT AVAILABILITY

          </h2>

        </Col>

      </Row>


      {/* FORM */}

      <Row className="justify-content-center">

        <Col
          xs={12}
          md={8}
          lg={6}
        >

          <Card className="border-0 shadow-sm">

            <Card.Body className="p-4">

              <h4 className="text-center mb-4">

                Product Availability

              </h4>


              <Form
                onSubmit={addAvailability}
              >


                {/* BOOK */}

                <Form.Group className="mb-3">

                  <Form.Label className="fw-semibold">

                    Select Book

                  </Form.Label>


                  {bookLoading ? (

                    <div className="text-center">

                      <Spinner size="sm" />

                    </div>

                  ) : (

                    <Form.Select
                      value={bookId}
                      onChange={(e) =>
                        setBookId(e.target.value)
                      }
                    >

                      <option value="">
                        Select Book
                      </option>


                      {books.map((book) => (

                        <option
                          key={book._id}
                          value={book._id}
                        >

                          {book.bookTitle}

                        </option>

                      ))}

                    </Form.Select>

                  )}

                </Form.Group>



                {/* PINCODE */}

                <Form.Group className="mb-3">

                  <Form.Label className="fw-semibold">

                    Pincode

                  </Form.Label>


                  <Form.Control
                    type="text"
                    placeholder="Enter 6 digit pincode"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => {

                      setPincode(
                        e.target.value.replace(
                          /\D/g,
                          ""
                        )
                      );

                    }}
                  />

                </Form.Group>



                {/* AVAILABILITY */}

                <Form.Group className="mb-4">

                  <Form.Label className="fw-semibold">

                    Availability

                  </Form.Label>


                  <Form.Select
                    value={
                      isAvailable
                        ? "true"
                        : "false"
                    }
                    onChange={(e) =>
                      setIsAvailable(
                        e.target.value === "true"
                      )
                    }
                  >

                    <option value="true">
                      Available
                    </option>

                    <option value="false">
                      Not Available
                    </option>

                  </Form.Select>

                </Form.Group>



                {/* BUTTON */}

                <div className="d-grid">

                  <Button
                    type="submit"
                    variant="primary"
                    disabled={loading}
                  >

                    {loading ? (

                      <>
                        <Spinner
                          size="sm"
                          className="me-2"
                        />

                        Saving...

                      </>

                    ) : (

                      "Add Availability"

                    )}

                  </Button>

                </div>


              </Form>


              {/* MESSAGE */}

              {message && (

                <Alert
                  variant={messageType}
                  className="mt-4 mb-0 text-center"
                >

                  {message}

                </Alert>

              )}

            </Card.Body>

          </Card>

        </Col>

      </Row>



      {/* AVAILABILITY LIST */}

      <Row className="mt-5">

        <Col>

          <Card className="border-0 shadow-sm">

            <Card.Body>

              <h4 className="mb-4 text-primary fw-bold">

                PRODUCT AVAILABILITY LIST

              </h4>


              <div className="table-responsive">

                <Table
                  bordered
                  hover
                  responsive
                  className="align-middle text-center"
                >

                  <thead className="table-primary">

                    <tr>

                      <th>
                        #
                      </th>

                      <th>
                        Book
                      </th>

                      <th>
                        Pincode
                      </th>

                      <th>
                        Availability
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {availabilityList.length > 0 ? (

                      availabilityList.map(
                        (item, index) => (

                          <tr key={item._id}>

                            <td>
                              {index + 1}
                            </td>

                            <td>

                              {item.bookId
                                ? item.bookId.bookTitle
                                : "Book Deleted"}

                            </td>

                            <td>

                              {item.pincode}

                            </td>

                            <td>

                              {item.isAvailable ? (

                                <span className="badge bg-success">

                                  Available

                                </span>

                              ) : (

                                <span className="badge bg-danger">

                                  Not Available

                                </span>

                              )}

                            </td>

                          </tr>

                        )

                      )

                    ) : (

                      <tr>

                        <td
                          colSpan="4"
                          className="text-center text-muted py-4"
                        >

                          No availability records found

                        </td>

                      </tr>

                    )}

                  </tbody>

                </Table>

              </div>

            </Card.Body>

          </Card>

        </Col>

      </Row>

    </Container>

  );

};


export default ProductAvailability;