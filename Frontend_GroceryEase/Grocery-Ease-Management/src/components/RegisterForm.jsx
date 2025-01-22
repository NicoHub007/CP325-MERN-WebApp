import { useState } from 'react'
//adding in auth, I am importing Signup from utilities
import { signUp } from '../utilities/users-services'
function RegisterForm(props) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirm: '',
        role: 'employee'
    })

    const [error, setError] = useState('');

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
        setError('');
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        // this is where we will eventually add this to our database
        //  but through utilities/users-services (so Im making util functions to handle api calls)
        try {
            // set this up to be able to add a new user
            const submitData = { ...formData };
            delete submitData.confirm;
            console.log(submitData);
            const user = await signUp(submitData);
            console.log(user);
            props.setUser(user);
        } catch (err) {
            setError('Failed to sign up. Please try again later.');
        }

    };

    return (
        <>
            <h2>Sign Up To The GEM</h2>
            <div>
                <form autoComplete='off' onSubmit={handleSubmit}>
                    <label>Role: </label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    >
                        <option value="admin">Admin</option>
                        <option value="employee">Employee</option>
                    </select>
                    <br/ >
                    <label>Display Name: </label>
                    <input
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        placeholder='Display Name'
                        required
                    />
                    <br />

                    <label>Email Address (needs to be unique) </label>
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
                    // minLength={8}
                    // pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$'
                    // title='Must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters'
                    />
                    <br />
                    <label>Confirm Password: </label>
                    <input
                        type='password'
                        name='confirm'
                        value={formData.confirm}
                        onChange={handleChange}
                        placeholder='Must match password'
                        required
                    // minLength={8}
                    // pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$'
                    // title='Must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters'
                    />
                    <br />
                    <button type='submit' disabled={formData.password !== formData.confirm}>SIGN UP</button>
                </form>
                <p>{error}</p>
            </div>
        </>
    )
}

export default RegisterForm