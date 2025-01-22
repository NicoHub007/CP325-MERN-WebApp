// users-api.js 

// set up the base url for the route
const LOCAL_URL = 'http://localhost:5050'
const API_URL = '/api/users';
const URL = LOCAL_URL + API_URL;

export async function signUp(userData) {
    // Fetch uses an options object as a second arg to make requests
    // other than basic GET requests, include data, headers, etc.
    const res = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        // Fetch requires data payloads to be stringified
        // and assigned to a body property on the options object
        body: JSON.stringify(userData)
    });

    // Check if request was successful
    if (res.ok) {
        //console.log(res.json());
        // eventually, res.json () will resolve to the JWT
        return res.json();
    } else {
        throw new Error(`Invalid SignUp. Network response was not ok: ${res.status}`);
    }
}

export async function login(credentials) {
    // Fetch uses an options object as a second arg to make requests
    // other than basic GET requests, include data, headers, etc.
    const res = await fetch(URL + '/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        // Fetch requires data payloads to be stringified
        // and assigned to a body property on the options object
        body: JSON.stringify(credentials)
    });
    // Check if request was successful
    if (res.ok) {
        // eventually, res.json () will resolve to the JWT
        return res.json();
    } else {
        throw new Error(`Invalid Login. Network response was not ok: ${res.status}`);
    }
}

export async function getUsers() {
    const res = await fetch(URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (res.ok) {
        return res.json();
    } else {
        throw new Error(`Unable to fetch users: ${res.status}`);
    }
}
// users-api.js

// Delete a user
export async function deleteUser(id) {
    const res = await fetch(`${URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (res.ok) {
        return res.json();
    } else {
        throw new Error(`Unable to delete user: ${res.status}`);
    }
}

// Update a user
export async function updateUser(id, updatedData) {
    const res = await fetch(`${URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
    });

    if (res.ok) {
        return res.json();
    } else {
        throw new Error(`Unable to update user: ${res.status}`);
    }
}
