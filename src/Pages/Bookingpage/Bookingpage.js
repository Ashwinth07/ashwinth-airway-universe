import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Navbars from '../../components/Navbar';
import axios from 'axios';
const Bookingpage = () => {
    const location = useLocation();
    const myValue = location.state?.myValue;
  const navigate=useNavigate();
  const [userId, setUserId] = useState('');
  const [flightId, setFlightId] = useState('');
  const [totalSeat, setTotalSeat] = useState('');
  const[List, setList] = useState([])
  const [passengerDetails, setPassengerDetails] = useState([]);
  const [flightDetails, setFlightDetails] = useState({
    flightNumber: '',
    airline: '',
  });
  const [totalFare, setTotalFare] = useState('');
  useEffect(() => {
    axios.get('https://lemon-cygnet-fez.cyclic.app/api/flight/getflig')
    .then((response) => {setList(response.data)})
    .catch((error) => console.log(error))    
},[]
)

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'userId':
        setUserId(value);
        break;
      case 'flightId':
        setFlightId(value);
        break;
      case 'totalSeat':
        setTotalSeat(value);
        break;
      case 'flightNumber':
        setFlightDetails({ ...flightDetails, flightNumber: value });
        break;
      case 'airline':
        setFlightDetails({ ...flightDetails, airline: value });
        break;
      case 'totalFare':
        setTotalFare(value);
        break;
      default:
        break;
    }
  };

  const handleAddPassenger = () => {
    setPassengerDetails([
      ...passengerDetails,
      { name: '', age: '', address: '', phone: '', passport: '', seatNumber: '' },
    ]);
  };

  const handleDeletePassenger = (index) => {
    const newPassengerDetails = [...passengerDetails];
    newPassengerDetails.splice(index, 1);
    setPassengerDetails(newPassengerDetails);
  };

  const handlePassengerChange = (event, index) => {
    const { name, value } = event.target;
    const newPassengerDetails = [...passengerDetails];
    newPassengerDetails[index][name] = value;
    setPassengerDetails(newPassengerDetails);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    const formData = { userId, flightId, totalSeat, passengerDetails, flightDetails, totalFare };
    console.log(myValue);
    console.log(JSON.stringify({
        userid:localStorage.getItem("id"),
        flightid:myValue,
        total_seat:parseInt(formData.totalSeat),
        passengerdetails:formData.passengerDetails,
        flight_details:formData.flightDetails,
        total_fare:parseInt(formData.totalFare)

    }))
    const response = await fetch("https://lemon-cygnet-fez.cyclic.app/api/book/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            userid:localStorage.getItem("id"),
            flightid:myValue,
            total_seat:parseInt(formData.totalSeat),
            passengerdetails:formData.passengerDetails,
            flight_details:formData.flightDetails,
            total_fare:parseInt(formData.totalFare)

        }),
      });
      const json = await response.json();
      console.log(json);

      if (json.status === "success") {
        alert("Your ticket has been placed Successfully");
        navigate("/");
      } else {
        console.log(json);
      }
  };

  return (
    <div  style={{minHeight:"90vh"}}>
     <Navbars></Navbars>
    <Form onSubmit={handleSubmit} className='col-9 m-5' style={{paddingLeft:"200px"}}>
      <Row>
        <Col>
          <Form.Group controlId="userId">
            <Form.Label>User ID:</Form.Label>
            <Form.Control type="text" name="userId" value={localStorage.getItem("id")} onChange={handleInputChange} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="flightId">
            <Form.Label>Flight ID:</Form.Label>
            <Form.Control type="text" name="flightId" value={myValue} onChange={handleInputChange} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="totalSeat">
            <Form.Label>Total Seat:</Form.Label>
            <Form.Control type="number" name="totalSeat" value={totalSeat} onChange={handleInputChange} />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group controlId="flightNumber">
            <Form.Label>Flight Number:</Form.Label>
            <select className="form-select"  name="flightNumber" value={flightDetails.flightNumber} onChange={handleInputChange}>
                <option value="">Refer FlightId fill below</option>
                {List.map((category, index) => (
                  <option  name="flightNumber" value={category.flightNumber}>
                    {category.flightNumber}
                  </option>
                ))}
          </select>
            <Form.Control className="mt-2" placeholder='Enter Flightnumber' type="text" name="flightNumber" value={flightDetails.flightNumber} onChange={handleInputChange} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="airline">
            <Form.Label>Airline:</Form.Label>
            <select className="form-select"  onChange={handleInputChange}>
                <option value="">Refer Airline fill below</option>
                {List.map((category, index) => (
                  <option  name="flightNumber" value={flightDetails.airline}>
                    {category.airlineName}
                  </option>
                ))}
          </select>
            <Form.Control placeholder='Enter Airline'  className="mt-2" type="text"   name="airline" value={flightDetails.airline} onChange={handleInputChange} />
      </Form.Group>
    </Col>
    <Col>
      <Form.Group controlId="totalFare">
        <Form.Label>Total Fare:</Form.Label>
        <Form.Control type="number" name="totalFare" value={totalFare} onChange={handleInputChange} />
      </Form.Group>
    </Col>
  </Row>
  <Button variant="primary" className='m-4' onClick={handleAddPassenger}>
    Add Passenger
  </Button>
  <br />
  <br />
  {passengerDetails.map((passenger, index) => (
    <div key={index}>
      <Row>
        <Col>
          <Form.Group controlId={`name${index}`}>
            <Form.Label>Name:</Form.Label>
            <Form.Control type="text" name="name" value={passenger.name} onChange={(event) => handlePassengerChange(event, index)} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId={`age${index}`}>
            <Form.Label>Age:</Form.Label>
            <Form.Control type="text" name="age" value={passenger.age} onChange={(event) => handlePassengerChange(event, index)} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId={`address${index}`}>
            <Form.Label>Address:</Form.Label>
            <Form.Control type="text" name="address" value={passenger.address} onChange={(event) => handlePassengerChange(event, index)} />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group controlId={`phone${index}`}>
            <Form.Label>Phone:</Form.Label>
            <Form.Control type="text" name="phone" value={passenger.phone} onChange={(event) => handlePassengerChange(event, index)} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId={`passport${index}`}>
            <Form.Label>Passport:</Form.Label>
            <Form.Control type="text" name="passport" value={passenger.passport} onChange={(event) => handlePassengerChange(event, index)} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId={`seatNumber${index}`}>
            <Form.Label>Seat Number:</Form.Label>
            <Form.Control type="text" name="seatNumber" value={passenger.seatNumber} onChange={(event) => handlePassengerChange(event, index)} />
          </Form.Group>
        </Col>
        <Col>
          <Button variant="danger" onClick={() => handleDeletePassenger(index)} className='m-4'>
            Delete
          </Button>
        </Col>
      </Row>
      <br />
    </div>
  ))}
  <Button variant="primary" type="submit" className='m-4'>
    Submit
  </Button>
</Form>
</div>
  );};
  export default Bookingpage;