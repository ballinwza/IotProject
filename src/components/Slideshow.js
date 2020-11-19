import React from 'react';
import { Slide } from 'react-slideshow-image';
import {Link} from 'react-router-dom';
import 'react-slideshow-image/dist/styles.css';

import SlideHome1 from '../images/SlideHome1.jpg';
import SlideHome2 from '../images/SlideHome2.jpg';
import SlideHome3 from '../images/SlideHome3.jpg';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";


const Slideshow = () => {
    const slideImages = [
      SlideHome1,
      SlideHome2
    ];
    
    const fadeProperties = {
      duration: 15000,
      pauseOnHover: true,
      indicators: true,
      indicators: i=> (<div className="indicator"></div>),
      prevArrow: <div className="Arrow Arrow-prev"><FontAwesomeIcon icon={faAngleLeft}/></div>,
      nextArrow: <div className="Arrow Arrow-next"><FontAwesomeIcon icon={faAngleRight}/></div>
    };

    return (
      <div className="container-fluid Slide-container">
        <Slide easing="ease" {...fadeProperties}>
          <div className="each-slide">
            <img src={SlideHome2}></img>
            <div className="slideContent-1">
              <h1>Services</h1>
              <p>
                บริษัทฯได้เป็นส่วนหนึ่งของงานที่ปรึกษาการใช้งานรังสีในภาคอุตสาหกรรม งานวิจัย ตลอดจนการติดตั้งและใช้งานเครื่องมือวัดรังสี <br />
                ตั้งแต่ขนาดเล็กไปจนถึงขนาดใหญ่ โดยเรามีบุคลากรที่มีความรู้ความสามารถเฉพาะทางด้านรังสีโดยเฉพาะ <br/>
                ที่มีประสบการณ์ทำงานไม่ต่ำกว่า 10 ปีเป็นประกัน
              </p>
              <Link exact to='/patientsortedlist'><button type="button" className="btn btn-light">More</button></Link>
            </div>
          </div>

          <div className="each-slide">
            <img src={SlideHome1}></img>
            <div className="slideContent-2">
              <h1>Products</h1>
              <p>
                บริษัทฯได้เป็นส่วนหนึ่งของงานที่ปรึกษาการใช้งานรังสีในภาคอุตสาหกรรม งานวิจัย  <br />
                ตลอดจนการติดตั้งและใช้งานเครื่องมือวัดรังสี ตั้งแต่ขนาดเล็กไปจนถึงขนาดใหญ่  <br/>
                โดยเรามีบุคลากรที่มีความรู้ความสามารถเฉพาะทางด้านรังสีโดยเฉพาะ <br/>
                ที่มีประสบการณ์ทำงานไม่ต่ำกว่า 10 ปีเป็นประกัน
              </p>
              <Link exact to='/product'><button type="button" className="btn btn-dark">More</button></Link>
            </div>
          </div>

          <div className="each-slide">
            <img src={SlideHome1}></img>
            <div className="slideContent">
              <h1>Slide3</h1>
            </div>
          </div>
        </Slide>
      </div>
    )
};

export default Slideshow;

/* แบบที่ 1

<div className="container-fluid Slide-container">
        <Slide easing="ease" {...fadeProperties}>
          {slideImages.map((each, index) => (
            <div key={index} className="each-slide">
              <img src={each}></img>
              <div className={index}>ASD</div>
            </div>
            ))
          }
        </Slide>
      </div>

*/