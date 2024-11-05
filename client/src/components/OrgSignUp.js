import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/toast";
function OrgSignUp() {
    const toast = useToast();
    const navigate = useNavigate();
    // State for form fields
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        phone: "",
        password: "",
        category: "",
        confirmPassword: "",
        age: "",
        gender: "",
        street: "",
        pincode: "",
        city: "",
        state: ""
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleOrgSignUp = async (e) => {
        e.preventDefault();

        const { email, name, phone, password, confirmPassword, category, age, gender, street, pincode, city, state } = formData;
        console.log(formData)
        if (email === "" || name === "" || phone === "" || password === "" || confirmPassword === "" || age === "" || gender === "" || street === "" || pincode === "" || city === "" || state === "" || category === "") {
            alert("Please fill all the fieldsggg");
            toast({
                title: "Please fill all the fields",
                status: "error",
                duration: 5000,
                isClosable: true
            });
            return;
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match")
            toast({
                title: "Passwords do not match",
                status: "error",
                duration: 5000,
                isClosable: true
            });
            return;
        }
        try {
            const response = await axios.post("http://localhost:8081/api/users//beautyRegister", {
                email,
                name,
                phone,
                password,
                category,
                age,
                gender,
                street,
                pincode,
                city,
                state
            });
            alert(response.data);
            toast({
                title: response.data,
                description: "Please login to continue",
                status: "success",
                duration: 5000,
                isClosable: true
            });
            navigate('/');
        }
        catch (error) {
            alert(error.response.data);
            toast({
                title: error.response.data,
                description: "Please try again",
                status: "error",
                duration: 5000,
                isClosable: true
            });
        }
    }

    return (
        <>
            <div className="h-700 bg-home bg-cover bg-center flex items-center justify-center">
                <div className="relative flex flex-col items-center justify-center px-6 py-6 mx-auto md:h-auto lg:py-6">
                    <div className="relative w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create an account
                            </h1>

                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="Phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                    required
                                />
                            </div>
                            <div>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                    required
                                >
                                    <option value="">Select Category</option>
                                    <option value="Home Setup">Home Setup</option>
                                    <option value="Salon">Salon</option>
                                    <option value="Franchise"> Franchise</option>
                                </select>
                            </div>
                            <div>
                                <input
                                    type="number"
                                    name="age"
                                    placeholder="Age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                    required
                                />
                            </div>
                            <div>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                    required
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="street"
                                    placeholder="Street"
                                    value={formData.street}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="pincode"
                                    placeholder="Pincode"
                                    value={formData.pincode}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="state"
                                    placeholder="State"
                                    value={formData.state}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                    required
                                />
                            </div>
                            <button type="submit" onClick={handleOrgSignUp} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create an account</button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OrgSignUp;
