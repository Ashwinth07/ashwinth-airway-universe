import React from 'react'
import Navbars from '../components/Navbar'
import { useLocation } from 'react-router-dom';

function Bookchild() {
    const location = useLocation();
    const book = location.state?.book;
    console.log(book);
  return (
    <div>
        <Navbars></Navbars>
    </div>
  )
}

export default Bookchild