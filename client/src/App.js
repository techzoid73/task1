import React from 'react'

import{FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {  faEnvelope, faKey, faPhone, faUser } from '@fortawesome/free-solid-svg-icons'
import './App.css';


import axios from 'axios';
import { useEffect, useState } from 'react';

const api = axios.create({
  baseURL : "http://localhost:5000/"
});

function App() {

  const [name,setName] = useState('');
  const[email,setEmail]=useState('');
  const[phone,setPhone]=useState('');
  const[password,setPassword]=useState('');
  const [list,setList] = useState([]);

  const fetchData = async ()=>{
    try{
        const response = await api.get("/");
        console.log(response.data.data.list);
        setList(response.data.data.list);
    }catch(err){}
};
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      console.log(name);
      console.log(email);
      console.log(phone);
      console.log(password);
      const response =  await api.post("/create", {
        name,email,phone,password
      }
      
      );
      console.log(response);
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      fetchData();
    }catch(err){}
  };
  const handleSubmit1 = async (e)=>{
    e.preventDefault();
    try{
      console.log(name);
      console.log(email);
      console.log(phone);
      console.log(password);
      const response =  await api.post("/remove", {
        name,email,phone,password
      }
      
      );
      console.log(response);
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      fetchData();
    }catch(err){}
  };

useEffect(() => {
     fetchData();
       }, [])

  return (
    <div className="App">
      <header className="App-header">
       
      <div className="main-box">
          <h3>Registration Form</h3>
       <hr></hr> 
       <form action="">
       <label>Enter Name:</label>
       <div class="input-container">
       <i><FontAwesomeIcon icon={faUser} /></i>
       <input type='text' id="text-input" placeholder="Name"  value = { name }
              onChange = {(e)=>setName(e.target.value)}></input>
       </div>
       <label>Enter E-mail:</label>
       <div class="input-container">
       <i><FontAwesomeIcon icon={faEnvelope} /></i>
       <input type='email' id="text-input"  placeholder="E-mail"  value = { email }
              onChange = {(e)=>setEmail(e.target.value)}></input>
       </div>
       <label>Enter Contact:</label>
       <div class="input-container">
       <i><FontAwesomeIcon icon={faPhone} /></i>
       <input type='number' id="text-input" placeholder="Contact" value = { phone }
              onChange = {(e)=>setPhone(e.target.value)}></input>
       </div>
       <label>Enter Password:</label>
       <div class="input-container">
       <i><FontAwesomeIcon icon={faKey} /></i>
       <input type='password' id="text-input" placeholder="Password" value = { password }
              onChange = {(e)=>setPassword(e.target.value)}></input>
       </div>
       <button id="btn"  onClick = {handleSubmit}>Sign Up</button>
       <div className="link">
           <h6>Already have an Account?</h6>
       </div>
       </form></div></header>
       <br/><br />
       <div className="list-group">
         
       <table className="table table-hover table-dark">
  <thead>
    <tr className="bg-warning">
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Number</th>
       <th scope="col">Password</th>
     <th scope="col">Edit</th>
     <th scope="col">Delete</th>
    </tr>
  </thead>
       <tbody>
       {list &&
           
           list.map((l) => {
             return(
               <tr
             key={ list.id }
>
                  <td>{ l.name }</td>
                  <td>{l.email}</td>
                  <td>{l.phone}</td>
                  <td>{l.password}</td>
                  <td><button
               //  onClick={(e) => handleUpdate(e, restaurant.id)}
                 className="btn btn-warning">
                 Update
            </button></td>
            <td><button
               //  onClick={(e) => handleUpdate(e, restaurant.id)}
                 className="btn btn-danger" onClick = {handleSubmit1}>
                 Delete
            </button></td>
             </tr>
             )
           })
           
       }
       </tbody>
       </table></div>
      </div>
     )   
}

export default App;
