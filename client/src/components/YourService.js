import React, { useEffect } from "react";
import axios from 'axios';
import ServiceCard from "./ServiceCard";
import { useState } from "react";

function YourService() {
    const orgUser = JSON.parse(localStorage.getItem("orginfodetails"));
    const [services, setServices] = useState([]);

    useEffect(() => {
        axios.post('http://localhost:8081/api/services/getServices', {
            email: orgUser.email
        })
            .then((response) => {
                setServices(response.data);
            })
            .catch((error) => {
                console.error('There was an error fetching the bookings!', error);
            });
    },);

    return (
        <div>
            <h1>Your Service</h1>
            {services ? (
                services.map((service) => (
                    <ServiceCard
                        
                        key={service.service_id}
                        showOnAdmin={true}
                        id={service.service_id}
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
    )
}
export default YourService;