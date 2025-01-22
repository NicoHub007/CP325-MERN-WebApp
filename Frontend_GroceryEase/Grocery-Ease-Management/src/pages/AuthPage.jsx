import { useState } from 'react'
import RegisterForm from '../components/RegisterForm'
import LoginForm from '../components/LoginForm'

function AuthPage(props) {
    const [register, setRegister] = useState(true)

    function togglePage() {
        setRegister(!register)
    }
    return (
        <>
            <h1>Register or Log In</h1>
            <>
                {register
                    ?
                    <RegisterForm setUser={props.setUser} />
                    :
                    <LoginForm setUser={props.setUser} />
                }
            </>
            <h2>OR go here to {register ? 'Log In' : 'Register'}</h2>
            <button onClick={togglePage}>{register ? 'Log In' : 'Register'}</button>
        </>
    )
}

export default AuthPage