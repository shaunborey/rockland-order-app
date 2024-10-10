import React, { useState } from 'react';
import AuthService from '../services/auth.service';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert, FloatingLabel } from 'react-bootstrap';
import './login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [formValidated, setFormValidated] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const authService = AuthService();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await authService.login(username, password);
            navigate('/catalog');
        } catch (error) {
            setError('Invalid username or password');
        }
    };

    const validateForm = (changedItem, newValue) => {
        var isValid = true;
        var uname = username;
        var pword = password;

        switch (changedItem) {
            case "username":
                uname = newValue;
                break;

            case "password":
                pword = newValue;
                break;
        }

        // Verify required login fields have values
        const validateString = (string) => {
            return string !== null && string.trim() !== "";
        };

        if (!validateString(uname) || !validateString(pword)) {
            isValid = false;
        }

        setFormValidated(isValid);
    };

    const handleUNChange = (value) => {
        setUsername(value);
        validateForm("username", value);
    };

    const handlePWChange = (value) => {
        setPassword(value);
        validateForm("password", value);
    };

    return (
        <Container className="login-container">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <h3 className="card-title">Login</h3>
                            <Form onSubmit={handleLogin}>
                                <Row className="full-width-rows">
                                    <Col>
                                        <FloatingLabel className="mb-3" controlId="username" label="Username">
                                            <Form.Control type="text" placeholder="Username" value={username} onChange={(e) => handleUNChange(e.target.value)} required />
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                                <Row className="full-width-rows">
                                    <Col>
                                        <FloatingLabel className="mb-3" controlId="password" label="Password">
                                            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => handlePWChange(e.target.value)} required />
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                                <Row className="full-width-rows">
                                    <div className="d-grid gap-2">
                                        <Button variant="primary" type="submit" disabled={!formValidated}>Login</Button>
                                    </div>
                                    {error && <Alert variant="danger">{error}</Alert>}
                                    <p>
                                        New user? <Link to="/register">Click here to register</Link>
                                    </p>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;