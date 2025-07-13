import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useAuthFetch } from '../../hooks/useAuthFetch'

export default function Login() {
    const navigate = useNavigate();

    const { fetchUser } = useAuthFetch();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [isLoading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = formData;

        if (!email) return toast.error('Email is required');
        if (!password) return toast.error('Password is required');

        try {
            setLoading(true);

            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const result = await res.json();

            if (!res.ok) {
                toast.error(result.message || 'Login failed');
            }
            else {
                localStorage.setItem('token', result.token);
                toast.success('Login successful!');
                await fetchUser();
                navigate('/');
            }
        }
        catch {
            toast.error('An error occurred');
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
            <h2 className="text-2xl font-semibold mb-6 text-center">Login to Your Account</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-2 px-4 text-white rounded-md transition duration-200 ${isLoading
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                        }`}
                >
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    )
}