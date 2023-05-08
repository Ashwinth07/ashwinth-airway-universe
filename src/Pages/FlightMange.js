import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import Navbars from "../components/Navbar";

const FlightManage = () => {
  const [bookings, setBookings] = useState([]);
  const[date, setdate] = useState("2018-01-07T16:17:00.000Z")
  const[flitnum, setflitnum] = useState("")
  useEffect(() => {
    axios.get(`https://lemon-cygnet-fez.cyclic.app/api/book/searchbookings?date=${new Date(date).toISOString()}&flitnum=${flitnum}`).then((res)=>{
      setBookings([...res.data.data])
      console.log(res);
    }).catch((err)=>{
      console.log(err);
    })
},[date,flitnum]  
)
  useEffect(() => {
    axios.get(`https://lemon-cygnet-fez.cyclic.app/api/book/get`).then((res)=>{
      setBookings([...res.data.data])
      console.log(res);
    }).catch((err)=>{
      console.log(err);
    })
},[]  
)
console.log(bookings)
const displayAllData=bookings.map((booking) => {
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
    
})

  return (
    <div>
        <Navbars></Navbars>
        <div className="pt-5">
    
    <Container>
    <form  className="form-inline m-5 d-flex justify-content-end gap-5" style={{height:"150px",width:"60%",padding:"50px",boxShadow:" rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px"}}>
            <h6 className='d-flex justify-content-center p-2'>Search Funalities</h6>
             <input
                     type="text"
                     placeholder="Enter airways"
                     className="form-control p-2"
                     value={flitnum}
                     onChange={(event)=>setflitnum(event.target.value)}
                   />
             <br></br>
             <input
                     type="datetime-local"
                     placeholder="Date Search"
                     className="form-control p-2"
                     value={date}
                     onChange={(event)=>setdate(event.target.value)}
                   />
             </form>
      <Row>
        {displayAllData}
      </Row>
    </Container>
    </div>
    </div>
  );
};

export default FlightManage;