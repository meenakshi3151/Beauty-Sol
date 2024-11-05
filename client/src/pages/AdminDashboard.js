import React from "react";
import ApproveBookings from "../components/ApproveBookings";
import NavbarAdmin from "../components/NavbarAdmin";

function AdminDashboard() {
    return (
        <div>
            <NavbarAdmin/>
            <ApproveBookings/>
        </div>
    )
}   
export default AdminDashboard;