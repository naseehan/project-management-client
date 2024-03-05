import React, { useState } from 'react'
import '../stylePages/loginStyles/App.css'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from 'axios'

const Login = ({setUser, setAdminEmail}) => {

const [name, setName] = useState("")
const [password, setPassword] = useState("")
const [_, setCookies] = useCookies(["access_token"])
const navigate = useNavigate()
const [error, setError] = useState()

const handleSubmit = async (e) => {
    e.preventDefault()
    try{
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/login`,{name, password})
   
    setCookies("access_token", response.data.token)
    window.localStorage.setItem("userID", response.data.userID)
    setUser(response.data.name)
    setAdminEmail(response.data.email)
    navigate("/")
} catch (error) {
    if(error.response){
        if(error.response.status === 300) {
          setError("Invalid email or Password")
        } else if(error.response.status === 400) {
          setError("User doesn't exist")
        }else {
          setError("An error occured please try again later.");
        } }else {
          // Request was made but no response was received
          setError("An error occurred. Please check your internet connection.");
        }
        setTimeout(() => {
          setError(null);
        }, 2000);
}
}

  return (
    <>
        <section className='login-section'>
            <div className="container">
                <div className="login-form">
                    <h1>Sign In</h1>
                    <form action="" onSubmit={handleSubmit}>
                        {/* <div className="error"> */}
                        {error && <p className="text-red-50 mb-3" style={{ color: 'red' }}>{error}</p> }
                        {/* </div> */}
                        <label htmlFor="name">User name</label>
                        <input  type="text" name="name" id="name" 
                                placeholder='John Doe'  
                                required 
                                onChange={(e) => setName(e.target.value)}
                        />
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password"
                               placeholder='**************'
                               required 
                               onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type='submit'>Sign in</button>
                        <p>  Don't have an account yet ? 
                            <Link to="/register">
                              Sign up here 
                             </Link>
                        </p>
                    </form>
                   
                </div>
                
            </div>
        </section>
    </>
  )
}

export default Login