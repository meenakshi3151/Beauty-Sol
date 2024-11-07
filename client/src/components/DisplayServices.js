import React from "react";
import ServiceCard from "./ServiceCard";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { useState } from "react";
import SearchBarService from "./SearchBarService";
function DisplayServices() {

  const location = useLocation();
  const [filteredServices, setFilteredServices] = useState([]);
  const { services } = location.state || {};
  const displayServices = filteredServices.length > 0 ? filteredServices : services;
  return (
    <>
      <Navbar />
      <SearchBarService services={services} setFilteredServices={setFilteredServices} />
      <div className="grid grid-cols-3 gap-4">

        {displayServices ? (
          displayServices.map((service) => (
            <ServiceCard
              key={service.service_id}
              id={service.service_id}
              showOnAdmin={false}
              service_name={service.service_name}
              in_home={service.in_home}
              on_spot={service.on_spot}
              price_inhome={service.price_inhome}
              price={service.price}
              description={service.description}
            />
          ))
        ) : (
          <p>No services available.</p>
        )}
      </div>
    </>
  )
}

export default DisplayServices;