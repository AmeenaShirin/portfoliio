import { useRef, useEffect } from 'react';

function Skills() {
  const skillsRef = useRef(null);

  useEffect(() => {
    const checkSkillsInView = () => {
      if (skillsRef.current) {
        const skillsRect = skillsRef.current.getBoundingClientRect();
        const isVisible = skillsRect.top < window.innerHeight * 0.8;
        if (isVisible) {
          const progressBars = skillsRef.current.querySelectorAll('.progress .progress-bar');
          progressBars.forEach((bar) => {
            bar.style.width = `${bar.getAttribute('aria-valuenow')}%`;
          });
        }
      }
    };

    window.addEventListener('scroll', checkSkillsInView);
    checkSkillsInView(); // check on mount in case skills section is already in view

    return () => {
      window.removeEventListener('scroll', checkSkillsInView);
    };
  }, []);
  
 return(
        <main id="main">
        <section id="skills" className="skills section-bg" ref={skillsRef}>
        <div className="container">
  
          <div className="section-title">
            <h2>Skills</h2>
           
          </div>
  
          <div className="row skills-content">
  
            <div className="col-lg-6" data-aos="fade-up">
  
              <div className="progress">
                <span className="skill">HTML <i className="val">90%</i></span>
                <div className="progress-bar-wrap">
                  <div className="progress-bar" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
  
              <div className="progress">
                <span className="skill">CSS <i className="val">89%</i></span>
                <div className="progress-bar-wrap">
                  <div className="progress-bar" role="progressbar" aria-valuenow="89" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
  
              <div className="progress">
                <span className="skill">JavaScript <i className="val">80%</i></span>
                <div className="progress-bar-wrap">
                  <div className="progress-bar" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
              <div className="progress">
                <span className="skill">Jquery <i className="val">75%</i></span>
                <div className="progress-bar-wrap">
                  <div className="progress-bar" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
  
            </div>
  
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
  
              <div className="progress">
                <span className="skill">ReactJs<i className="val">75%</i></span>
                <div className="progress-bar-wrap">
                  <div className="progress-bar" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
  
              <div className="progress">
                <span className="skill">Python <i className="val">70%</i></span>
                <div className="progress-bar-wrap">
                  <div className="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
  
              <div className="progress">
                <span className="skill">Django <i className="val">80%</i></span>
                <div className="progress-bar-wrap">
                  <div className="progress-bar" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
              <div className="progress">
                <span className="skill">mysql <i className="val">60%</i></span>
                <div className="progress-bar-wrap">
                  <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
  
            </div>
  
          </div>
       
        </div>
      </section>
      
</main>

      
    );
}
export default Skills;