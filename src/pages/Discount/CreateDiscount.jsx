import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { useState, useEffect } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
const apiUrl = import.meta.env.VITE_API_URL
function CreateDiscount() {
   let [books, setBooks] = useState([]);
   let navigate = useNavigate();
   let [book, setBook] = useState();
   let [discountName, setDiscountName] = useState('');
   let [discountType, setDiscountType] = useState('');
   let [discountValue, setDiscountValue] = useState(0);
   let [validFrom, setValidFrom] = useState('');
   let [validTo, setValidTo] = useState('');

   useEffect(() => {
      axios({
         url: apiUrl + '/books/for/discount',
         method: 'get'
      }).then((res) => {
         console.log(res.data.data);
         setBooks(res.data.data);
      })
         .catch((err) => {
            alert(err)
         })
   }, [])
   const addDiscount = () => {
      let data = {
         book: book,
         discountName: discountName,
         discountValue: discountValue,
         discountType: discountType,
         validFrom: validFrom,
         validTo: validTo
      }
      axios({
         url: apiUrl+'/add/discount',
         method: 'post',
         data: data
      }).then(()=>{
         alert('discount has been added successfully');
         navigate('/discounts')
      })
      .catch((err)=>{
         alert(err);
      })
   }

   return (
      <Container>
         <Row>
            <Col>
               <Form>
                  <h3 className='mt-5 text-center text-danger'>Add Discount on Book</h3>
               </Form>
            </Col>
         </Row>
         <Row>
            <Col>
               <Form.Group>
                  <Form.Label>Select Book</Form.Label>
                  <Form.Select onChange={(e) => setBook(e.target.value)}>
                     <option>---SelectBook---</option>
                     {
                        books.map((book) =>
                           <option value={book._id}>{book.bookTittle}</option>
                        )
                     }
                  </Form.Select>
               </Form.Group>
            </Col>
         </Row>
         <Row className='mt-2'>
            <Form.Group>
               <Form.Label>Discount Name</Form.Label>
               <Form.Control type='text' onChange={(e) => setDiscountName(e.target.value)}></Form.Control>
            </Form.Group>
         </Row>
         <Row className='mt-2'>
            <Form.Group>
               <Form.Label>Discount Type</Form.Label>
               <Form.Select onChange={(e) => setDiscountType(e.target.value)}>
                  <option value=''>---select---</option>
                  <option value='Percentage'>Percentage</option>
                  <option value='Fixed'>Fixed</option>
               </Form.Select>
            </Form.Group>
         </Row>
         <Row className='mt-2'>
            <Form.Group>
               <Form.Label>Discount Value in Number Only</Form.Label>
               <Form.Control type='number' onChange={(e) => setDiscountValue(e.target.value)}></Form.Control>
            </Form.Group>
         </Row>
         <Row className='mt-2'>
            <Form.Group>
               <Form.Label>Valid From</Form.Label>
               <Form.Control type='date' onChange={(e) => setValidFrom(e.target.value)}></Form.Control>
            </Form.Group>
         </Row>
         <Row className='mt-2'>
            <Form.Group>
               <Form.Label>Valid Upto</Form.Label>
               <Form.Control type='date' onChange={(e) => setValidTo(e.target.value)}></Form.Control>
            </Form.Group>
         </Row>
         <Button className='mt-3' variant='success' onClick={addDiscount}>Add Discount</Button>
      </Container>
   )
}

export default CreateDiscount;