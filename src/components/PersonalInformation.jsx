import React from 'react';
import { Form, Card, FloatingLabel, Col, Row } from 'react-bootstrap';

function PersonalInformation({ personalInfo, isLoading, setFormValidated, setPersonalInfo, timezones }) {
    const suffixOptions = {
        "": "",
        "Jr.": "Jr.",
        "Sr.": "Sr.",
        "III": "III",
        "IV": "IV",
        "V": "V"
    };

    const stateOptions = {
        '': 'Select State',
        'AL': 'Alabama',
        'AK': 'Alaska',
        'AZ': 'Arizona',
        'AR': 'Arkansas',
        'CA': 'California',
        'CO': 'Colorado',
        'CT': 'Connecticut',
        'DE': 'Delaware',
        'FL': 'Florida',
        'GA': 'Georgia',
        'HI': 'Hawaii',
        'ID': 'Idaho',
        'IL': 'Illinois',
        'IN': 'Indiana',
        'IA': 'Iowa',
        'KS': 'Kansas',
        'KY': 'Kentucky',
        'LA': 'Louisiana',
        'ME': 'Maine',
        'MD': 'Maryland',
        'MA': 'Massachusetts',
        'MI': 'Michigan',
        'MN': 'Minnesota',
        'MS': 'Mississippi',
        'MO': 'Missouri',
        'MT': 'Montana',
        'NE': 'Nebraska',
        'NV': 'Nevada',
        'NH': 'New Hampshire',
        'NJ': 'New Jersey',
        'NM': 'New Mexico',
        'NY': 'New York',
        'NC': 'North Carolina',
        'ND': 'North Dakota',
        'OH': 'Ohio',
        'OK': 'Oklahoma',
        'OR': 'Oregon',
        'PA': 'Pennsylvania',
        'RI': 'Rhode Island',
        'SC': 'South Carolina',
        'SD': 'South Dakota',
        'TN': 'Tennessee',
        'TX': 'Texas',
        'UT': 'Utah',
        'VT': 'Vermont',
        'VA': 'Virginia',
        'WA': 'Washington',
        'WV': 'West Virginia',
        'WI': 'Wisconsin',
        'WY': 'Wyoming',
        'DC': 'District of Columbia',
        'AS': 'American Samoa',
        'GU': 'Guam',
        'MP': 'Northern Mariana Islands',
        'PR': 'Puerto Rico',
        'UM': 'United States Minor Outlying Islands',
        'VI': 'Virgin Islands, U.S.'
    };

    const validateForm = (newValue) => {
        var isValid = true;

        // Verify required personal information fields have values
        const validateString = (string) => {
            return string !== null && string.trim() !== "";
        };

        if (!validateString(newValue.firstName) ||
            !validateString(newValue.lastName) ||
            !validateString(newValue.email) ||
            !validateString(newValue.confirmEmail) ||
            !validateString(newValue.address1) ||
            !validateString(newValue.city) ||
            !validateString(newValue.state) ||
            !validateString(newValue.postalcode)) {
            isValid = false;
        };

        // Verify postal code is a valid value
        if (!validateZipCode(newValue.postalcode)) {
            isValid = false;
        }

        // Verify email and confirm email fields match
        if (newValue.email !== newValue.confirmEmail) {
            isValid = false;
        }

        setFormValidated(isValid);
    };

    const updatePersonalInfo = (newPersonalInfoObject) => {
        setPersonalInfo(newPersonalInfoObject);
        validateForm(newPersonalInfoObject);
    };

    const validateZipCode = (zipCode) => {        
        const postalCodeRegex = /^\d{5}(?:-\d{4})?$/;
        return postalCodeRegex.test(zipCode);
    }

    return (
        <Card className="rounded">
            <Card.Body>
                <h5>PERSONAL INFORMATION</h5>
                <Row>
                    <Col>
                        <FloatingLabel className="mb-3" controlId="firstName" label="First Name">
                            <Form.Control type="text" placeholder="First Name" className={personalInfo.firstName === "" ? "invalidField" : ""} value={personalInfo.firstName} onChange={(e) => updatePersonalInfo({ ...personalInfo, firstName: e.target.value })} disabled={isLoading} />
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel className="mb-3" controlId="middleName" label="Middle Name">
                            <Form.Control type="text" placeholder="Middle Name" value={personalInfo.middleName} onChange={(e) => updatePersonalInfo({ ...personalInfo, middleName: e.target.value })} disabled={isLoading} />
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel className="mb-3" controlId="lastName" label="Last Name">
                            <Form.Control type="text" placeholder="Last Name" className={personalInfo.lastName === "" ? "invalidField" : ""} value={personalInfo.lastName} onChange={(e) => updatePersonalInfo({ ...personalInfo, lastName: e.target.value })} disabled={isLoading} />
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel className="mb-3" controlId="suffix" label="Suffix">
                            <Form.Control as="select" value={personalInfo.suffix} onChange={(e) => updatePersonalInfo({ ...personalInfo, suffix: e.target.value })} disabled={isLoading}>
                                {Object.keys(suffixOptions).map((key) => <option key={key} value={key}>{suffixOptions[key]}</option>)}
                            </Form.Control>
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FloatingLabel className="mb-3" controlId="email" label="Email Address">
                            <Form.Control type="email" placeholder="Email Address" className={personalInfo.email === "" ? "invalidField" : ""} value={personalInfo.email} onChange={(e) => updatePersonalInfo({ ...personalInfo, email: e.target.value })} disabled={isLoading} />
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel className="mb-3" controlId="confirmEmail" label="Confirm Email Address">
                            <Form.Control type="email" placeholder="Confirm Email Address" className={personalInfo.confirmEmail === "" || personalInfo.email !== personalInfo.confirmEmail ? "invalidField" : ""} value={personalInfo.confirmEmail} onChange={(e) => updatePersonalInfo({ ...personalInfo, confirmEmail: e.target.value })} disabled={isLoading} />
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FloatingLabel className="mb-3" controlId="address1" label="Address 1">
                            <Form.Control type="text" placeholder="Address 1" className={personalInfo.address1 === "" ? "invalidField" : ""} value={personalInfo.address1} onChange={(e) => updatePersonalInfo({ ...personalInfo, address1: e.target.value })} disabled={isLoading} />
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FloatingLabel className="mb-3" controlId="address2" label="Address 2">
                            <Form.Control type="text" placeholder="Address 2" value={personalInfo.address2} onChange={(e) => updatePersonalInfo({ ...personalInfo, address2: e.target.value })} disabled={isLoading} />
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FloatingLabel className="mb-3" controlId="city" label="City">
                            <Form.Control type="text" placeholder="City" className={personalInfo.city === "" ? "invalidField" : ""} value={personalInfo.city} onChange={(e) => updatePersonalInfo({ ...personalInfo, city: e.target.value })} disabled={isLoading} />
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel className="mb-3" controlId="state" label="State">
                            <Form.Control as="select" className={personalInfo.state === "" ? "invalidField" : ""} value={personalInfo.state} onChange={(e) => updatePersonalInfo({ ...personalInfo, state: e.target.value })} disabled={isLoading}>
                                {Object.keys(stateOptions).map((key) => <option key={key} value={key}>{stateOptions[key]}</option>)}
                            </Form.Control>
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel className="mb-3" controlId="postalcode" label="Zip Code">
                            <Form.Control type="text" placeholder="Zip Code" className={validateZipCode(personalInfo.postalcode) ? "" : "invalidField"} value={personalInfo.postalcode} onChange={(e) => updatePersonalInfo({ ...personalInfo, postalcode: e.target.value })} disabled={isLoading} />
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FloatingLabel className="mb-3" controlId="timeZoneId" label="Local Time Zone">
                            <Form.Control as="select" value={personalInfo.timeZoneId} onChange={(e) => updatePersonalInfo({ ...personalInfo, timeZoneId: e.target.value })} disabled={isLoading}>
                                {timezones.map((tz) => (
                                    <option key={tz.timeZone.id} value={tz.timeZone.id}>{tz.timeZone.displayName}</option>
                                ))}
                            </Form.Control>
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row>
                    <Form.Group controlId="optInAccountNotices" as={Col}>
                        <Form.Check type="checkbox" checked={personalInfo.optInAccountNotices} onChange={(e) => updatePersonalInfo({ ...personalInfo, optInAccountNotices: e.target.checked })} label="Yes, I would like to receive email notifications about my account" disabled={isLoading} />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group controlId="optInProductNotices" as={Col}>
                        <Form.Check type="checkbox" checked={personalInfo.optInProductNotices} onChange={(e) => updatePersonalInfo({ ...personalInfo, optInProductNotices: e.target.checked })} label="Yes, I would like to receive email notifications about related products and services" disabled={isLoading} />
                    </Form.Group>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default PersonalInformation;