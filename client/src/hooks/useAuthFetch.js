import { useUserStore } from '../store/userStore'

export const useAuthFetch = () => {
    const { setUser, clearUser, setAuthenticated } = useUserStore();

    const fetchUser = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/me`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();

            if (!data.user) {
                localStorage.removeItem('token');
                clearUser();
                return;
            }

            setUser(data.user);
            setAuthenticated(true);
        }
        catch {
            localStorage.removeItem('token');
            clearUser();
        }
    };

    return { fetchUser };
};