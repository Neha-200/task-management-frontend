import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const Register = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
    });

    const navigate = useNavigate();

    const { storeTokenInLS } = useAuth();

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user);
        try {
            const response = await fetch(`http://localhost:5007/api/auth/register`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            });

            const res_data = await response.json();
            console.log("res from server", res_data.extraDetails);

            if (response.ok) {
                storeTokenInLS(res_data.token);
                setUser({ username: "", email: "", phone: "", password: "" });
                toast.success('Registration successful');
                navigate("/");
            } else {
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }
        } catch (error) {
            console.log("register", error);
        }
    };

    return (
        <section className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <main className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg">
                <div className="container mx-auto">
                    <h1 className="text-2xl font-bold text-center mb-6">Registration Form</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                                Username:
                            </label>
                            <input type="text"
                                name="username"
                                placeholder="Enter username"
                                required
                                id="username"
                                autoComplete="off"
                                value={user.username}
                                onChange={handleInput}
                                className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                                Email:
                            </label>
                            <input type="email"
                                name="email"
                                placeholder="Enter email"
                                required
                                id="email"
                                autoComplete="off"
                                value={user.email}
                                onChange={handleInput}
                                className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
                                Phone No:
                            </label>
                            <input type="number"
                                name="phone"
                                placeholder="Enter phone no"
                                required
                                id="phone"
                                autoComplete="off"
                                value={user.phone}
                                onChange={handleInput}
                                className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                                Password:
                            </label>
                            <input type="password"
                                name="password"
                                placeholder="Enter password"
                                required
                                id="password"
                                autoComplete="off"
                                value={user.password}
                                onChange={handleInput}
                                className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div className="flex items-center justify-between">
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-12 md:ml-44 rounded focus:outline-none focus:shadow-outline">
                                Register Now
                            </button> 
                        </div>
                        <div className="flex items-center justify-between">
                           <p className="pl-4 text-center mt-3 md:pl-20 md:ml-16">If you have registered.. <Link to="/login" className="text-blue-500">Login</Link></p>
                        </div>
                    </form>
                </div>
            </main>
        </section>
    );
}
