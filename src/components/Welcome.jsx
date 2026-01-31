import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutUser } from '../utils/helpers';
import DarkModeToggle from './DarkModeToggle';

const Welcome = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const currentUser = getCurrentUser();
        if (!currentUser) {
            navigate('/login');
        } else {
            setUser(currentUser);
        }
    }, [navigate]);

    const handleLogout = () => {
        logoutUser();
        navigate('/login');
    };

    if (!user) return null;

    const firstName = user.fullName.split(' ')[0];
    const greetingTime = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 animate-fade-in">
            <DarkModeToggle />

            <button
                onClick={handleLogout}
                className="fixed top-6 right-20 px-6 py-2.5 rounded-full font-semibold
                   bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300
                   border-2 border-slate-200 dark:border-slate-700
                   hover:border-red-300 dark:hover:border-red-700
                   hover:text-red-600 dark:hover:text-red-400
                   shadow-lg hover:shadow-xl transition-all duration-300 
                   hover:scale-105 active:scale-95 z-50 flex items-center gap-2"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
            </button>

            <div className="w-full max-w-2xl">
                <div className="text-center mb-12 animate-slide-up">
                    <div className="mb-6 inline-block">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 
                          flex items-center justify-center text-white text-4xl font-bold shadow-2xl
                          animate-bounce-subtle">
                            {firstName.charAt(0).toUpperCase()}
                        </div>
                    </div>

                    <h1 className="text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                        {greetingTime()}, {firstName}!
                    </h1>

                    <p className="text-xl text-slate-600 dark:text-slate-400 mb-2">
                        Welcome to your dashboard
                    </p>

                    <p className="text-sm text-slate-500 dark:text-slate-500">
                        Logged in as <span className="font-semibold">{user.email}</span>
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    <div className="card group hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer">
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white
                            group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg text-slate-900 dark:text-slate-100 mb-1">Profile</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Manage your account settings</p>
                            </div>
                        </div>
                    </div>

                    <div className="card group hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer">
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-green-600 text-white
                            group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg text-slate-900 dark:text-slate-100 mb-1">Tasks</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">View and manage your tasks</p>
                            </div>
                        </div>
                    </div>

                    <div className="card group hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer">
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white
                            group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg text-slate-900 dark:text-slate-100 mb-1">Schedule</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Check your calendar</p>
                            </div>
                        </div>
                    </div>

                    <div className="card group hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer">
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white
                            group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg text-slate-900 dark:text-slate-100 mb-1">Settings</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Customize your experience</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 card animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 text-white">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Account Information</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                Account created on {new Date(user.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 text-center text-sm text-slate-500 dark:text-slate-500">
                    <p>© 2026 Muddasir Hayat. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
