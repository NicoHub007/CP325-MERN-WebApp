import React from "react";
import "../assets/EmployeePage.css"

function EmployeeCard({ name, email, role, onEdit, onDelete }) {
    return (
        <div className="employee-card">
            <h2>{name}</h2>
            <p>{email}</p>
            <p>{role}</p>
            <button onClick={onEdit}>Edit</button>
            <button onClick={onDelete}>Delete</button>
        </div>
    );
}

export default EmployeeCard;
