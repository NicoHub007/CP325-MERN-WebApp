import { Link } from 'react-router';
import { logOut } from '../utilities/users-services';

function Nav() {

    function handleLogOut() {
        // delegate this functionality to users-services
        logOut();
        // Update state will also cause a rerender
        // clear token from state
        // remove token from local storage
        // remove user from local storage
        // redirect to home page
        setUser(null);
    }
    return (
        <nav>
            <div className='navContainer'>
                <Link to='/' >Home</Link>
                &nbsp; | &nbsp;
                <Link to='/grocery'>Groceries</Link>
                &nbsp; | &nbsp;
                <Link to='/order'>Orders</Link>
                &nbsp; | &nbsp;
                <Link to='/employee'>Employees</Link>
                &nbsp; | &nbsp; 
            </div>
            <div>
                <Link to='' onClick={handleLogOut}>Sign Out</Link>
            </div>
        </nav>
    )
}

export default Nav;