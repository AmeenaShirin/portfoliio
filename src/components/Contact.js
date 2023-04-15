import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import "firebase/compat/database";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const firebaseConfig = {
  apiKey: "AIzaSyD0jaXkAqD7b1cC4BkuPv5vB_RyVY7NFAU",
  authDomain: "myportfolio-31cc5.firebaseapp.com",
  projectId: "myportfolio-31cc5",
  storageBucket: "myportfolio-31cc5.appspot.com",
  messagingSenderId: "207648610202",
  appId: "1:207648610202:web:0345f5f7dfd737c7d00c23",
  measurementId: "G-FD5BYSHL31"
};
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

function Contact(){
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

const [nameError, setNameError] = useState('');
const [emailError, setEmailError] = useState('');
const [subjectError, setSubjectError] = useState('');
const [messageError, setMessageError] = useState('');


const handleSubmit = (event) => {
  event.preventDefault();
  let isValid = true;


  // Validate name field
  if (!/^[A-Za-z -]+$/.test(name)) {
    setNameError('Please enter a valid name with letters.');
    isValid = false;
  } else {
    setNameError('');
  }


  // Validate email field
  if (email.trim() === '') {
    setEmailError('Please enter your email address.');
    isValid = false;
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    setEmailError('Please enter a valid email address.');
    isValid = false;
  } else {
    setEmailError('');
  }
  if (subject.trim() === '') {
    setSubjectError('Please enter a Subject.');
    isValid = false;
  } else {
    setSubjectError('');
  }

  // Validate message field
  if (message.trim() === '') {
    setMessageError('Please enter a message.');
    isValid = false;
  } else {
    setMessageError('');
  }


  if (isValid) {


  // Push data to Firebase Realtime Database
  const contactRef = database.ref('contacts');
  const contact = {
    name: name,
    email: email,
    subject: subject,
    message: message
  };
  contactRef.push(contact);


  // Reset form fields
  setName('');
  setEmail('');
  setSubject('');
  setMessage('');
  toast.success("Data submitted successfully!");
}
}


  return(
<main id="main">
<section id="contact" className="contact">
      <div className="container">

        <div className="section-title">
          <h2>Contact</h2>
        
        </div>

        <div className="row" data-aos="fade-in">

          <div className="col-lg-5 d-flex align-items-stretch">
            <div className="info">
              <div className="address">
               <a href="https://goo.gl/maps/czB1TWy2MbRaBea38"><i className="bi bi-geo-alt"></i>
                </a>
                <h4>Location:</h4>
                <p>Manjeshwar,kasaragod,Kerala</p>
              </div>

              <div className="email">
              <a href="mailto:shirinameena9633@gmail.com"> <i className="bi bi-envelope"></i>
                </a>
                <h4>Email:</h4>
                <p>shirinameena9633@gmail.com</p>
              </div>

            

            
            </div>

          </div>

          <div className="col-lg-7 mt-5 mt-lg-0 d-flex align-items-stretch">
            <form onSubmit={handleSubmit}  className="php-email-form">
              <div className="row">
                <div className="form-group col-md-6">
                  <label htmlFor="name">Your Name</label>
                  <input type="text" name="name" className="form-control" id="name" value={name} onChange={(event) => setName(event.target.value)}/>
                  {nameError && <p style={{ "color": "red" }}>{nameError}</p>}

                </div>
               
                <div className="form-group col-md-6">
                  <label htmlFor="name">Your Email</label>
                  <input type="email" className="form-control" name="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                  {emailError && <p style={{ "color": "red" }}>{emailError}</p>}

                </div>
              
              </div>
              <div className="form-group">
                <label htmlFor="name">Subject</label>
                <input type="text" className="form-control" name="subject" id="subject" value={subject} onChange={(event) => setSubject(event.target.value)} />
                {subjectError && <p style={{ "color": "red" }}>{subjectError}</p>}
              </div>
             

              <div className="form-group">
                <label htmlFor="name">Message</label>
                <textarea className="form-control" name="message" rows="6" value={message} onChange={(event) => setMessage(event.target.value)}  ></textarea>
                {messageError && <p style={{ "color": "red" }}>{messageError}</p>}
              </div>
             

              <div className="text-center"><button type="submit" style={{ "borderRadius":"20px" }}>Send Message</button></div>
           </form>
           <ToastContainer />
          </div>

        
        </div>

      </div>
    </section>
    </main>

      
    );
}
export default Contact;