import React, { useState } from 'react';
import { Form, Button, Spinner, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { signupApi } from '../../services/authService.js';
import { toast } from 'react-toastify';

const SignupPage = ({setUser}) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // Validate form
    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'User Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        return newErrors;
    };


    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Remove error for the field
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);

        try {
            const response = await signupApi(formData);

            // Success toast
            toast.success('Account created successfully!');

            // Set user & token
            setUser(response.data.user);
            localStorage.setItem('user', JSON.stringify(response.data?.user));
            localStorage.setItem('token', response.data?.token);

            // Redirect to dashboard
            navigate('/login');
        } catch (error) {
            // Show error toast
            toast.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-form-wrapper">
            <div className="auth-card shadow-lg">
                <div className="text-center mb-4">
                    <h2 className="auth-title">Create Account</h2>
                    <p className="text-muted">Sign up to start managing your tasks</p>
                </div>

                <Form onSubmit={handleSubmit}>
                    {/* User Name */}
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">User Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                            isInvalid={!!errors.name}

                        />
                        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                    </Form.Group>

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
                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
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
                        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                    </Form.Group>

                    {/* Signup Button */}
                    <Button type="submit" className="w-100 login-btn" disabled={loading}>
                        {loading ? (
                            <>
                                <Spinner size="sm" className="me-2" /> Signing up...
                            </>
                        ) : (
                            'Sign Up'
                        )}
                    </Button>

                    {/* Login Link */}
                    <p className="text-center mt-4 mb-0">
                        Already have an account?{' '}
                        <Link to="/login" className="signup-link">
                            Login
                        </Link>
                    </p>
                </Form>
            </div>
        </div>
    );
};

export default SignupPage;
