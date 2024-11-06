import React, { useEffect, useState } from "react";
import axios from 'axios';

function ApproveBookings() {
    const orgUser = JSON.parse(localStorage.getItem('orginfodetails'));
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        axios.post('http://localhost:8081/api/bookings/allbookings', {
            email: orgUser.email
        })
        .then((response) => {
            setBookings(response.data[0]);
        })
        .catch((error) => {
            console.error('There was an error fetching the bookings!', error);
        });
    }, );
    const handleCompletedBooking = (booking_id) => {
        axios.post('http://localhost:8081/api/bookings/bookingBeauty', {
            booking_id: booking_id,
            status:"Confirmed"
        })
        .then((response) => {
            console.log(response);
            alert('Booking completed successfully!');
        })
        .catch((error) => {
            console.error('There was an error cancelling the booking!', error);
        });
    }

    const handleApproveBooking = (booking_id) => {
        axios.post('http://localhost:8081/api/bookings/bookingBeauty', {
            booking_id: booking_id,
            status:"Confirmed"
        })
        .then((response) => {
            console.log(response);
            alert('Booking approved successfully!');
        })
        .catch((error) => {
            console.error('There was an error approving the booking!', error);
        });
    }

    const handleCancelBookingByParlour = (booking_id) => {
        axios.post('http://localhost:8081/api/bookings/bookingBeauty', {
            booking_id: booking_id,
            status:"Cancelled"
        })
        .then((response) => {
            console.log(response);
            alert('Booking cancelled successfully!');
        })
        .catch((error) => {
            console.error('There was an error cancelling the booking!', error);
        });
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Your Bookings</h2>
            {bookings.length > 0 ? (
                <table className="w-full text-left border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 border-b">Service Type</th>
                            <th className="py-2 px-4 border-b">User Email</th>
                            <th className="py-2 px-4 border-b">Status</th>
                            <th className="py-2 px-4 border-b">Total Price</th>


                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking.booking_id}>
                              
                                <td className="py-2 px-4 border-b">{booking.service_type}</td>
                                
                                <td className="py-2 px-4 border-b">{booking.user_email}</td>
                                <td className="py-2 px-4 border-b">{booking.status}</td>
                                 
                                <td className="py-2 px-4 border-b">${booking.total_price}</td>
                                <td className="py-2 px-4 border-b">
                                    
                                  {booking.status === 'Pending' && (
                                    <button 
                                        className="text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 rounded-lg px-3 py-1 text-sm"
                                        onClick={() => handleCancelBookingByParlour(booking.booking_id)}
                                    >
                                        Cancel Booking
                                    </button>
                                  )}
                                   {booking.status === 'Pending' && (
                                    <button 
                                        className="text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 rounded-lg px-3 py-1 text-sm"
                                        onClick={() => handleApproveBooking(booking.booking_id)}
                                        >Approove Booking</button>)}
                                      {
                                        booking.status==='Confirmed' && (
                                            <button 
                                            className="text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 rounded-lg px-3 py-1 text-sm"
                                            onClick={() => handleCompletedBooking(booking.booking_id)}
                                            >Completed Booking</button>
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

export default ApproveBookings;
