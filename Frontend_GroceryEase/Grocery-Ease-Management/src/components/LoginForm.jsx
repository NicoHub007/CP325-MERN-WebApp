import { useState } from "react"
import userService from '../utilities/users-services'
function LoginForm({ setUser }) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const [error, setError] = useState('')
    // this will be used to handle the password reset feature
    function handleChange(evt) {
        setFormData({ ...formData, [evt.target.name]: evt.target.value })
        setError('')
    }

    async function handleSubmit(evt) {
        evt.preventDefault()
        // this is where we will eventually add this to our database
        //  but through utilities/users-services (so Im making util functions to handle api calls)
        //  and we will need to add error handling
        // console.log(formData)
        const credentials = { ...formData }
        console.log(credentials)
        try {
            // the promise returned by the login service method will resolve to the user
            // object includes in the payload of the JWT
            // set this up to be able to login a user
            const user = await userService.login(credentials)
            setUser(user)
        } catch (err) {
            setError('Login failed - Try again');
            console.error(err)
        }
    }
    return (
        <>
            <h2>Log In To The GEM</h2>
            <div>
                <form autoComplete='off' onSubmit={handleSubmit}>

                    <label>Email Addrees (needs to be unique) </label>
                    <input
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        placeholder='Email will be your unique email address'
                        required
                    />
                    <br />
                    <label>Password: </label>
                    <input
                        type='password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        placeholder='Password'
                        required
                    />
                    <br />
                    <button type='submit'>LOGIN</button>
                </form>
                <p>{error}</p>
            </div>
        </>
    )
}

export default LoginForm