import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveUserData, setCurrentUser, userExists, validateEmail, validatePassword, calculatePasswordStrength } from '../utils/helpers';
import PasswordInput from './PasswordInput';
import DarkModeToggle from './DarkModeToggle';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [passwordStrength, setPasswordStrength] = useState({ strength: 0, label: '', color: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }

        if (name === 'password') {
            setPasswordStrength(calculatePasswordStrength(value));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Full Name validation
        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        } else if (formData.fullName.trim().length < 2) {
            newErrors.fullName = 'Name must be at least 2 characters long';
        }

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        } else if (userExists(formData.email)) {
            newErrors.email = 'An account with this email already exists';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else {
            const passwordValidation = validatePassword(formData.password);
            if (!passwordValidation.isValid) {
                const missing = [];
                if (!passwordValidation.minLength) missing.push('8 characters');
                if (!passwordValidation.hasUpperCase) missing.push('uppercase letter');
                if (!passwordValidation.hasLowerCase) missing.push('lowercase letter');
                if (!passwordValidation.hasNumber) missing.push('number');
                if (!passwordValidation.hasSpecialChar) missing.push('special character');

                newErrors.password = `Password must contain: ${missing.join(', ')}`;
            }
        }

        // Confirm Password validation
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = validateForm();

        if (Object.keys(newErrors).length === 0) {
            const userData = {
                fullName: formData.fullName.trim(),
                email: formData.email.trim(),
                password: formData.password,
                createdAt: new Date().toISOString()
            };

            saveUserData(userData);
            setCurrentUser(userData);
            navigate('/welcome');
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 animate-fade-in py-12">
            <DarkModeToggle />

            <div className="w-full max-w-md">
                <div className="text-center mb-8 animate-slide-up">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-400 dark:to-primary-600 bg-clip-text text-transparent mb-3">
                        Create Account
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">
                        Join us today and get started
                    </p>
                </div>

                <div className="card animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="Muddasir Hayat"
                                className={`input-field ${errors.fullName ? 'input-error' : ''}`}
                            />
                            {errors.fullName && (
                                <p className="error-message flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.fullName}
                                </p>
                            )}
                        </div>

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
                            placeholder="Create a strong password"
                            showStrength={true}
                            passwordStrength={passwordStrength}
                        />

                        <PasswordInput
                            label="Confirm Password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            error={errors.confirmPassword}
                            placeholder="Re-enter your password"
                        />

                        <button type="submit" className="btn-primary">
                            Create Account
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-slate-600 dark:text-slate-400">
                            Already have an account?{' '}
                            <button
                                onClick={() => navigate('/login')}
                                className="link-text"
                            >
                                Sign in here
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

export default Signup;
