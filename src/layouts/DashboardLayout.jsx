import React from 'react';
import Navbar from '../components/Navbar.jsx';

const DashboardLayout = ({ children, userName, onLogout }) => {
    return (
        <div>
            <Navbar userName={userName} onLogout={onLogout} />
            <div className="container py-4">{children}</div>
        </div>
    );
};

export default DashboardLayout;
