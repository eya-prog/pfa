import React ,{ Fragment, useState} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {Link } from 'react-router-dom';//for balise link
import {set_ALERT} from'../../actions/alert';



const Register= (props) => {
    const [formData,setFormData]=useState({
        name:'',
        email:'',
        password:'',
        password2:''
    });
    const{name,email,password,password2}=formData;
    const onChange = e =>setFormData({...formData, [e.target.name]:e.target.value})//copy formdata and change the name by the name in input/name in brackets is a considered as key
  const onSubmit= async e=>{
      e.preventDefault();
      //make sure that passwords match
      if(password!==password2){ 
          props.set_ALERT('password do not match','danger');//type of alert//exist in app.css alert-danger
      
      }
      else{
          //create new user
         const newUser={
             name,email,password
         };
         try {
             const config={
                 headers:{
                     'Content-Type':'application/json'
                 }
             };
             const body=JSON.stringify(newUser);//convertit une valeur JavaScript en chaîne JSON
             const res=await axios.post('/api/users',body,config);
             console.log(res.data)
         } catch (err) {
              console.error(err.response.data);
         }
         
      }
  }
    return(
     <Fragment> 
         <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={e=>onSubmit(e)}>
        <div className="form-group">
          <input type="text"
           placeholder="Name" 
           name="name" value={name}
          onChange = {e => onChange(e)} 
          required />
        </div>
        <div className="form-group">
          <input type="email"
           placeholder="Email Address"
            name="email"
            value={email}
            onChange = {e => onChange(e)} 
             required  />
          <small className="form-text">This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange = {e => onChange(e)} 
          
            minLength="6"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange = {e => onChange(e)} 
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
     </Fragment>
 )}
;
export default connect(null,{set_ALERT})(Register);