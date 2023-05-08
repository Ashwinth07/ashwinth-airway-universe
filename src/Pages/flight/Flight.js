import React, { useEffect, useState } from 'react'
import Navbars from '../../components/Navbar'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Flight() {
    const navigates=useNavigate();
    const [searchInput, setInputSearch] = useState("");
    const[List, setList] = useState([])
    const[airline, setairline] = useState("")
    const[date, setdate] = useState("")
    const[time, settime] = useState("2018-01-07T16:17:00.000Z")
    const[place, setplace] = useState("")
    const[List1, setList1] = useState([])
    useEffect(() => {
      console.log(new Date(time).toISOString())
            axios.get(`https://lemon-cygnet-fez.cyclic.app/api/flight/get/?airline=${airline}&time=${new Date(time).toISOString().replace('Z', '')}`)
            .then((response) => {setList(response.data)})
            .catch((error) => console.log(error))    
        },[airline,time,place]
    )
    function handleClick(event) {
        navigates('/bookingpage', { state: { myValue:event.target.value } });
      }
    function Delete(event) {
        axios.delete(`https://lemon-cygnet-fez.cyclic.app/api/flight/delete/${event.target.value}`).then((res)=>{
            alert("Successfully deleted");
          }).catch((err)=>{
            console.log(err);
          })
          axios.get('https://lemon-cygnet-fez.cyclic.app/api/flight/get')
          .then((response) => {setList(response.data)})
          .catch((error) => console.log(error))
      }
        const handleChange=(e)=>{
          setInputSearch(e.target.value);
          const id=e.target.value
          if(id!=""){
          fetch(`https://lemon-cygnet-fez.cyclic.app/api/flight/getname/${id}`)
          .then((res) => res.json())
          .then((response) => {
            setList1(response.data)
        })}
        }
  
    const displayAllData = List.map((x, index) => 
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
               <button type="submit" className="btn btn-primary g" value={x._id} onClick={handleClick}>Book now</button>

               {localStorage.getItem("admin")=="true" && (
                   <div>
                    <br></br>
                   <button type="submit" className="btn btn-primary" value={x._id} onClick={Delete}>Delete</button>
                   </div>
               )}
               
            </div>
          </div>
    </div>
    )
    const displayAllsearchData = List1.map((x, index) => 
    <div key = {index} className='flight-container m-3' >
        <div className='d-flex gap-4 p-3 row justify-content-center text-center align-items-center'>
            <div className='col-1'>
            <h6>{x.airlineName}</h6>
            <p>{x.flightNumber}</p>
            </div>
            <div className='col-2'>
              <h5>{x.departureDate}</h5>
              <p>{x.departureAirport.city}</p>
            </div>
            <div className='col-2'>
              <h1>---------</h1>
              <p style={{textAlign:"center"}}>Non Stop</p>
            </div>
            <div className='col-2'>
              <h5>{x.arrivalDate}</h5>
              <p>{x.arrivalAirport.city}</p>
            </div>
            <div className='col-1'>
              <h6> ₹ {x.price}</h6>
            </div>
            <div className='col-2'>
               <button type="submit" className="btn btn-primary g" value={x._id} onClick={handleClick}>Book now</button>

               {localStorage.getItem("admin")=="true" && (
                   <div>
                    <br></br>
                   <button type="submit" className="btn btn-primary" value={x._id} onClick={Delete}>Delete</button>
                   </div>
               )}
               
            </div>
          </div>
    </div>
    )
  return (
    <div>
        <Navbars></Navbars>
        {/* <input
                type="search"
                placeholder="Search..."
                className="form-control p-2"
                value={searchInput}
                onChange={handleChange}
                style={{width:"30%",marginLeft:"100px",marginTop:"20px"}}
              /> */}
        <form  className="form-inline m-5 d-flex justify-content-end gap-5" style={{height:"150px",width:"60%",backgroundColor:"#eee",padding:"50px",boxShadow:" rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px"}}>
       {/* <label>Airline</label> */}
       <h6 className='d-flex justify-content-center p-2'>Search Funalities</h6>
        <input
                type="text"
                placeholder="Enter airways"
                className="form-control p-2"
                value={airline}
                onChange={(event)=>setairline(event.target.value)}
              />
        <br></br>
       {/* <label></label> */}
        {/* <input
                type="date"
                placeholder="Date Search"
                className="form-control p-2"
                value={date}
                onChange={(event)=>setdate(event.target.value)}
              />
        <br></br> */}
        <input
                type="datetime-local"
                placeholder="Date Search"
                className="form-control p-2"
                value={time}
                onChange={(event)=>settime(event.target.value)}
              />
        <br></br>
        {/* <input
                type="text"
                placeholder="Place search"
                className="form-control p-2"
                value={place}
                onChange={(event)=>setplace(event.target.value)}
              />
         */}
        </form>
        {!searchInput && displayAllData}
        {searchInput && displayAllsearchData}
    </div>
  )
}

export default Flight