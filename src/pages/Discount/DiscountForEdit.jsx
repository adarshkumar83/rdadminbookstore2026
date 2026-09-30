import { useParams, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL

function DiscountForEdit () {
  const params = useParams()
  const id = params.id
  const navigate = useNavigate()

  const [discount, setDiscount] = useState({
    book: '',
    discountName: '',
    discountType: '',
    discountValue: 0,
    validFrom: '',
    validTo: ''
  })

  const [books, setBooks] = useState([])

  useEffect(() => {
    axios({
      url: apiUrl + '/discount/for/edit/' + id,
      method: 'get'
    })
      .then(res => {
        console.log('DISCOUNT FOR EDIT:', res.data)

        const data = res.data.data

        setDiscount({
          book: data?.book?._id || data?.book || '',
          discountName: data?.discountName || '',
          discountType: data?.discountType || '',
          discountValue: data?.discountValue || 0,
          validFrom: data?.validFrom || '',
          validUpto: data?.validTo || ''
        })

        setBooks(Array.isArray(res.data.books) ? res.data.books : [])
      })
      .catch(err => {
        console.log(err)
        alert(err)
      })
  }, [id])

  function manageUpdate (e) {
    const name = e.target.name
    const value = e.target.value

    setDiscount(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const editDiscount = () => {
    axios({
      url: apiUrl + '/edit/discount/' + id,
      method: 'put',
      data: discount
    })
      .then(() => {
        navigate('/discounts')
      })
      .catch(err => {
        console.log(err)
        alert(err)
      })
  }

  const handleSubmit = () => {
    editDiscount()
  }

  return (
    <Container>
      <Form>
        <Row>
          <Col>
            <h3 className='mt-5 text-center text-danger'>
              Edit Discount on Book
            </h3>
          </Col>
        </Row>

        {/* Book */}
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Select Book</Form.Label>

              <Form.Select
                onChange={manageUpdate}
                name='book'
                value={discount.book}
              >
                <option value=''>---select---</option>

                {books.map(b => (
                  <option key={b._id} value={b._id}>
                    {b.bookTittle}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* Discount Name */}
        <Row className='mt-2'>
          <Form.Group>
            <Form.Label>Discount Name</Form.Label>

            <Form.Control
              type='text'
              name='discountName'
              value={discount.discountName}
              onChange={manageUpdate}
            />
          </Form.Group>
        </Row>

        {/* Discount Type */}
        <Row className='mt-2'>
          <Form.Group>
            <Form.Label>Discount Type</Form.Label>

            <Form.Select
              onChange={manageUpdate}
              name='discountType'
              value={discount.discountType}
            >
              <option value=''>---select---</option>

              <option value='Percentage'>Percentage</option>

              <option value='Fixed'>Fixed</option>
            </Form.Select>
          </Form.Group>
        </Row>

        {/* Discount Value */}
        <Row className='mt-2'>
          <Form.Group>
            <Form.Label>Discount Value in Number Only</Form.Label>

            <Form.Control
              type='number'
              name='discountValue'
              value={discount.discountValue}
              onChange={manageUpdate}
            />
          </Form.Group>
        </Row>

        {/* Valid From */}
        <Row className='mt-2'>
          <Form.Group>
            <Form.Label>Valid From</Form.Label>

            <Form.Control
              type='date'
              name='validFrom'
              value={discount.validFrom ? discount.validFrom.split('T')[0] : ''}
              onChange={manageUpdate}
            />
          </Form.Group>
        </Row>

        {/* Valid Upto */}
        <Row className='mt-2'>
          <Form.Group>
            <Form.Label>Valid Upto</Form.Label>

            <Form.Control
              type='date'
              name='validTo'
              value={discount.validTo ? discount.validTo.split('T')[0] : ''}
              onChange={manageUpdate}
            />
          </Form.Group>
        </Row>

        <Button className='mt-3' variant='success' onClick={handleSubmit}>
          Update Discount
        </Button>
      </Form>
    </Container>
  )
}

export default DiscountForEdit
