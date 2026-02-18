import React, { useState } from 'react';
import { Form, Button, Spinner, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {loginApi} from '../../services/authService.js'
import { toast } from 'react-toastify';

const LoginPage = ({ setUser }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState('');

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: '',
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            setLoading(true);
            setApiError('');

            // API call
            const response = await loginApi(formData);

            //Success toast
            toast.success('Login Successful!');

            // After successful login
            setUser(response.user);
            localStorage.setItem('token', response.token);
            navigate('/dashboard');

        } catch (error) {
            // Set API errors
            setApiError(error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="auth-form-wrapper">
            <div className="auth-card shadow-lg">
                <div className="text-center mb-4">
                    <h2 className="auth-title">Welcome Back</h2>
                    <p className="text-muted">Sign in to your account</p>
                </div>

                {apiError && <Alert variant="danger">{apiError}</Alert>}

                <Form onSubmit={handleSubmit}>
                    {/* Email */}
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Email Address</Form.Label>
                        <Form.Control
                            type="text"
                            name="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            isInvalid={!!errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Password */}
                    <Form.Group className="mb-4">
                        <Form.Label className="fw-semibold">Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            isInvalid={!!errors.password}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Login Button */}
                    <Button
                        type="submit"
                        className="w-100 login-btn"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Spinner size="sm" className="me-2" />
                                Signing in...
                            </>
                        ) : (
                            'Sign In'
                        )}
                    </Button>

                    {/* Signup Link */}
                    <p className="text-center mt-4 mb-0">
                        Don't have an account?{' '}
                        <Link to="/signup" className="signup-link">
                            Signup
                        </Link>
                    </p>
                </Form>
            </div>
        </div>
    );
};

export default LoginPage;
