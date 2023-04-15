import React, { useState, useEffect } from 'react';
import { firebase } from './firebase';
function Portfolio() {

  const storage = firebase.storage();
  const db = firebase.database();
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    const dbRef = firebase.database().ref('portfolio');
    dbRef.on('value', (snapshot) => {
      const portfolioArray = [];
      for (const key in snapshot.val()) {
        portfolioArray.push(snapshot.val()[key]);
      }
      setPortfolio(portfolioArray);
    });
  }, []);
 
  return (
    <main id="main">
      <section id="portfolio" className="portfolio section-bg">
        <div className="container">
          <div className="section-title">
            <h2>Portfolio</h2>
          </div>
          <div className="portfolio-container" style={{ display: 'flex', flexWrap: 'wrap' }}>
            {portfolio.map((item, index) => {
              return (
                <div key={index} style={{ flexBasis: '50%', marginBottom: '20px' }}>
                  <h4>{item.title}</h4>
                  <img src={item.image} alt={item.title} style={{ width: '100%',borderRadius: '20px'  }} /><br/><br/>
                  <p style={{ "textAlign":"justify"}}>{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Portfolio;
