import React from 'react';
import { Form, Card, FloatingLabel } from 'react-bootstrap';

function LoginInformation({ loginInfo, isLoading, setFormValidated, setLoginInfo }) {

    const validateForm = (newValue) => {
        var isValid = true;        

        // Verify required login information fields have values
        const validateString = (string) => {
            return string !== null && string.trim() !== "";
        };

        if (!validateString(newValue.username) ||
            !validateString(newValue.password) ||
            !validateString(newValue.confirmPassword)) {
            isValid = false;
        };

        // Verify password and confirm password fields match
        if (newValue.password !== newValue.confirmPassword) {
            isValid = false;
        }

        setFormValidated(isValid);
    };

    const updateLoginInfo = (newLoginInfoObject) => {
        setLoginInfo(newLoginInfoObject);
        validateForm(newLoginInfoObject);
    };

    return (
        <Card className="rounded">
            <Card.Body>
                <h5>LOGIN INFORMATION</h5>
                <FloatingLabel className="mb-3" controlId="username" label="Username">
                    <Form.Control type="text" className={loginInfo.username === "" ? "invalidField" : ""}  placeholder="Username" value={loginInfo.username} onChange={(e) => updateLoginInfo({ ...loginInfo, username: e.target.value })} disabled={isLoading} />
                </FloatingLabel>
                <FloatingLabel className="mb-3" controlId="password" label="Password">
                    <Form.Control type="password" className={loginInfo.password === "" ? "invalidField" : ""} placeholder="Password" value={loginInfo.password} onChange={(e) => updateLoginInfo({ ...loginInfo, password: e.target.value })} disabled={isLoading} />
                </FloatingLabel>
                <FloatingLabel className="mb-3" controlId="confirmPassword" label="Confirm Password">
                    <Form.Control type="password" className={loginInfo.confirmPassword === "" || loginInfo.password !== loginInfo.confirmPassword ? "invalidField" : ""} placeholder="Confirm Password" value={loginInfo.confirmPassword} onChange={(e) => updateLoginInfo({ ...loginInfo, confirmPassword: e.target.value })} disabled={isLoading} />
                </FloatingLabel>
            </Card.Body>
        </Card>
    );
}

export default LoginInformation;