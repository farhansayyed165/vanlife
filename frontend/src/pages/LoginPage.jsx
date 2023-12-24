import React, { useState } from 'react'
import { useNavigation } from 'react-router-dom'
import { loginUser } from '../api'

function Login() {
    const navigation = useNavigation()
    const [errorMessage, setErrorMessage] = useState()
    const [formData, setFormData] = useState({ email: "", password: "" })
    async function handleSubmit(e) {
        e.preventDefault()
        if (!formData.email || !formData.password) {
            setErrorMessage("Email and Password are required")
            return
        }
        const res = await loginUser(formData)
        console.log(res)
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
            {/* {message && <h3 className="red">{message}</h3>} */}
            {errorMessage && <h3 className="red">{errorMessage}</h3>}

            <form onSubmit={handleSubmit} className="login-form">
                <input
                    name="email"
                    type="email"
                    placeholder="Email address"
                    onChange={handleChange}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                />
                <button
                    disabled={navigation.state === "submitting"}
                >
                    {navigation.state === "submitting"
                        ? "Logging in..."
                        : "Log in"
                    }
                </button>
            </form>
        </div>
    )
}

export default Login