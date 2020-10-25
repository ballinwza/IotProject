import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

import SlideHome1 from '../images/SlideHome1.jpg';
import SlideHome2 from '../images/SlideHome2.jpg';
import SlideHome3 from '../images/SlideHome3.jpg';



const Slideshow = () => {
    const slideImages = [
      SlideHome1,
      SlideHome2,
      SlideHome3
    ];
    
    const fadeProperties = {
      duration: 10000,
      pauseOnHover: true,
      indicators: true,
      prevArrow: <div className="Arrow Arrow-prev"></div>,
      nextArrow: <div className="Arrow Arrow-next"></div>
    };

    return (
      <div className="Slide-container">
        <Slide easing="ease" {...fadeProperties}>
          {slideImages.map((each, index) => (
            <div key={index} className="each-slide">
              <div style={{'backgroundImage': `url(${each})`}}></div>
            </div>
            ))
          }
        </Slide>
      </div>
    )
};

export default Slideshow;