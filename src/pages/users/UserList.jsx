import axios from "axios"
import { useState, useEffect } from "react"
import { Col, Container, Row, Table } from "react-bootstrap"
const apiUrl = import.meta.env.VITE_API_URL
const UserList = () => {
    let [users, setUsers] = useState([])
    useEffect(() => {
        axios({
            url: apiUrl + '/users',
            method: 'get'
        }).then((res) => {
            setUsers(res.data.data)
        }).catch((err) => {
            alert(err)
        })
    }, [])
  return (
    <>
      <Container>
        <Row>
            <Col>
                <h2 className="text-danger text-center">Users List</h2>
                <Table bordered>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user) => 
                                <tr>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.status}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            </Col>
        </Row>
      </Container>
    </>
  )
}

export default UserList
