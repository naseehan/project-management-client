import React, { useState } from 'react'
import '../stylePages/loginStyles/App.css'
import axios from 'axios'

const Register = () => {
    
const [name, setName] = useState("")
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [success, setSuccess] = useState(null)

const handleName = (e) => {
    setName(e.target.value)
}

const handleEmail = (e) => {
    setEmail(e.target.value)
}

const handlePassword = (e) => {
    setPassword(e.target.value)
}

const handleSubmit = async (e) => {
    e.preventDefault()
    try {
       const response =  await axios.post(`${process.env.REACT_APP_BASE_URL}/register`, {name, email, password})
      
        setName('')
        setEmail('')
        setPassword('')
        if(response.status === 201 ){
            setSuccess("User created successfully")
          }
       window.location.href = '/login'
    } catch (error) {
        console.error('Error saving user', error);
    }
}

  return (
    <>
    <section className='register-section'>
        <div className="container">
            <div className="register-form login-form">
                <h1>Create your account</h1>
                <form action="" onSubmit={handleSubmit}>
                {success!== null ?  <p className="text-white-50 mb-3" style={{ color: 'green' }}>{success}</p> : null}

                    <label htmlFor="name">Full Name</label>
                    <input type="text" name="name" value={name} id="name" placeholder='John Doe' onChange={handleName} required/>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="email" value={email} id="email" placeholder='name@example.com' onChange={handleEmail} required/>
                    <label htmlFor="password">Password</label>
                    <input type="password" value={password} name="password" id="password" placeholder='**************' onChange={handlePassword} required/>
                    <button type='submit'>Sign up</button>
                    <p>  Already have an account ?
                         <a href="/login"> Sign in here</a> 
                    </p>
                </form>
               
            </div>
            
        </div>
    </section>
</>
  )
}

export default Register