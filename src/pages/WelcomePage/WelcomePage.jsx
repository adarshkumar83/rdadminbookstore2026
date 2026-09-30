import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../assets/logo.png";
// import bg from "../../assets/rd-bg.png";

function WelcomePage() {
  let [username,setUserName]=useState('admin')
  
    useEffect(()=>{
      let token
      token=localStorage.getItem('token')
      if(token){
        setUserName(localStorage.getItem('name'))
      }
    },[])
  return (

      <Container style={{ position: "relative", zIndex: 1 }}>
        <Row className="justify-content-center text-center">
          <Col lg={6}>
            <Card className=" border-0 p-4 mt-3">
              <div className="d-flex flex-column align-items-center">
                <Image
                  src={logo}
                  width="80"
                  height="80"
                  roundedCircle
                  className="mb-3"
                />
                <h2 className="fw-bold mb-2">Welcome,{username}</h2>
                <p className="text-muted mb-4">
                  Manage your courses, branches, and subjects easily using the dashboard.
                </p>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    // </div>
  );
}

export default WelcomePage;