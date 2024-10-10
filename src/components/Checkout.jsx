import React, { useState, useEffect, useMemo, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Card, Button, InputGroup, FloatingLabel, Table, Modal, Alert, Col, Row } from 'react-bootstrap';
import { OrderServiceContext } from '../services/order.service';
import { UtilitiesServiceContext } from '../services/utilities.service';
import PDFViewer from './PDFViewer';
import './checkout.css';

function Checkout({ user, items, itemTotal, clearOrderDetails }) {
    const orderService = useContext(OrderServiceContext);
    const utilitiesService = useContext(UtilitiesServiceContext);
    const navigate = useNavigate();
    const [shippingAddress, setShippingAddress] = useState({ address1: "", address2: "", city: "", state: "", postalcode: "" });
    const [shippingOptions, setShippingOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);
    const [pdfDataString, setPdfDataString] = useState("");
    const [fileError, setFileError] = useState("");
    const [viewPdf, setViewPdf] = useState(false);
    const [pdfLoaded, setPdfLoaded] = useState(false);
    const [formValidated, setFormValidated] = useState(false);
    const [orderTotal, setOrderTotal] = useState(0.00);
    const [isLoading, setIsLoading] = useState(false);
    const [showOrderSuccess, setShowOrderSuccess] = useState(false);
    const [showOrderError, setShowOrderError] = useState(false);
    const [orderErrorMessage, setOrderErrorMessage] = useState("");

    useEffect(() => {
        const fetchShippingOptions = async () => {
            const response = await orderService.getShippingOptions();
            if (response) {
                setShippingOptions(response);
                if (Array.isArray(response) && response.length > 0) {
                    setSelectedOption(response[0]);
                }
            }
        };
        fetchShippingOptions();
    }, []);

    useEffect(() => {
        var total = parseFloat(itemTotal);

        if (selectedOption) {
            total = total + selectedOption.amount;
        }

        setOrderTotal(total.toFixed(2));
    }, [selectedOption, shippingOptions, itemTotal]);

    useEffect(() => {
        if (user) {
            setShippingAddress({ address1: user.address1, address2: user.address2, city: user.city, state: user.state, postalcode: user.postal_code });
        }
    }, [user]);

    const handleShippingOptionSelect = (optionId) => {
        setSelectedOption(shippingOptions.find(option => option.id === optionId));
    }

    const handleOrderSubmit = async () => {
        setIsLoading(true);
        const fileString = await utilitiesService.getBase64String(pdfFile);
        const index = fileString.indexOf(",") + 1;
        const fileBase64 = fileString.substring(index);
        const response = await orderService.createOrder(items, shippingAddress.address1, shippingAddress.address2, shippingAddress.city, shippingAddress.state, shippingAddress.postalcode, selectedOption.id, orderTotal, fileBase64);
        if (response.status === "success") {
            setIsLoading(false);
            setShowOrderSuccess(true);
        } else {
            setIsLoading(false);
            setShowOrderError(true);
            setOrderErrorMessage(response.message);
        }
    };

    const handleFileSelect = async (e) => {
        var file = e.target.files[0];
        var fileLoaded = false;
        setFileError("");

        if (file instanceof File) {
            var validPDF = await utilitiesService.validatePDF(file);
            if (validPDF) {
                setPdfFile(file);
                var base64String = await utilitiesService.getBase64String(file);
                setPdfDataString(base64String);
                fileLoaded = true;
            } else {
                setFileError("Invalid file. The file type must be PDF.");
            }
        }

        setPdfLoaded(fileLoaded);
        validateForm("pdfFile", fileLoaded);
    };

    const handleAddressUpdate = (newAddressObject) => {
        setShippingAddress(newAddressObject);
        validateForm("address", newAddressObject);
    }

    const validateForm = (changedItem, newValue) => {
        var isValid = true;
        var address = shippingAddress;
        var isFileLoaded = pdfLoaded;

        switch (changedItem) {
            case "address":
                address = newValue;
                break;

            case "pdfFile":
                isFileLoaded = newValue;
                break;
        }

        // Verify required address fields have values
        const validateString = (string) => {
            return string !== null && string.trim() !== "";
        };

        if (!validateString(address.address1) ||
            !validateString(address.city) ||
            !validateString(address.state) ||
            !validateString(address.postalcode)) {
            isValid = false;
        }

        // Verify postal code is a valid value
        if (!validateZipCode(address.postalcode)) {
            isValid = false;
        }

        // Verify that a pdf file has been uploaded
        if (!isFileLoaded) {
            isValid = false;
        }

        setFormValidated(isValid);
    };

    const validateZipCode = (zipCode) => {        
        const postalCodeRegex = /^\d{5}(?:-\d{4})?$/;
        return postalCodeRegex.test(zipCode);
    }

    const handleRemoveFile = () => {
        setPdfFile(null);
        setPdfLoaded(false);
        setFileError("");
        validateForm("pdfFile", false);
    };

    const dismissSuccessAlert = () => {
        setShowOrderSuccess(false);
        clearOrderDetails();
        setPdfFile(null);
        setPdfLoaded(false);
        navigate('/catalog');
    }

    const stateOptions = {
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

    return (
        <div>
            <h1>CHECKOUT</h1>
            <Card border="dark" className="checkoutSection">
                <Card.Title>SHIPPING ADDRESS</Card.Title>
                <Card.Body>
                    <Row>
                        <Col>
                            <FloatingLabel className="mb-3" controlId="shippingAddress1" label="Address 1">
                                <Form.Control className={shippingAddress.address1 === "" ? "invalidField" : ""} type="text" value={shippingAddress.address1} onChange={(e) => handleAddressUpdate({ ...shippingAddress, address1: e.target.value })} disabled={isLoading} />
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FloatingLabel className="mb-3" controlId="shippingAddress2" label="Address 2">
                                <Form.Control type="text" value={shippingAddress.address2} onChange={(e) => handleAddressUpdate({ ...shippingAddress, address2: e.target.value })} disabled={isLoading} />
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FloatingLabel className="mb-3" controlId="shippingCity" label="City">
                                <Form.Control className={shippingAddress.city === "" ? "invalidField" : ""} type="text" value={shippingAddress.city} onChange={(e) => handleAddressUpdate({ ...shippingAddress, city: e.target.value })} disabled={isLoading} />
                            </FloatingLabel>
                        </Col>
                        <Col>
                            <FloatingLabel className="mb-3" controlId="shippingState" label="State">
                                <Form.Control as="select" value={shippingAddress.state} onChange={(e) => handleAddressUpdate({ ...shippingAddress, state: e.target.value })} disabled={isLoading}>
                                    {Object.keys(stateOptions).map((key) => <option key={key} value={key}>{stateOptions[key]}</option>)}
                                </Form.Control>
                            </FloatingLabel>
                        </Col>
                        <Col>
                            <FloatingLabel className="mb-3" controlId="shippingPostalcode" label="Zip Code">
                                <Form.Control className={validateZipCode(shippingAddress.postalcode) ? "" : "invalidField"} type="text" value={shippingAddress.postalcode} onChange={(e) => handleAddressUpdate({ ...shippingAddress, postalcode: e.target.value })} disabled={isLoading} />
                            </FloatingLabel>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            <Card border="dark" className="checkoutSection">
                <Card.Title>SHIPPING METHOD</Card.Title>
                <Card.Body>
                    {shippingOptions.map((option) => (
                        <Form.Group as={Row} className="mb-3" key={option.id}>
                            <Form.Check style={{ fontWeight: "bold" }} type="radio" id={"shippingOption_" + option.id} name="shippingOption" onChange={(e) => handleShippingOptionSelect(option.id)} value={option.id} label={`${option.type} - $${option.amount}`} defaultChecked={option.id === selectedOption.id} />
                            <Form.Label>{option.description}</Form.Label>
                        </Form.Group>
                    ))}
                </Card.Body>
            </Card>
            <Card border="dark" className="checkoutSection">
                <Card.Title>Please attach a purchase order (PDF file only)</Card.Title>
                <Card.Body>
                    <Form.Group className="mb-3" controlId="purchaseOrderPDF" as={Row}>
                        <Col>
                            {pdfLoaded ?
                                <InputGroup className="mb-3" style={{ width: "100%", border: "1px solid black" }}>
                                    <Form.Control type="text" placeholder={utilitiesService.sanitizeString(pdfFile.name)} disabled readOnly />
                                    <Button variant="primary" onClick={() => { setViewPdf(true) }}>VIEW PDF</Button>
                                    <Button variant="secondary" onClick={handleRemoveFile}>REPLACE FILE</Button>
                                </InputGroup>
                                :
                                <Form.Control type="file" onChange={handleFileSelect} accept="application/pdf" />}
                            <Form.Label style={{ color: "#ff0000" }}>{fileError}</Form.Label>
                        </Col>
                    </Form.Group>
                </Card.Body>
            </Card>
            <Card border="dark" className="checkoutSection">
                <Card.Title>ORDER SUMMARY</Card.Title>
                <Card.Body>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>QTY</th>
                                <th>ITEM NAME</th>
                                <th>UNIT PRICE</th>
                                <th>TOTAL PRICE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item.product.id}>
                                    <td>{item.quantity}</td>
                                    <td>{item.product.name}</td>
                                    <td>{item.product.price}</td>
                                    <td>${item.totalPrice}</td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan={3}>Shipping Method: {selectedOption?.type}</td>
                                <td>${selectedOption?.amount}</td>
                            </tr>
                            <tr>
                                <td colSpan={3}>ORDER TOTAL: </td>
                                <td>${orderTotal}</td>
                            </tr>
                            <tr>
                                <td colSpan={3}></td>
                                <td><Button type="button" variant="primary" disabled={!formValidated || isLoading} onClick={!isLoading && formValidated ? handleOrderSubmit : null}>
                                    {isLoading ? "Sending..." : "SEND ORDER"}
                                </Button>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
            <Modal size="xl" style={{ zIndex: 9999999 }} centered={true} show={viewPdf} onHide={() => { setViewPdf(false) }}>
                <Modal.Header closeButton>Purchase Order PDF</Modal.Header>
                <Modal.Body>
                    <PDFViewer PdfBase64String={pdfDataString} />
                </Modal.Body>
            </Modal>
            <Modal size="xl" backdrop="static" style={{ zIndex: 9999999999 }} centered={true} show={showOrderSuccess}>
                <Modal.Body>
                    <Alert show={showOrderSuccess} variant="success">
                        <Alert.Heading>ORDER SUCCESS!</Alert.Heading>
                        <p>
                            Your order was submitted successfully! Click the button below to return to the product catalog.
                        </p>
                        <hr />
                        <div className="d-flex justify-content-end">
                            <Button onClick={dismissSuccessAlert} variant="outline-success">
                                PRODUCT CATALOG
                            </Button>
                        </div>
                    </Alert>
                </Modal.Body>
            </Modal>
            <Modal size="xl" backdrop="static" style={{ zIndex: 9999999999 }} centered={true} show={showOrderError}>
                <Modal.Body>
                    <Alert show={showOrderError} variant="danger">
                        <Alert.Heading>AN ERROR OCCURRED WHILE SENDING YOUR ORDER</Alert.Heading>
                        <p>
                            Your order could not be processed due to the following error:
                        </p>
                        <p>
                            {orderErrorMessage}
                        </p>
                        <hr />
                        <div className="d-flex justify-content-end">
                            <Button onClick={() => setShowOrderError(false)} variant="outline-danger">
                                DISMISS
                            </Button>
                        </div>
                    </Alert>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Checkout;