import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export default function PageNotFound() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/');
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div>
            <h1>404 - Page Not Found</h1>
            <p>Redirecting to the homepage in 3 seconds...</p>
        </div>
    )
}