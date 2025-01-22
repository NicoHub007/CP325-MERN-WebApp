import * as usersAPI from './users-api';
// I need to pass in userData because this is attempting
//      to add a new user to the database
export async function signUp(userData) {
    // Delegate the network request code to the users-api.js API module
    // which will ultimately return a JSON Web Token
    const token = await usersAPI.signUp(userData);
    console.log(token);
    // for now, we will console.log the token to see that it exists and return
    // the name and email that was sent to use
    // we will also eventually save the token in the local storage
    localStorage.setItem('token', token);
    // return ({ name: userData.name, email: userData.email })
    console.log(token);
    return (getUser())
    // This function will be called when the Sign Up button is clicked
    // and will handle the network request to sign up the user
    // and return the user's name and email
    // It will also handle any errors that may occur during the sign up process
    // and display an error message to the user
    // It will also save the token in the local storage for future authentication
    // This function will be used in the SignUpForm component
    // to authenticate the user when they return to the app
    // after signing up
    // This function will also be used in the SignUpForm component
    // to display the user's name and email on the sign up page when they return
    // to the app
    // after signing up

}

export async function login(credentials) {
    const token = await usersAPI.login(credentials);

    // Persist the token into the local storage
    localStorage.setItem('token', token);
    return getUser();

}

export function getToken() {
    // getItem returns null if there is no string in the key 'token' or the key doesn't exist
    const token = localStorage.getItem('token');
    if (!token) return null;
    // Obtain the payload
    const payload = JSON.parse(atob(token.split('.')[1]))
    // Check if the token has expired
    // A JWT's expiration is expressed in milliseconds, not seconds, so convert it to milliseconds
    if (payload.exp < Date.now() / 1000) {
        // If the token has expired, remove it from the local storage
        // Token has expired, so remove it from the local storage
        localStorage.removeItem('token');
        return null;
    }
    // If the token hasn't expired, return it
    return token;
}

export function getUser() {
    const token = getToken();
    // if there is a token, return the user in the payload, otherwise return null
    // spit the token, parse the second part of it, once you decode, access the user key in the object
    return token ? JSON.parse(atob(token.split('.')[1])).user : null;
    // This function will be called when the user returns to the app
}

export async function getUsers() {
    return await usersAPI.getUsers();
}

// Delete a user
export async function deleteUser(id) {
    await usersAPI.deleteUser(id);
}

// Update a user
export async function updateUser(id, updatedData) {
    return await usersAPI.updateUser(id, updatedData);
}

export function logOut() {
    // Remove the token from the local storage
    localStorage.removeItem('token');
    // This function will be called when the user logs out of the app
    // It will remove the token from the local storage for future authentication
    // This function will be used in the SignUpForm component
    // to remove the token when the user signs out of the app
    // and when the user signs out of the app
    // it will also remove the user from the local storage for future authentication

}

export default { login };
