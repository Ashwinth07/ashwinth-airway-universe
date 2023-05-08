import React, { useState } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import Navbars from '../components/Navbar';

function Aboutus() {
    
  const [content, setContent] = useState({
    heading: "About Our Page",
    imagePath: "https://example.com/about-image.jpg",
    introduction: "Welcome to our flight booking website. We are a team of experienced professionals dedicated to providing our customers with the best travel experience.",
    details: "Our website offers a wide range of flight options, from budget to luxury, to destinations all around the world. Our team of travel experts is available 24/7 to assist you with any queries or concerns you may have."
  });

  return (
    <div style={{minHeight:"90vh"}}>
        <Navbars></Navbars>
        <Container className='d-flex justify-content-center m-3'>
            <div>
          <h1>{content.heading}</h1>
            <Image src={content.imagePath} fluid />

            <h2>{content.introduction}</h2>
            <p>{content.details}</p>

        </div>
        </Container>


    </div>
  );
}

export default Aboutus;
