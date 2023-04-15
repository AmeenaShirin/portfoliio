import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import "firebase/compat/auth";
import { firebase } from './firebase';
   

const Login = () => {
        
      
      const navigate = useNavigate();
      const [error, setError] = useState(null);
      const [details, setDetails] = useState({
            email: '',
            password: '',
        });
      
      
      
        const handleClick = async (e) => {
          e.preventDefault();
        
          const { email, password } = details;
        
          try {
            const res = await firebase.auth().signInWithEmailAndPassword(email, password);
            if (res.user) {
              navigate('/contactview');
            }
          } catch (err) {
            setError(err.message);
          }
        };
  return (
    <div className="contact-form-wrapper d-flex justify-content-center">
    <form action="#" className="contact-form" style={{ "width": "439px", "height": "300px","borderRadius":"25px","marginRight": "500px"}}>
      <h5 className="title">Admin Login</h5>
      
      
      <div>
        <input type="email" className="form-control rounded border-white mb-3 form-input" id="email" name="email" value={details.email}  onChange={(e) => setDetails({ ...details, email: e.target.value })} required  />

		
      </div>
      <div>
        <input type="password" className="form-control rounded border-white mb-3 form-input" id="password" name="password" value={details.password} onChange={(e) => setDetails({ ...details, password: e.target.value })} required />

      </div>
     
      <div className="submit-button-wrapper">
        <input type="submit" id="submit" value="Login" onClick={handleClick} />
      </div>
    </form>
  </div>
  );
}

export default Login
