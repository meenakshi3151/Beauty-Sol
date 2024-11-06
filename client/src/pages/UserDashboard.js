import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import axios from 'axios';
import ParlourCard from "../components/ParlourCard";

function UserDashboard() {
  const [parlours, setParlours] = useState([]);
  const [filteredParlours, setFilteredParlours] = useState([]);
  const currUser = JSON.parse(localStorage.getItem("userinfoDetails"));

  useEffect(() => {
    if (
      currUser && 
      currUser.State && currUser.City && 
      currUser.Pincode && currUser.Street
    ) {
      axios.post('http://localhost:8081/api/display/displayParlours', {
        userstate: currUser.State,
        usercity: currUser.City,
        userpincode: currUser.Pincode,
        userstreet: currUser.Street
      })
      .then((response) => {
        setParlours(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the parlours!", error);
      });
    }
  }, [currUser?.State, currUser?.City, currUser?.Pincode, currUser?.Street]);

  const displayParlours = filteredParlours.length > 0 ? filteredParlours : parlours;

  return (
    <>
      <Navbar />
      <SearchBar parlours={parlours} setFilteredParlours={setFilteredParlours} />
      <div className="grid grid-cols-3 gap-4">
        {displayParlours.length > 0 ? (
          displayParlours.map((parlour) => (
            <ParlourCard 
              key={parlour.id} 
              name={parlour.name} 
              phone={parlour.phone} 
              email={parlour.email} 
              street={parlour.Street} 
              pincode={parlour.Pincode} 
              state={parlour.State} 
              city={parlour.City} 
              rating={parlour.ratings} 
              category={parlour.category} 
            />
          ))
        ) : (
          <p>No parlours available</p>
        )}
      </div>
    </>
  );
}

export default UserDashboard;
