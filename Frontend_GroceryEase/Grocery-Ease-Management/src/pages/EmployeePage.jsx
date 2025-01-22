import React, { useEffect, useState } from "react";
import EmployeeCard from "../components/EmployeeCard";
import { getUsers, deleteUser, updateUser } from "../utilities/users-services"; // Import delete and edit methods
import "../assets/EmployeePage.css";

function EmployeePage() {
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch employee data on component mount
        const fetchEmployees = async () => {
            try {
                const data = await getUsers(); // Call the API service
                setEmployees(data); // Update state with fetched data
            } catch (err) {
                setError(err.message); // Set error message
            }
        };

        fetchEmployees();
    }, []);

    // Handle deleting a user
    const handleDelete = async (id) => {
        try {
            await deleteUser(id); // Call the API service
            setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee._id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    // Handle updating a user
    const handleUpdate = async (id, updatedData) => {
        try {
            const updatedUser = await updateUser(id, updatedData); // 
            setEmployees((prevEmployees) =>
                prevEmployees.map((employee) =>
                    employee._id === id ? updatedUser : employee
                )
            );
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="employees-list">
            <h1>Employees</h1>
            {error && <p className="error-message">Error: {error}</p>}
            <div className="employee-cards">
                {employees.length > 0 ? (
                    employees.map((employee) => (
                        <EmployeeCard
                            key={employee._id}
                            name={employee.name}
                            email={employee.email}
                            role={employee.role || "N/A"} // Default role if not specified
                            onEdit={() => handleUpdate(employee._id, { name: 'Updated Name' })} // Example edit function
                            onDelete={() => handleDelete(employee._id)} // Delete function
                        />
                    ))
                ) : (
                    <p>No employees found.</p>
                )}
            </div>
        </div>
    );
}

export default EmployeePage;
