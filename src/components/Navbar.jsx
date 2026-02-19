import React, { useState } from 'react';
import { FaHouseUser } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa6";
import { SiTask } from "react-icons/si";

const Navbar = ({ userName, onLogout }) => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <nav className="navbar navbar-expand-lg navbar-theme shadow-sm sticky-top">
            <div className="container-fluid">

                {/* Brand */}
                <div className="navbar-brand d-flex align-items-center gap-2  d-none d-md-flex">
                    <div className="logo-theme">
                        <SiTask size={32}/>
                    </div>
                    <span className="fw-bold text-theme-green">TaskManager</span>
                </div>

                {/* User Section */}
                <div className="d-flex align-items-center gap-3 position-relative  ms-auto">

                    <div className="text-end">
                        <div className="fw-semibold text-theme-green">
                            {userName}
                        </div>
                        <div className="text-muted small">
                            WELCOME
                        </div>
                    </div>

                    <div
                        className="avatar-theme"
                        onClick={() => setShowMenu(!showMenu)}
                    >
                        <FaHouseUser />
                    </div>

                    {showMenu && (
                        <div
                            className="dropdown-menu show shadow position-absolute"
                            style={{ right: 0, top: '60px' }}
                        >
                            <button className="dropdown-item">
                                <FaRegUser /> Profile
                            </button>
                            <button className="dropdown-item">
                                <IoSettingsOutline /> Settings
                            </button>
                            <button
                                className="dropdown-item text-danger fw-semibold"
                                onClick={onLogout}
                            >
                                <FiLogOut /> Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
