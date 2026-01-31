import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { initializeTheme, getCurrentUser } from './utils/helpers';
import Login from './components/Login';
import Signup from './components/Signup';
import Welcome from './components/Welcome';

function App() {
    useEffect(() => {
        initializeTheme();
    }, []);

    const ProtectedRoute = ({ children }) => {
        const user = getCurrentUser();
        return user ? children : <Navigate to="/login" />;
    };

    const PublicRoute = ({ children }) => {
        const user = getCurrentUser();
        return !user ? children : <Navigate to="/welcome" />;
    };

    return (
        <Router>
            <Routes>
                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <PublicRoute>
                            <Signup />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/welcome"
                    element={
                        <ProtectedRoute>
                            <Welcome />
                        </ProtectedRoute>
                    }
                />
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;
