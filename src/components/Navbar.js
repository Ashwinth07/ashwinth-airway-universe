import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function Navbars() {
    const navigates = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const logoutuser = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("id");
        localStorage.removeItem("admin");
        navigates("/");
        setIsOpen(!isOpen);
      };
  return (
    <div>
    <Navbar  expand="lg" className='m-2' variant='dark' style={{backgroundColor:"#012a4a"}}>
      <Container fluid>
        <img src="https://media.istockphoto.com/id/518566441/photo/airplane-icon.jpg?b=1&s=170667a&w=0&k=20&c=GaEgLnmnUk9DU5mzXIouJYl4FDC3MkMvqEZnux-Ik0s=" alt="img" style={{width:"20px",height:"20px",marginRight:"10px"}}/>
        {localStorage.getItem("admin")=="true" && (
        <Navbar.Brand href="#" style={{fontWeight:"800px"}}>Admin</Navbar.Brand>
        )}
        {localStorage.getItem("admin")=="false" && (
        <Navbar.Brand href="#"  style={{fontWeight:"800px"}}>Booking</Navbar.Brand>
        )}
        {!localStorage.getItem("admin")=="false" && !localStorage.getItem("admin")=="true" &&(
        <Navbar.Brand href="#"  style={{fontWeight:"500px"}}>Fligh Booking</Navbar.Brand>
        )}
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
           
            navbarScroll
          >
            <Nav.Link href="/" >Home</Nav.Link>
            <Nav.Link href="/aboutus">About us</Nav.Link>
            <NavDropdown title="Services" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/bookingpage" >Booking</NavDropdown.Item>
              <NavDropdown.Item href="/viewflight">
               Flight Details
              </NavDropdown.Item>
              {localStorage.getItem("admin")=="true" && (
              <NavDropdown.Item href="/addflight">
               Add flight
              </NavDropdown.Item>
               )}
              {localStorage.getItem("admin")=="true" && (
              <NavDropdown.Item href="/flightmanage">
               Flight Manage
              </NavDropdown.Item>
               )}
            </NavDropdown>
           
          </Nav>
          <Form className="d-flex mx-2" style={{gap:"13px"}} >
          {!localStorage.getItem("username") && (
            <Nav.Link href="/login"style={{color:"#eee"}} >
              Login
            </Nav.Link>
          )}
            {!localStorage.getItem("username") && (
            <Nav.Link href="/signup" style={{color:"#eee"}}>
              Signup
            </Nav.Link>
            )}
             {localStorage.getItem("username") && (
                <li className="d-flex gap-1">
                  <span class="nav-item dropdown">
                    <Link
                      class="nav-link dropdown-toggle"
                      to="/"
                      role="button"
                      data-bs-toggle="dropdown"
                      style={{color:"#eee",border:"2px solid #eee",padding:"3px",width:"120px",marginRight:"50px",textAlign:"center"}}

                    >
                     Hi {localStorage.getItem("username")}
                    </Link>
                    <ul class="dropdown-menu">
                      <li>
                        <Link class="dropdown-item" to="/profile">
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link class="dropdown-item" onClick={logoutuser}>
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </span>
                </li>
              )}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  );
}
