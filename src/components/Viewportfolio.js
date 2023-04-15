import { useNavigate } from 'react-router-dom';
import React, { useEffect,useState } from "react";
import "firebase/compat/auth";
import { firebase } from './firebase';
import { Link } from "react-router-dom";
function Viewportfolio() {
    const database = firebase.database();
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const [data, setData] = useState([]);
    function handleLogout() {
        firebase.auth().signOut().then(() => {
          navigate('/login');
        });
      }
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
      useEffect(() => {
        // Listen for changes in the "forms" node in the Realtime Database
        const portfolioRef = database.ref("portfolio");
        portfolioRef.on("value", snapshot => {
          setData(snapshot.val());
        });
      }, []);
      
    const handleDelete = (key) => {
      // Reference the specific item in the Firebase database
      const itemRef = database.ref(`portfolio/${key}`);
      // Remove the item from the Firebase database
      itemRef.remove();
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
<div className="main-content" style={{ "marginLeft":"230px" }}>

  
    <table>
      <thead>
        <tr>
      <th>Title</th>
      <th>Image</th>
      <th>Description</th>
      <th>Delete</th>
        </tr>
      </thead>
      <tbody>
    
      {data && Object.keys(data).map(key => (
      <tr key={key}>
        <td>{data[key].title}</td>
        <td> <img src={data[key].image} alt={data[key].title} style={{ "width":"60px","height":"46px" }} /></td>
        <td>{data[key].description}</td>
        
    
          <td>
          <button className="delete-btn" onClick={() => handleDelete(key)}>
  <img src="assets/img/dlte.png" alt="Delete Icon"/>
</button>
    </td>
        </tr>
        ))}

        
      </tbody>
    </table>
   
  </div>
    </div>
    </div>
  );
}

export default Viewportfolio;