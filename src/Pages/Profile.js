import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import Navbars from "../components/Navbar";

const Profile = () => {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios.get('https://lemon-cygnet-fez.cyclic.app/api/book/get')
    .then((response) => {setBookings(response.data.data)})
    .catch((error) => console.log(error))    
},[]  
)
console.log(bookings)
const displayAllData=bookings.map((booking) => {
    if(booking.userid._id==localStorage.getItem("id")){
        return (
            <Col md={4} key={booking._id}>
            <Card className="mb-4">
            <Card.Header className="text-white" style={{backgroundColor:"#012a4a"}}>
                <h4 className="mb-2 text-right d-flex justify-content-center pt-2">
                {(booking.userid.username)}
                </h4>
                </Card.Header>
                <Card.Body>
                <Card.Text>Booking ID: {booking._id}</Card.Text>
                <Card.Text>
                    <strong>Flight Name:</strong> {booking.flight_details.airline}
                </Card.Text>
                <Card.Text>
                    <strong>From:</strong> {booking.flightid.departureAirport.city}
                </Card.Text>
                <Card.Text>
                    <strong>To:</strong> {booking.flightid.arrivalAirport.city}
                </Card.Text>
                <Card.Text>
                    <strong>Departure Date:</strong> {
                    booking.flightid.departureDate
                    }
                </Card.Text>
                <Card.Text>
                    <strong>Arrival Date:</strong> {booking.flightid.arrivalDate}
                </Card.Text>
                <Card.Text>
                    <strong>Passenger Details:</strong>
                </Card.Text>
                <ul>
                    {booking.passengerdetails.map((detail, index) => (
                    <li key={index}>
                        Passenger {index + 1}: {detail.name}, {detail.age} years
                        old
                    </li>
                    ))}
                </ul>
                </Card.Body>
            </Card>
            </Col>

        )
    }
})

  return (
    <div>
        <Navbars></Navbars>
        <div className="pt-5">
    
    <Container>
    <h1 className="pb-5">All Your Bookings</h1>
      <Row>
        {displayAllData}
      </Row>
    </Container>
    </div>
    </div>
  );
};

export default Profile;