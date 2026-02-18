import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { CgToolbarTop } from "react-icons/cg";
import { FaBarsProgress } from "react-icons/fa6";
import { BsLightningCharge } from "react-icons/bs";

const AuthLayout = () => {
    const features = [
        { Icon: CgToolbarTop, title: 'Smart Task Management', desc: 'Organize tasks by priority and status' },
        { Icon: FaBarsProgress, title: 'Progress Tracking', desc: 'Monitor your productivity in real-time' },
        { Icon: BsLightningCharge, title: 'Lightning Fast', desc: 'Minimal, intuitive interface' },
    ];

    return (
        <Container fluid className="min-vh-100 container-theme px-3 px-md-5">
            <Row>
                {/* Left side */}
                <Col
                    md={6}
                    className="text-white d-flex align-items-center justify-content-center mb-4 mb-md-0 features-column"
                >
                    <div className="text-center">
                        <h1>Task Manager</h1>
                        <p>Manage your tasks efficiently and stay organized.</p>
                        <div className="featuresList">
                            {features.map((feature, i) => (
                                <div key={i} className="featureItem">
                                    <span className="featureIcon">
                                        <feature.Icon style={{ width: '24px', height: '24px' }} />
                                    </span>
                                    <div>
                                        <h4 className="featureTitle">{feature.title}</h4>
                                        <p className="featureDesc">{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Col>

                {/* Right side */}
                <Col
                    md={6}
                    className="auth-column d-flex flex-column justify-content-start align-items-center"
                >
                    <Outlet />
                </Col>
            </Row>
        </Container>


    );
};

export default AuthLayout;
