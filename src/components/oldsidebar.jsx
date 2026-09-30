import React from 'react';
import { NavLink } from 'react-router-dom';
import { ListGroup, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

function Sidebar() {
  return (
    <div style={{ width: '18%', minHeight: '100vh', borderRight: '2px solid #dee2e6'}}>
      <ListGroup variant="flush" className="pt-4 px-3">

        <ListGroup.Item
          as={NavLink}
          to="/courses"
          className="d-flex align-items-center gap-2"
        >
          <i className='bi bi-book-fill'></i>
          <span className="d-none d-md-inline">Course</span>
        </ListGroup.Item>

        <ListGroup.Item
          as={NavLink}
          to="/branches"
          className="d-flex align-items-center gap-2"
        >
          <i className="bi bi-backpack4-fill"></i>
          <span className="d-none d-md-inline">Branch</span>
        </ListGroup.Item>

        <ListGroup.Item
          as={NavLink}
          to="/subjects"
          className="d-flex align-items-center gap-2"
        >
          <i className="bi bi-collection"></i>
          <span className="d-none d-md-inline">Subjects</span>
        </ListGroup.Item>

        <ListGroup.Item
          as={NavLink}
          to="/subjectsmap"
          className="d-flex align-items-center gap-2"
        >
          <i className='bi bi-book'></i>
          <span className="d-none d-md-inline">Subject Mapping</span>
        </ListGroup.Item>

      </ListGroup>
    </div>
  );
}

export default Sidebar;
