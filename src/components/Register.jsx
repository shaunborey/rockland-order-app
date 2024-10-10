import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthServiceContext } from '../services/auth.service';
import { ApiServiceContext } from '../services/api.service';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import LoginInformation from './LoginInformation';
import PersonalInformation from './PersonalInformation';
import './register.css';

function Register() {
    const [error, setError] = useState(null);
    const [timezones, setTimezones] = useState([]);
    const [loginInfo, setLoginInfo] = useState({ username: '', password: '', confirmPassword: '' });
    const [personalInfo, setPersonalInfo] = useState({ firstName: '', middleName: '', lastName: '', suffix: '', email: '', confirmEmail: '', address1: '', address2: '', city: '', state: '', postalcode: '', timeZoneId: '', optInAccountNotices: false, optInProductNotices: false });
    const [isLoading, setIsLoading] = useState(false);
    const [loginInfoValidated, setLoginInfoValidated] = useState(false);
    const [personalInfoValidated, setPersonalInfoValidated] = useState(false);
    const navigate = useNavigate();
    const authService = useContext(AuthServiceContext);
    const apiService = useContext(ApiServiceContext);

    useEffect(() => {
        const fetchTimezones = async () => {
            const response = await apiService.get('/data/timezones');
            if (response) {
                setTimezones(response);
                const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                const defaultTimezone = response.find((timezone) => timezone.ianaName === userTimeZone);
                if (defaultTimezone) {
                    setPersonalInfo({ ...personalInfo, timeZoneId: defaultTimezone.timeZone.id });
                } else {
                    setPersonalInfo({ ...personalInfo, timeZoneId: response.at(0).timeZone.id });
                }
            }
        };
        fetchTimezones();
    }, []);    

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (loginInfo.password !== loginInfo.confirmPassword) {
            setError('Passwords do not match');
            setIsLoading(false);
            return;
        }
        if (personalInfo.email !== personalInfo.confirmEmail) {
            setError('Email addresses do not match');
            setIsLoading(false);
            return;
        }

        try {            
            await authService.register(loginInfo.username, loginInfo.password, personalInfo.email, personalInfo.firstName, personalInfo.middleName, personalInfo.lastName, personalInfo.suffix, personalInfo.address1, personalInfo.address2, personalInfo.city, personalInfo.state, personalInfo.postalcode, personalInfo.timeZoneId, personalInfo.optInAccountNotices, personalInfo.optInProductNotices)
                .then(response => {
                    setIsLoading(false);
                    navigate('/catalog');
                })
                .catch(error => {
                    throw error;
                });
        } catch (error) {
            setIsLoading(false);
            setError(error.message || error.response.data);            
        }
    };

    return (
        <Container className="register-container">
            <Row className="justify-content-center full-width-rows">
                <Col md={12}>
                    <Card className="rounded">
                        <Card.Body>
                            <h3 style={{ width: "45%", float: "left" }}>REGISTER NOW FOR INSTANT ACCESS!</h3>
                            <p className="align-right" style={{ width: "45%", float: "right" }}>Already registered? <Link to="/">Click here to login</Link></p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <p className="border-top border-bottom">Complete the form below to get instant access to the Rockland ordering application.</p>
                    {error && <Alert variant="danger">{error}</Alert>}
                </Col>
            </Row>
            <Form>
                <Row className="justify-content-center full-width-rows">
                    <Col md={6}>
                        <LoginInformation
                            loginInfo={loginInfo}
                            isLoading={isLoading}
                            setFormValidated = {setLoginInfoValidated}
                            setLoginInfo={setLoginInfo}
                        />
                    </Col>
                    <Col md={6}>
                        <PersonalInformation
                            personalInfo={personalInfo}
                            isLoading={isLoading}
                            setFormValidated = {setPersonalInfoValidated}
                            setPersonalInfo={setPersonalInfo}
                            timezones={timezones}
                        />
                    </Col>
                </Row>
                
                {/* Aligning the paragraph to the left and button to the right */}
                <Row className="full-width-rows">
                    <Col md={8} className="align-left"></Col>
                    <Col md={4} className="align-right">
                        <Button type="submit" variant={isLoading ? "info" : "primary"} disabled={isLoading || !loginInfoValidated || !personalInfoValidated} onClick={handleRegister} className="float-right"><span className={isLoading ? 'loader' : ''}></span>{isLoading ? '  PROCESSING...' : 'COMPLETE REGISTRATON'}</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}

export default Register;