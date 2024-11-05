import React, { useState } from "react";
import axios from "axios";
import NavbarAdmin from "./NavbarAdmin";

function AddService() {
   const orgUser = JSON.parse(localStorage.getItem("orginfodetails"));
   const [service_name, setServiceName] = useState('');
   const [service_description, setServiceDescription] = useState('');
   const [price, setPrice] = useState(0);
   const email = orgUser.email;
   const [in_home, setInHome] = useState(false);
   const [on_spot, setOnSpot] = useState(false);
   const [price_inhome, setPriceInHome] = useState(0);

   const handleAddService = (e) => {
      e.preventDefault();
      axios.post('http://localhost:8081/api/services/service', {
         service_name: service_name,
         service_description: service_description,
         price: price,
         email: email,
         in_home: in_home,
         on_spot: on_spot,
         price_inhome: price_inhome
      })
         .then((response) => {
            console.log(response);
            alert('Service added successfully!');
         })
         .catch((error) => {
            console.error('There was an error adding the service!', error);
         });
   };

   return (
      <>
         <NavbarAdmin />
         <div className="flex items-center justify-center h-screen">
            <div className="w-full max-w-md">
               <form className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4">
                  <div className="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4">
                     Add Service
                  </div>
                  <div className="mb-4">
                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="service_name">
                        Service Name
                     </label>
                     <input onChange={(e) => setServiceName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="service_name" type="text" placeholder="Service Name" />
                  </div>
                  <div className="mb-4">
                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="service_description">
                        Description
                     </label>
                     <input onChange={(e) => setServiceDescription(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="service_description" type="text" placeholder="Description" />
                  </div>
                  <div className="mb-4">
                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="on_spot">
                        Onspot Service
                     </label>
                     <input type="checkbox" checked={on_spot} onChange={(e) => setOnSpot(e.target.checked)} className="mr-2 leading-tight" id="on_spot" />
                     <span className="text-gray-700">Available</span>
                  </div>
                  <div className="mb-4">
                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="in_home">
                        Inhome Service
                     </label>
                     <input type="checkbox" checked={in_home} onChange={(e) => setInHome(e.target.checked)} className="mr-2 leading-tight" id="in_home" />
                     <span className="text-gray-700">Available</span>
                  </div>
                  {on_spot && (
                     <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                           Price On Spot
                        </label>
                        <input onChange={(e) => setPrice(Number(e.target.value))} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="price" type="number" placeholder="Price" />
                     </div>
                  )}
                  {in_home && (
                     <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price_inhome">
                           Price Inhome
                        </label>
                        <input onChange={(e) => setPriceInHome(Number(e.target.value))} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="price_inhome" type="number" placeholder="Price Inhome" />
                     </div>
                  )}
                  <div className="flex items-center justify-between">
                     <button className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleAddService}>
                        Add Service
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </>
   );
}

export default AddService;
