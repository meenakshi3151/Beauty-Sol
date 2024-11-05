import React from "react";
import axios from "axios";
function ServiceCard({ id,service_name,showOnAdmin, in_home, on_spot, price_inhome, price, description}) {
  const currUser = JSON.parse(localStorage.getItem("userinfoDetails"));
  const handleInHomeBookingClick = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8081/api/bookings/bookingUser', {
        service_id: id,
        user_email:currUser.email,
        service_type: "In_home",
        total_price: price_inhome
      });
      alert("Booking successful");
      console.log(response);      
    } catch (error) {
      console.error("There was an error fetching the services!", error);
      alert("Booking failed");
    }
  }

  const handleOnSpotBookingClick = async (e) => {
    e.preventDefault();
    console.log(service_name);
    
    try {
      const response = await axios.post('http://localhost:8081/api/bookings/bookingUser', {
        service_name: service_name,
        email:currUser.email,
        service_type: "On_spot",
        total_price: price
      });
      alert("Booking successful");
      console.log(response);      
    } catch (error) {
      console.error("There was an error fetching the services!", error);
      alert("Booking failed");
    }
  }
  
  return (
    <>
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="px-5 py-4">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {service_name}
          </h5>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{description}</p>
          <div className="flex items-center mt-4 mb-5 space-x-4">
            {in_home && (
              <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                In-home service available
              </span>
            )}
            {on_spot && (
              <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                On-spot service available
              </span>
            )}
          </div>
          <div className="flex flex-col space-y-4">
            {in_home && (
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  In-home: ${price_inhome}
                </span>
                {!showOnAdmin && (
                <button className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800" 
                onClick={handleInHomeBookingClick}>
                  Book In-home
                </button>
                )}
              </div>
            )}
            {on_spot && (
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  On-spot: ${price}
                </span>
                {!showOnAdmin && (
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleOnSpotBookingClick}>
                  Book On-spot
                </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ServiceCard;
