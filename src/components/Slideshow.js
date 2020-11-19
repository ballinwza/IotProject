import React from 'react';
import { Slide } from 'react-slideshow-image';
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
      SlideHome1
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
          {slideImages.map((each, index) => (
            <div key={index} className="each-slide">
              <img src={each}></img>
            </div>
            ))
          }
        </Slide>
      </div>
    )
};

export default Slideshow;