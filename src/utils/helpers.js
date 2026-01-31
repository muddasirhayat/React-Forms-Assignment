// Theme Management
export const getTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const setTheme = (theme) => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
};

export const initializeTheme = () => {
    const theme = getTheme();
    setTheme(theme);
    return theme;
};

// User Authentication
export const saveUserData = (userData) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
};

export const findUser = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.find(user => user.email === email && user.password === password);
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
};

export const setCurrentUser = (user) => {
    localStorage.setItem('currentUser', JSON.stringify(user));
};

export const logoutUser = () => {
    localStorage.removeItem('currentUser');
};

export const userExists = (email) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.some(user => user.email === email);
};

// Validation Functions
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
        minLength,
        hasUpperCase,
        hasLowerCase,
        hasNumber,
        hasSpecialChar,
        isValid: minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar
    };
};

export const calculatePasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: '' };

    const validation = validatePassword(password);
    let strength = 0;

    if (validation.minLength) strength += 20;
    if (validation.hasUpperCase) strength += 20;
    if (validation.hasLowerCase) strength += 20;
    if (validation.hasNumber) strength += 20;
    if (validation.hasSpecialChar) strength += 20;

    let label = '';
    let color = '';

    if (strength <= 20) {
        label = 'Very Weak';
        color = 'bg-red-500';
    } else if (strength <= 40) {
        label = 'Weak';
        color = 'bg-orange-500';
    } else if (strength <= 60) {
        label = 'Fair';
        color = 'bg-yellow-500';
    } else if (strength <= 80) {
        label = 'Good';
        color = 'bg-blue-500';
    } else {
        label = 'Strong';
        color = 'bg-green-500';
    }

    return { strength, label, color };
};
