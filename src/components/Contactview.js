import { useNavigate } from 'react-router-dom';
import React, { useEffect,useState } from "react";
import "firebase/compat/auth";
import { firebase } from './firebase';
import { Link } from "react-router-dom";


 

function Contactview() {
    const database = firebase.database();
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [selectedData, setSelectedData] = useState({});
    const [editing, setEditing] = useState(false);
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newSubject, setNewSubject] = useState('');
    const [newMessage, setNewMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState("");
    const PAGE_SIZE = 10; // number of rows to display per page
    const [currentPage, setCurrentPage] = useState(1);
    const [showMenu, setShowMenu] = useState(false);

    const handleNextPage = () => {
      setCurrentPage(currentPage + 1);
    };
  
    const handlePrevPage = () => {
      setCurrentPage(currentPage - 1);
    };
  
    // Calculate the start and end indices of the current page
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    

    useEffect(() => {
      const contactsRef = database.ref("contacts").orderByChild("name");
      contactsRef.on("value", snapshot => {
        setData(snapshot.val() || {});
      });
    }, [database]);
  
    const handleSearch = e => {
      setSearchTerm(e.target.value);
    };
  
   
    const filteredData = Object.keys(data)
    .filter(key => data[key].name.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
    .reduce((obj, key) => {
      obj[key] = data[key];
      return obj;
    }, {});
  




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


      useEffect(() => {
        const contactsRef = database.ref("contacts");
        contactsRef.on("value", snapshot => {
          setData(snapshot.val() || {});
        });
      }, []);


      function handleDelete(key) {
        const contactsRef = database.ref('contacts');
        contactsRef.child(key).remove();
      }
     
      function handleEdit(key, contact) {
        setSelectedData({ ...contact, id: key });
        setNewName(contact.name);
        setNewEmail(contact.email);
        setNewSubject(contact.subject);
        setNewMessage(contact.message);
        setEditing(true);
      }
     


      function handleUpdate() {
        const contactsRef = database.ref('contacts');
        const updatedContact = {
          ...selectedData,
          name: newName,
          email: newEmail,
          message: newMessage,
        };
        contactsRef.child(selectedData.id).set(updatedContact).then(() => {
          // Refresh data state after updating data in Firebase
          contactsRef.once("value", snapshot => {
            setData(snapshot.val() || {});
          });
          setEditing(false);
        });
      }
     function handleCancel() {
    setEditing(false);
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
  <input type="text" placeholder="Search" onChange={handleSearch} style={{"width":"250px","height":"40px","borderRadius":"10px"}}/>
  
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Subject</th>
          <th>Message</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
      {Object.keys(filteredData).map(key => {
            const contact = filteredData[key];
            return (
            <tr key={key}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.subject}</td>
              <td>{contact.message}</td>
              <td>
              <button className="edit-btn" onClick={() => handleEdit(key, contact)} data-toggle="modal" data-target="#editModal">
  <img src="assets/img/edi.png" alt="Edit Icon" style={{ "height":"30px"}}/>
</button>
         </td>
          <td>
          <button className="delete-btn" onClick={() => handleDelete(key)}>
  <img src="assets/img/dlte.png" alt="Delete Icon" style={{ "height":"30px"}} />
</button>
                </td>

              </tr>
          );
        })}

        
      </tbody>
    </table>
    <div>
    <div style={{ marginTop: "10px", display: "flex", justifyContent: "center",}}>
          <button className="btn3" onClick={handlePrevPage} disabled={currentPage === 1}>
            Prev
          </button>
          <div style={{ marginLeft: "10px", marginRight: "10px"}}> {currentPage}</div>
          <button className="btn3" disabled={Object.keys(filteredData).length < PAGE_SIZE} onClick={handleNextPage}>Next</button>
        </div>
      </div>
      </div>
    {editing && (
     <div style={{ "marginRight":"8px","width":"450px"}}>
       <div className="modal-dialog">
         <div className="modal-content">
           <div className="modal-header">
             <h5 className="modal-title" id="editModalLabel">Edit Contact</h5>
             <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleCancel}>
               <span aria-hidden="true">&times;</span>
             </button>
           </div>
           <div className="modal-body">
             <form>
               <div className="form-group">
                 <label htmlFor="name">Name</label>
                 <input type="text" className="form-control" id="name" value={newName} onChange={e => setNewName(e.target.value)} />
               </div>
               <div className="form-group">
                 <label htmlFor="email">Email</label>
                 <input type="email" className="form-control" id="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} />
               </div>
               <div className="form-group">
                 <label htmlFor="subject">Subject</label>
                 <input type="text" className="form-control" id="subject" value={newSubject} onChange={e => setNewSubject(e.target.value)} />
               </div>
               <div className="form-group">
                 <label htmlFor="message">Message</label>
                 <textarea className="form-control" id="message" rows="3" value={newMessage} onChange={e => setNewMessage(e.target.value)}></textarea>
               </div>
             </form>
           </div>
           <div className="modal-footer">
             <button type="button" className="btn1" data-dismiss="modal" onClick={handleCancel}>Cancel</button>
             <button type="button" className="btn1" onClick={handleUpdate}>Update</button>
           </div>
         </div>
       </div>

       </div>
      )}

  </div>
</div>

  
   
   
  );
}

export default Contactview;

