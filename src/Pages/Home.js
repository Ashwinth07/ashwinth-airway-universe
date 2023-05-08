import React, { useEffect, useState } from 'react';
import axios from 'axios'
import "./Home.css";
import { useNavigate } from 'react-router-dom';
import Navbars from '../components/Navbar';
import Bookchild from './Bookchild';
// import { Jumbotron, Button } from 'react-bootstrap';
function Home() {
  const [place, setPlace] = useState("");
  const [date, setDate] = useState('');
  const [data, setData] = useState([]);
  const[List, setList] = useState([])
  const navigates=useNavigate();
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(date)
    axios.get(`https://lemon-cygnet-fez.cyclic.app/api/flight/searchflights?date=${date}&place=${place}`).then((res)=>{
      setData([]);
      setData([...res.data])
      console.log(res);
    }).catch((err)=>{
      console.log(err);
    })
  };
  const categorysearch = (event) => {
    setPlace(event.target.value);
   
  };
  // console.log(search);
  useEffect(() => {
    axios.get('https://lemon-cygnet-fez.cyclic.app/api/flight/getflig')
    .then((response) => {setList(response.data)})
    .catch((error) => console.log(error))    
},[]
)
//   useEffect(() => {

//      axios.get(`https://lemon-cygnet-fez.cyclic.app/api/flight/getname/${search}`).then((res)=>{
//       setData([...res.data])
//       console.log(res);
//     }).catch((err)=>{
//       console.log(err);
//     })
//   },[search]
// )
console.log(List);
  function handleClick(event) {
    navigates('/bookingpage', { state: { myValue:event.target.value } });
  }
  const displayAllData = data.map((x, index) => 
  <div key = {index} className='flight-container m-3' >
      <div className='d-flex gap-4 p-3 row justify-content-center text-center align-items-center'>
          <div className='col-1'>
          <h6>{x.airlineName}</h6>
          <p>{x.flightNumber}</p>
          </div>
          <div className='col-2'>
            <h5>{x.departureDate}</h5>
            <p>{x.departureAirport.name}</p>
          </div>
          <div className='col-2'>
            <h1>---------</h1>
            <p style={{textAlign:"center"}}>Non Stop</p>
          </div>
          <div className='col-2'>
            <h5>{x.arrivalDate}</h5>
            <p>{x.arrivalAirport.name}</p>
          </div>
          <div className='col-1'>
            <h6> ₹ {x.price}</h6>
          </div>
          <div className='col-2'>
             <button type="submit" className="btn btn-primary" value={x._id} onClick={handleClick}>Book now</button>
          </div>
        </div>
  </div>
  )
  return (
    <div>
       <Navbars></Navbars>
       <img className='mx-1' src='https://images.unsplash.com/photo-1558882423-bebedae70ea8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' style={{width:"98vw",height:'105vh'}}></img>
  
    <div>
            <div className="hero" style={{position:"absolute",bottom:"25%",left:"21%"}}>
            <h1 style={{textAlign:"center",fontSize:"3rem",fontWeight:"800",color:"white",textShadow:"2px 2px 4px #000000"}}>The freedom of flying is priceless.</h1>
            <br></br>
            <p  style={{color:"#eeee",textAlign:"center",fontSize:"1.3rem",fontWeight:"700",padding:"0rem 0 2rem 0",textShadow:"2px 2px 4px #000000"}}>Choose your Bookings</p>
            <a href="/viewflight"style={{display:"flex",justifyContent:"center",textDecoration:"none",backgroundColor:"white",borderRadius:"6px",fontSize:"1.1rem",fontWeight:"bold",letterSpacing:"2px",color:"#222",width:"150px",padding:"9px",marginLeft:"329px"}}>Explore now</a>
            </div>
            </div>
            <div>
          <h3 className='m-2 d-flex justify-content-center pt-5'>Flight booking details</h3>
          <div style={{width:"70%",marginLeft:"14%"}} >
          <p style={{textAlign:"center"}}className="p-4">
Flight booking details refer to the information related to an individual's booking of a flight for travel. This typically includes details such as the flight number, the airline name, the departure and arrival airports, the departure and arrival dates and times, the passenger name(s), and any special requests or accommodations.</p>
        {/* <br></br> */}
        <p style={{textAlign:"center"}}className="p-4">
        In addition to this, flight booking details may also include information on the type of ticket purchased, the cost of the ticket, the seat number, and any upgrades or additional services added to the booking, such as extra baggage allowance, in-flight meals, or priority boarding.Flight booking details are crucial for both the traveler and the airline company, as they ensure that the traveler has a confirmed booking for their desired flight and that the airline has accurate records of all its bookings. This information is used to manage flight schedules, passenger information, and revenue data for the airline.</p>
        </div>
        </div>
    <div className='py-5 m-2'  style={{backgroundColor:"#dee2e6"}}>
       <form className="form-inline" onSubmit={handleSubmit} style={{position:"relative"}}>
          <div className="form-row mb-3 d-flex  justify-content-between">
            {/* <h4>Accurate search</h4> */}
            <div className="col-3 depature" style={{marginLeft:"180px"}}>
              <h6 className='m-3'>DepartureDate</h6>
              <input
                type="date"
                placeholder="Date Search"
                className="form-control p-2"
                value={date}
                onChange={handleDateChange}/>
              {/* <input type="date" value={date}  style={{width:"250px"}} /> */}
              <h6 className='m-3'>Places to travel</h6>
              <select className="form-select" onChange={categorysearch}>
                <option value="">All Flights</option>
                {List.map((category, index) => (
                  <option value={category.arrivalAirport.city}>
                    {category.arrivalAirport.city}
                  </option>
                ))}
                </select>
              <br></br>
              <button type="submit" className="btn btn-primary mb-3">Search</button>
            </div>
            
            <div className='col-4 mx-2 img-container' >
                  <img src='https://plus.unsplash.com/premium_photo-1679917737872-1ad9402cf39f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YWVyb3BsYW5lJTIwaW1hZ2VzJTIwYmFja2dyb3VuZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60' alt='img' style={{borderRadius:"24px"}}></img>
            </div>
           
          </div>
        </form>
          
    </div>
    <div>
      {displayAllData}
    </div>
    </div>
  );
}
  
export default Home;