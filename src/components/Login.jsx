import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { findUser, setCurrentUser } from '../utils/helpers';
import PasswordInput from './PasswordInput';
import DarkModeToggle from './DarkModeToggle';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [showNotice, setShowNotice] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
        setShowNotice(false);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = validateForm();

        if (Object.keys(newErrors).length === 0) {
            const user = findUser(formData.email, formData.password);

            if (user) {
                setCurrentUser(user);
                navigate('/welcome');
            } else {
                setShowNotice(true);
            }
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 animate-fade-in">
            <DarkModeToggle />

            <div className="w-full max-w-md">
                <div className="text-center mb-8 animate-slide-up">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-400 dark:to-primary-600 bg-clip-text text-transparent mb-3">
                        Welcome Back
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">
                        Sign in to continue to your account
                    </p>
                </div>

                <div className="card animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    {showNotice && (
                        <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 animate-fade-in">
                            <div className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-red-800 dark:text-red-300 mb-1">
                                        Account Not Found
                                    </h3>
                                    <p className="text-sm text-red-700 dark:text-red-400 mb-3">
                                        No account exists with these credentials. Please check your email and password, or create a new account.
                                    </p>
                                    <button
                                        onClick={() => navigate('/signup')}
                                        className="text-sm font-semibold text-red-700 dark:text-red-300 hover:text-red-900 dark:hover:text-red-100 
                             underline underline-offset-2 transition-colors"
                                    >
                                        Create an account →
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                className={`input-field ${errors.email ? 'input-error' : ''}`}
                            />
                            {errors.email && (
                                <p className="error-message flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <PasswordInput
                            label="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            error={errors.password}
                            placeholder="Enter your password"
                        />

                        <button type="submit" className="btn-primary">
                            Sign In
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-slate-600 dark:text-slate-400">
                            Don't have an account?{' '}
                            <button
                                onClick={() => navigate('/signup')}
                                className="link-text"
                            >
                                Sign up here
                            </button>
                        </p>
                    </div>
                </div>

                <div className="mt-6 text-center text-sm text-slate-500 dark:text-slate-500">
                    <p>© 2026 Muddasir Hayat. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
