import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="not-found">
            <div className="not-found-content">
                <h1 className="error-code">404</h1>
                <h2 className="error-message">Page Not Found</h2>
                <p className="error-description">
                    The page you re looking for might have been removed, 
                    had its name changed, or is temporarily unavailable.
                </p>
                <Link to="/" className="home-button">
                    Back to Home
                </Link>
            </div>
        </div>
    );
}