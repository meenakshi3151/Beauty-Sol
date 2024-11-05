import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "./AuthContext";
function OrgLogin(){
	const [email,setEmail]=useState("");
	const navigate=useNavigate();
	const { login } = useAuth();
		const [password,setPassword]=useState("");
    const handleOrgLoginClick = async(e) => {
		e.preventDefault();
		if (email === "" || password === "") {
			alert("Please fill all the fields");
			return;
		}
		try {
			const response = await axios.post("http://localhost:8081/api/users/beautyLogin", {
				email,
				password
			});
			console.log(response.data)
			alert("Logged in successfully");
			if (response && response.data) {
				console.log(response.data[0])
				login(); 
				localStorage.setItem("orginfodetails", JSON.stringify(response.data[0]));
				navigate('/dashboarda');
			}
		}
		catch (error) {
			alert(error.response.data);
		}
	}
    return (
        <>
        <div class="max-w-2xl mx-auto">
	<div
		class="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
		<form class="space-y-6" action="#">
			<h3 class="text-xl font-medium text-gray-900 dark:text-white">Organisation sign in</h3>
			<div>
				<label for="email" class="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Your email</label>
				<input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" onChange={(e)=>setEmail(e.target.value)}  required=""/>
            </div>
				<div>
					<label for="password" class="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Your password</label>
					<input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" onChange={(e)=>setPassword(e.target.value)} required=""/>
                </div>
					
						<button type="submit"   onClick={handleOrgLoginClick} class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
						<div class="text-sm font-medium text-gray-500 dark:text-gray-300">
							Not registered? <a href="/orgsignup" class="text-blue-700 hover:underline dark:text-blue-500">Create
								account</a>
						</div>
		</form>
	</div>


</div>
        </>
    )
}
export default OrgLogin;