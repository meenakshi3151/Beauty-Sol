import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function DisplayBookings() {
    const currUser = JSON.parse(localStorage.getItem('userinfoDetails'));
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        axios.post('http://localhost:8081/api/bookings/userBookings', {
            email: currUser.email
        })
            .then((response) => {
                setBookings(response.data[0]);
                console.log(response.data[0]);
            })
            .catch((error) => {
                console.error('There was an error fetching the bookings!', error);
            });
    },);

    const handleCancelBooking = async (bookingId) => {
        try {
            await axios.post('http://localhost:8081/api/bookings/cancelBooking', {
                booking_id: bookingId
            });
            alert("Booking canceled successfully");
            setBookings((prevBookings) => prevBookings.filter(booking => booking.id !== bookingId));
        } catch (error) {
            console.error("There was an error canceling the booking!", error);
            alert("Failed to cancel booking");
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Your Bookings</h2>
            {bookings.length > 0 ? (
                <table className="w-full text-left border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 border-b">Service Type</th>
                            <th className="py-2 px-4 border-b">Booking Status</th>
                            <th className="py-2 px-4 border-b">Total Price</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking.booking_id}>
                                <td className="py-2 px-4 border-b">{booking.service_type}</td>
                                <td className="py-2 px-4 border-b">{booking.status}</td>
                                <td className="py-2 px-4 border-b">${booking.total_price}</td>
                                <td className="py-2 px-4 border-b">
                                    {(booking.status === 'Pending' || booking.status === 'Confirmed') && (
                                        <button
                                            className="text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 rounded-lg px-3 py-1 text-sm"
                                            onClick={() => handleCancelBooking(booking.booking_id)}
                                        >
                                            Cancel Booking
                                        </button>
                                    )}
                                    {booking.status === 'Cancelled' && (
                                        <button
                                            className="text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 rounded-lg px-3 py-1 text-sm"
                                        >
                                            Remove Booking
                                        </button>
                                    )
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No bookings available.</p>
            )}
        </div>
    );
}

export default DisplayBookings;
