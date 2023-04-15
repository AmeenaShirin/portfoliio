import React, { useEffect } from 'react';
import Typed from 'typed.js';


function Hero() {
  useEffect(() => {
    const typed = new Typed('.typed', {
      strings: ['Designer', 'Developer', 'Freelancer'],
      typeSpeed: 90,
      backSpeed: 50,
      loop: true
    });


    return () => {
      typed.destroy();
    };
  }, []);


  return (
    <section id="hero" className="d-flex flex-column justify-content-center align-items-center">
      <div className="hero-container" data-aos="fade-down">
        <h1>Ameena Syed</h1>
        <p>I'm <span className="typed"></span></p>
      </div>
    </section>
  );
}
export default Hero;
