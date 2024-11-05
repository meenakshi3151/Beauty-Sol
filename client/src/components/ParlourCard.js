import React from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ParlourCard({ name, phone, email, street, pincode, state, city, rating, category }) {
  const navigate = useNavigate();

  const handleParlourClick = async (e) => {
    e.preventDefault();
    console.log(email);
    try {
      const response = await axios.post('http://localhost:8081/api/services/getServices', {
        email: email
      });
      console.log(response);
      navigate('/service', { state: { services: response.data } });
    } catch (error) {
      console.error("There was an error fetching the services!", error);
    }
  };

  return (
    <div
      className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      onClick={handleParlourClick}
    >
      <div className="px-5 pb-5">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {name}
        </h5>
        <div className="mt-2 text-gray-700 dark:text-gray-300">
          <p><strong>Phone:</strong> {phone}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Category:</strong> {category}</p>
          <p>
            <strong>Address:</strong> {street}, {city}, {state} - {pincode}
          </p>
        </div>
        <div className="flex items-center mt-5 mb-3">
          <span className="text-lg font-medium text-gray-900 dark:text-white">
            Rating: {rating}/5
          </span>
        </div>
      </div>
    </div>
  );
}

export default ParlourCard;
