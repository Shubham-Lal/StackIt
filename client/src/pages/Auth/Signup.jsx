import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export default function Signup() {
    const navigate = useNavigate();

    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [isLoading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatar(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, password, confirmPassword } = formData;

        if (!name) return toast.error('Name is required');
        else if (!email) return toast.error('Email is required');
        else if (!password) return toast.error('Password is required');
        else if (!confirmPassword) return toast.error('Confirm Password is required');

        if (password !== confirmPassword) {
            return toast.error('Passwords do not match');
        }

        try {
            const data = new FormData();
            data.append('name', name);
            data.append('email', email);
            data.append('password', password);
            if (avatar) {
                data.append('avatar', avatar);
            }

            setLoading(true);
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/signup`, {
                method: 'POST',
                body: data,
            });

            const result = await res.json();

            if (!res.ok) toast.error(result.message);
            else {
                toast.success('Signup successful!');
                navigate('/login');
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
        <div className='max-w-md mx-auto p-6 bg-white rounded-xl shadow-md mt-10'>
            <h2 className='text-2xl font-semibold mb-6 text-center'>Create an Account</h2>
            <form onSubmit={handleSubmit} encType='multipart/form-data' className='space-y-4'>
                <div>
                    <label className='block mb-1 font-medium'>Avatar</label>
                    <input
                        type='file'
                        accept='image/*'
                        onChange={handleAvatarChange}
                        className='block w-full text-sm text-gray-500
                                   file:mr-4 file:py-2 file:px-4
                                   file:rounded-full file:border-0
                                   file:text-sm file:font-semibold
                                   file:bg-blue-50 file:text-blue-700
                                   hover:file:bg-blue-100 cursor-pointer'
                    />
                    {avatarPreview && (
                        <img
                            src={avatarPreview}
                            alt='Avatar Preview'
                            className='w-24 h-24 rounded-full mt-3 object-cover border'
                        />
                    )}
                </div>

                <div>
                    <label className='block mb-1 font-medium'>Name</label>
                    <input
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>

                <div>
                    <label className='block mb-1 font-medium'>Email</label>
                    <input
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>

                <div>
                    <label className='block mb-1 font-medium'>Password</label>
                    <input
                        type='password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>

                <div>
                    <label className='block mb-1 font-medium'>Confirm Password</label>
                    <input
                        type='password'
                        name='confirmPassword'
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>

                <button
                    disabled={isLoading}
                    type='submit'
                    className={`w-full py-2 px-4 text-white rounded-md transition duration-200 ${isLoading ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'}`}
                >
                    {isLoading ? 'Signing up...' : 'Sign Up'}
                </button>
            </form>
        </div>
    )
}