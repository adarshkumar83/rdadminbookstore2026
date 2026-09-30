import { useNavigate } from 'react-router-dom';
import { Button, Col, Container, Row, Form, Table } from 'react-bootstrap';
import { useEffect, useState } from 'react'
const apiUrl = import.meta.env.VITE_API_URL
import axios from 'axios'
function DiscountList() {


    const navigate = useNavigate();
    const goToAddDiscount = () => {
        navigate('/add/discount')
    }
    const [discounts, setDiscounts] = useState([])
    useEffect(() => {
        axios({
            url: `${apiUrl}/discounts`,
            method: 'get'
        }).then((res) => {
            setDiscounts(res.data.data)
        })
            .catch((err) => {
                alert(err)
            })
    }, [])

    const goForEdit = (id) => { 
        
        navigate('/edit/discount/'+id);
    }
    return (
        <Container>
            <Row>
                <Col>
                    <Form>
                        <Form.Group>
                            <Form.Control type='text' placeholder='type book name to search'>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                    <Button className='mt-5' variant='success' style={{ float: 'right' }} onClick={goToAddDiscount}>AddDiscount +</Button>
                </Col>
            </Row>
            <Row>
                <h3 className="mt-2 text-center text-danger">Discount List</h3>
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>DiscountName</th>
                            <th>Discount Type</th>
                            <th>Discount Value</th>
                            <th>BookName</th>
                            <th>Valid From</th>
                            <th>Valid UPto</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            discounts.map((d) =>
                                <tr>
                                    <td>{d.discountName}</td>
                                    <td>{d.discountType}</td>
                                    <td>{d.discountValue}</td>
                                    <td>{d.book?.bookTittle || 'N/A'}</td>
                                    <td>
                                        {new Date(d.validFrom).toLocaleDateString("en-IN", {
                                            timeZone: "Asia/Kolkata"
                                        })}
                                    </td>

                                    <td>
                                        {new Date(d.validTo).toLocaleDateString("en-IN", {
                                            timeZone: "Asia/Kolkata"
                                        })}
                                    </td>
                                    <td className={d.status === "Active" ? "text-success" : "text-danger"}>
                                        {d.status}
                                    </td>
                                    <td>
                                        <Button variant="warning" size="sm" className="ms-1" onClick={() => goForEdit(d._id)}>Edit</Button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>

                </Table>
            </Row>
        </Container>
    )
}

export default DiscountList;