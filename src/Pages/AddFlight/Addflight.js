import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Navbars from '../../components/Navbar';


function Addflight() {
  const [flightNumber, setFlightNumber] = useState('');
  const [airlineName, setAirlineName] = useState('');
  const [departureAirport, setDepartureAirport] = useState({
    name: '',
    code: '',
    city: '',
    country: '',
  });
  const [arrivalAirport, setArrivalAirport] = useState({
    name: '',
    code: '',
    city: '',
    country: '',
  });
  const [seatCount, setSeatCount] = useState(60);
  const [departureDate, setDepartureDate] = useState('');
  const [departureTime, setDepartureTime] = useState(0);
  const [arrivalDate, setArrivalDate] = useState('');
  const [arrivalTime, setArrivalTime] = useState(0);
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBooking = {
      flightNumber,
      airlineName,
      departureAirport,
      arrivalAirport,
      seatCount,
      departureDate,
      departureTime,
      arrivalDate,
      arrivalTime,
      duration,
      price,
    };

    axios.post('https://lemon-cygnet-fez.cyclic.app/api/flight/add', newBooking)
      .then((res) => {
        alert("successfully added");
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
    <Navbars></Navbars>
    <Form onSubmit={handleSubmit} className='col-9 m-5' style={{paddingLeft:"320px"}}>
      <Form.Group controlId="flightNumber">
        <Form.Label>Flight Number</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter flight number"
          value={flightNumber}
          onChange={(e) => setFlightNumber(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="airlineName">
        <Form.Label>Airline Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter airline name"
          value={airlineName}
          onChange={(e) => setAirlineName(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="departureAirportName">
        <Form.Label>Departure Airport Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter departure airport name"
          value={departureAirport.name}
          onChange={(e) =>
            setDepartureAirport({ ...departureAirport, name: e.target.value })
          }
        />
      </Form.Group>

      <Form.Group controlId="departureAirportCode">
        <Form.Label>Departure Airport Code</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter departure airport code"
          value={departureAirport.code}
          onChange={(e) =>
            setDepartureAirport({ ...departureAirport, code: e.target.value })
          }
        />
      </Form.Group>

      <Form.Group controlId="departureAirportCity">
        <Form.Label>Departure Airport City</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter departure airport city"
          value={departureAirport.city}
          onChange={(e) =>
            setDepartureAirport({ ...departureAirport, city: e.target.value })
          }
        />
      </Form.Group>

      <Form.Group controlId="departureAirportCountry">
        <Form.Label>Departure Airport Country</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter departure airport country"
          value={departureAirport.country}
          onChange={(e) =>
            setDepartureAirport({ ...departureAirport, country: e.target.value })
          }
        />
      </Form.Group>
      <Form.Group controlId="arrivalAirportName">
        <Form.Label>Arrival Airport Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter arrival airport name"
          value={arrivalAirport.name}
          onChange={(e) =>
            setArrivalAirport({ ...arrivalAirport, name: e.target.value })
          }
        />
      </Form.Group>
      <Form.Group controlId="arrivalAirportCode">
        <Form.Label>Arrival Airport Code</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter arrival airport code"
          value={arrivalAirport.code}
          onChange={(e) =>
            setArrivalAirport({ ...arrivalAirport, code: e.target.value })
          }
        />
      </Form.Group>
      <Form.Group controlId="arrivalAirportCity">
        <Form.Label>Arrival Airport City</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter arrival airport city"
          value={arrivalAirport.city}
          onChange={(e) =>
            setArrivalAirport({ ...arrivalAirport, city: e.target.value })
          }
        />
      </Form.Group>
      <Form.Group controlId="arrivalAirportCountry">
        <Form.Label>Arrival Airport Country</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter arrival airport country"
          value={arrivalAirport.country}
          onChange={(e) =>
            setArrivalAirport({ ...arrivalAirport, country: e.target.value })
          }
        />
      </Form.Group>
      <Form.Group controlId="seatCount">
        <Form.Label>Seat Count</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter seat count"
          value={seatCount}
          onChange={(e) => setSeatCount(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="departureDate">
        <Form.Label>Departure Date</Form.Label>
        <Form.Control
          type="date"
          placeholder="Enter departure date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="departureTime">
        <Form.Label>Departure Time</Form.Label>
        <Form.Control
          type="time"
          placeholder="Enter departure time"
          value={departureTime}
          onChange={(e) => setDepartureTime(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="arrivalDate">
        <Form.Label>Arrival Date</Form.Label>
        <Form.Control
          type="date"
          placeholder="Enter arrival date"
          value={arrivalDate}
          onChange={(e) => setArrivalDate(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="arrivalTime">
        <Form.Label>Arrival Time</Form.Label>
        <Form.Control
          type="time"
          placeholder="Enter arrival time"
          value={arrivalTime}
          onChange={(e) => setArrivalTime(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="duration">
        <Form.Label>Duration</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="price">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        </Form.Group>
        <Button variant="primary" type="submit">
        Submit
        </Button>

        </Form>
        </div>
  )}

export default Addflight;