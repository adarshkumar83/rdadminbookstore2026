import { NavLink, useNavigate } from "react-router-dom";
import { ListGroup, Dropdown, Image, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import logo from "../assets/logo.png";
import { useState, useEffect } from 'react'

function Sidebar() {
  let navigate = useNavigate()
  let [isloggedin, setIsloggedin] = useState(false)
  let [username, setUserName] = useState('')

  useEffect(() => {
    let token
    token = localStorage.getItem('token')
    if (token) {
      setIsloggedin(true)
      setUserName(localStorage.getItem('name'))
    }
  }, [isloggedin])
  function doLogout() {
    localStorage.setItem('name', '')
    localStorage.setItem('email', '')
    localStorage.setItem('token', '')
    setIsloggedin(false)
    navigate('/')
  }
  return (
    <>
      <div className="d-flex flex-column justify-content-between border-end sticky-top" style={{ width: '18%', height: '100vh', borderRight: '1px solid #dee2e6', boxShadow: '2px 0 8px rgba(0, 0, 0, 0.1)' }}>

        <div className="p-3 border-bottom d-flex align-items-center">
          <Image src={logo} width={40} height={40} className="me-2" />
          <span className="fw-bold d-none d-md-inline fs-2">RDEC</span>
        </div>


        <div className="flex-grow-1 overflow-auto">
          <ListGroup variant="flush" className="pt-4 px-3 flex-grow-1 overflow-auto">

           
            <ListGroup.Item
              as={NavLink}
              to="/books"
              className="d-flex align-items-center gap-2">
              <i className='bi bi-book'></i>
              <span className="d-none d-md-inline">Manage Book</span>
            </ListGroup.Item>
             <ListGroup.Item
              as={NavLink}
              to="/users"
              className="d-flex align-items-center gap-2">
              <i className='bi bi-book'></i>
              <span className="d-none d-md-inline">Manage User</span>
            </ListGroup.Item>
             <ListGroup.Item
              as={NavLink}
              to="/discounts"
              className="d-flex align-items-center gap-2">
              <i className='bi bi-book'></i>
              <span className="d-none d-md-inline">Manage Discount</span>
            </ListGroup.Item>
            <ListGroup.Item
              as={NavLink}
              to="/availability"
              className="d-flex align-items-center gap-2">
              <i className='bi bi-book'></i>
              <span className="d-none d-md-inline">Book Availability</span>
            </ListGroup.Item>
            

            {/* <ListGroup.Item
              as={NavLink}
              to="/branches"
              className="d-flex align-items-center gap-2"
            >
              <i className="bi bi-backpack4-fill"></i>
              <span className="d-none d-md-inline">Branch</span>
            </ListGroup.Item> */}

            {/* <ListGroup.Item
              as={NavLink}
              to="/subjects"
              className="d-flex align-items-center gap-2"
            >
              <i className="bi bi-collection"></i>
              <span className="d-none d-md-inline">Subjects</span>
            </ListGroup.Item> */}

            {/* <ListGroup.Item
              as={NavLink}
              to="/subjectsmap"
              className="d-flex align-items-center gap-2"
            >
              <i className='bi bi-book'></i>
              <span className="d-none d-md-inline">Subject Mapping</span>
            </ListGroup.Item> */}
            {/* <ListGroup.Item
              as={NavLink}
              to="/faculties"
              className="d-flex align-items-center gap-2"
            >
              <i className='bi bi-person-square'></i>
              <span className="d-none d-md-inline">Faculty</span>
            </ListGroup.Item> */}

            {/* <ListGroup.Item
              as={NavLink}
              to="/students"
              className="d-flex align-items-center gap-2"
            >
              <i className='bi bi-eyedropper'></i>
              <span className="d-none d-md-inline">Student</span>
            </ListGroup.Item> */}

          </ListGroup>
        </div>

        {/* Profile Dropdown */}
        <div className="border-top p-3 ">
          <Dropdown drop="up">
            <Dropdown.Toggle
              variant="light"
              className="w-100 d-flex align-items-center justify-content-between"
            >
              <div className="d-none d-md-inline d-flex align-items-center">
                {/* <Image
                  src={logo}
                  roundedCircle
                  width="40"
                  height="40"
                  className="me-2"
                /> */}
                <div>
                  <h6 className="mb-0">{username} <small className="text-muted">Admin</small>   </h6>

                  <Button className="mt-1" variant="danger" size='sm' onClick={doLogout}>Logout</Button>
                </div>
              </div>
              {/* <i className="bi bi-chevron-up"></i> */}
            </Dropdown.Toggle>

            <Dropdown.Menu className="w-100">
              <Dropdown.Item as={NavLink} to="/profile">
                <i className="bi bi-person me-2"></i> Profile
              </Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/settings">
                <i className="bi bi-gear me-2"></i> Settings
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => alert("Logged out!")}>
                <i className="bi bi-box-arrow-right me-2"></i> Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </>
  );
}

export default Sidebar;