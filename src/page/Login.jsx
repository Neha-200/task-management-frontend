import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: ""
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
            const response = await fetch(`http://localhost:5007/api/auth/login`, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(user),
            });

            console.log("login", response);

            const res_data = await response.json();

            if (response.ok) {
                toast.success("Login successful");
                storeTokenInLS(res_data.token);
                setUser({ email: "", password: "" });
                navigate("/task");
            } else {
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
                console.log();
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <main className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg">
                <div className="container mx-auto">
                    <h1 className="text-2xl font-bold text-center mb-6">Login Form</h1>
                    <form onSubmit={handleSubmit}>
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
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-14 md:ml-44 rounded focus:outline-none focus:shadow-outline">
                                Login Now
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </section>
    );
}
