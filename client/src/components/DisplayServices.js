import React from "react";
import ServiceCard from "./ServiceCard"; 
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";

function DisplayServices() {
  
    const location = useLocation();
    const { services } = location.state || {};
return (
    <>
    <Navbar/>
    <div className="grid grid-cols-3 gap-4">
    {services ? (
        services.map((service) => (
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