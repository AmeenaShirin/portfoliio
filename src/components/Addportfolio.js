import React, { useState,useEffect } from 'react';
import { Link } from "react-router-dom";
import { firebase } from './firebase';
import { useNavigate } from 'react-router-dom';
import "firebase/compat/storage";
function Addportfolio() {


  const storage = firebase.storage();

  const db = firebase.database();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const database = firebase.database();
  const [imageUrl, setImageUrl] = useState('');
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [portfolio, setPortfolio] = useState([]);
  const [formErrors, setFormErrors] = useState({
    title: '',
    description: '',
    image: ''
  });
  const validateForm = () => {
    let errors = {};
    let isValid = true;
  
    if (!title.trim()) {
      errors.title = 'Title is required';
      isValid = false;
    }
  
    if (!description.trim()) {
      errors.description = 'Description is required';
      isValid = false;
    }
  
    if (!image) {
      errors.image = 'Image is required';
      isValid = false;
    }
  
    setFormErrors(errors);
    return isValid;
  };
    

 
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
    const storageRef = firebase.storage().ref();
    const imagesRef = storageRef.child('images/' + image.name);
  
    const uploadTask = imagesRef.put(image);
  
    // Get the progress of the upload
    uploadTask.on('state_changed', (snapshot) => {
      // Calculate the percentage of the upload completed
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${progress}% done`);
      // Set the width of the progress bar to the calculated percentage
      document.getElementById("progress-bar").style.width = `${progress}%`;
    }, (error) => {
      console.error(error);
    }, () => {
      // Once the upload is complete, get the download URL
      uploadTask.snapshot.ref.getDownloadURL().then((url) => {
        const dbRef = firebase.database().ref('portfolio');
        dbRef.push({ title, description, image: url });
        setTitle('');
        setDescription('');
        setImage(null);
      });
    });
  }
  };

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
  useEffect(() => {
    // Listen for changes in the "forms" node in the Realtime Database
    const portfolioRef = database.ref("portfolio");
    portfolioRef.on("value", snapshot => {
      setData(snapshot.val());
    });
  }, []);
  

useEffect(() => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // User is signed in, show the dashboard
    } else {
      // No user is signed in, redirect to the login page
      navigate('/login');
    }
  });
}, [navigate]);
function handleLogout() {
  firebase.auth().signOut().then(() => {
    navigate('/login');
  });
}
  return (
    <div>
    <div className="dashboard">
      <div className="sidebar">
      <div className="sidebar-title">Dashboard</div>
      <button className="btn">Contacts</button>
     <div className="dropdown">
              <button onClick={() => setShowMenu(!showMenu)} type="button" className="btn ">
               Portfolio
              </button>
              {showMenu && (
                <ul style={{ "backgroundColor": "gainsboro","borderRadius":"15px","height":"85px" }}>
                 <Link to="/addportfolio">Add Portfolio</Link><br/><br/>
                  <Link to="/viewportfolio">View Portfolio</Link>
                  
                </ul>
              )}
            </div>
  <button className="bt" onClick={handleLogout}>Logout</button>
</div>
<div className="contact-form-wrapper d-flex justify-content-center">
<form action="#" className="contact-form" style={{ "width": "439px", "height": "480px","borderRadius":"25px"}} onSubmit={handleSubmit}>
  <h5 className="title">Add Portfolio</h5>

  <div className="form-group">
    <label htmlFor="title">Title:</label>
    <input type="text" className="form-control" id="title" value={title} onChange={handleTitleChange} name="title" />
  
  </div>

  <div className="form-group">
    <label htmlFor="image">Image:</label>
    <input type="file" className="form-control" id="image" onChange={handleImageChange} />
   
  </div>

  <div className="form-group">
    <label htmlFor="description">Description:</label>
    <textarea className="form-control" id="description"  value={description} onChange={handleDescriptionChange} ></textarea>
  
  </div>

  <div className="submit-button-wrapper">
    <input type="submit" name="submit" value="Submit" />
  </div><br/>
  <div className="progress-bar-container">
      <div id="progress-bar" className="progress-bar"></div>
    </div>
</form>

    </div>
  </div>
     </div>
    
  );
}

export default Addportfolio;