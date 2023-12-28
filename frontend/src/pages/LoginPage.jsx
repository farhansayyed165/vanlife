import React, { useContext, useState } from 'react'
import { json, useNavigate, useLocation } from 'react-router-dom'
import { loginUser } from '../api'
// import { AuthContext } from '../context/AuthProvider'
import useAuth from '../hooks/useAuth';


function Login() {
    const { auth, setAuth } = useAuth();
    const location = useLocation();

    const navigate = useNavigate();
    const [buttonState, setButtonState] = useState("Login")
    const message = location.state?.message
    const [errorMessage, setErrorMessage] = useState();
    const [formData, setFormData] = useState({ email: "", password: "" });
    async function handleSubmit(e) {
        e.preventDefault()
        setButtonState("Submitting")

        loginUser(formData)
            .then(res => {
                if(res.error){
                    setButtonState("Login")
                    setErrorMessage(res.message)
                    return
                }
                setAuth({ user: res.name, accessToken: res.accessToken })
                if (location.state?.from?.pathname) {
                    navigate(location.state.from.pathname)
                }
                else {
                    navigate("/")
                }
            })
            .catch(error => {
            console.log(error)
            })

    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))

    }
    return (
        <div className="login-container">
            <h1>Sign in to your account</h1>
            {/* {message && <h3 className="text-green-800">{message}</h3>} */}

            {location?.state?.message && <h3 className="text-green-800">{location?.state?.message}</h3>}
            <h3 className="red" style={{fontWeight:"600"}}>{errorMessage}</h3>

            <form onSubmit={handleSubmit} className="login-form">
                <input
                    name="email"
                    type="email"
                    placeholder="Email address"
                    onChange={handleChange}
                    required
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />
                <button
                    className={buttonState}
                >
                    {buttonState == "Submitting" ? "Submitting..." : (buttonState == "Error" ? "Try Again" : buttonState)}
                </button>
            </form>
        </div>
    )
}

export default Login