import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About  from './components/About';
import Skills  from './components/Skills';
import Resume  from './components/Resume';
import Portfolio  from './components/Portfolio';
import Contact  from './components/Contact';
import Footer from './components/Footer';
import Login from './components/Login';
import Contactview from './components/Contactview';
import Addportfolio from './components/Addportfolio';
import Viewportfolio from './components/Viewportfolio';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <React.Fragment>
              <Header key="header" />
              <Hero key="hero" />
              <About key="about" />
              <Skills key="skills" />
              <Resume key="resume" />
              <Portfolio key="portfolio" />
              <Contact key="contact" />
              
             
            </React.Fragment>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/contactview" element={<Contactview />} />
        <Route path="/addportfolio" element={<Addportfolio />} />
        <Route path="/viewportfolio" element={<Viewportfolio />} />

      </Routes>
    </BrowserRouter>
  );
}
export default App;
