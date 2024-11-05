import React from 'react';
import UserLogin from '../components/UserLogin';
import OrgLogin from '../components/OrgLogin';
import ServiceCard from '../components/ServiceCard';
import ParlourCard from '../components/ParlourCard';
import SearchBar from '../components/SearchBar';
import Navbar from '../components/Navbar';

function Home() {
    return (
        <>
       
        <div className="h-screen bg-home bg-cover bg-center flex items-center justify-center">
            <div className="flex gap-8 bg-white bg-opacity-80 p-8 rounded-lg shadow-lg">
                <UserLogin />
                <OrgLogin />
                {/* <ServiceCard/> */}
            </div>
        </div>
        {/* <ServiceCard/>
        <ParlourCard/>
        <SearchBar/> */}
        
        </>
    );
}

export default Home;
