import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from '../views/landingPages/AuthLayout.jsx';
import LoginPage from '../views/landingPages/LoginPage.jsx';
import SignupPage from '../views/landingPages/SignupPage.jsx';
import Dashboard from '../views/DashboardPage.jsx';
import ProtectedRoute from '../components/ProtectedRoute.jsx';

const AppRoutes = ({ user, setUser }) => {
    return (
        <Routes>
            {/* Auth Layout Wrapper */}
            <Route element={<AuthLayout />}>
                <Route
                    path="/login"
                    element={
                        user ? <Navigate to="/dashboard" replace /> : <LoginPage setUser={setUser} />
                    }
                />
                <Route
                    path="/signup"
                    element={
                        user ? <Navigate to="/dashboard" replace /> : <SignupPage setUser={setUser} />
                    }
                />
            </Route>

            {/* Root Redirect */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Protected Route */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute user={user}>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
};


export default AppRoutes;
