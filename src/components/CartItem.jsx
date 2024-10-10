import React, { useState } from 'react';
import { Card, Image, Button, Form, Row, Col } from 'react-bootstrap';

function CartItem({ product, quantity, itemTotal, updateCart }) {
    const [currentQty, setCurrentQty] = useState(quantity);
    const [currTotal, setCurrTotal] = useState(itemTotal);
    const [isEditing, setIsEditing] = useState(false);

    const handleItemUpdate = (newQty) => {
        setCurrentQty(newQty);
        setCurrTotal((newQty * product.price).toFixed(2));
        updateCart(product, newQty, true);
        setIsEditing(false);
    };

    const handleQtyChange = (newQty) => {
        setCurrentQty(newQty);
        setCurrTotal((newQty * product.price).toFixed(2));
    }

    return (
        <Card style={{ width: "100%" }}>
            <Card.Body as={Row}>
                <Col sm={2}>
                    <Image src={`data:image/png;base64, ${product.image}`} style={{ width: "100px", height: "100px" }} thumbnail />
                </Col>
                <Col sm={8}>
                    <Card.Title>{product.name}</Card.Title>
                    {isEditing ? (
                        <Form.Group controlId={`ProductQty_${product.id}`}>
                            <Form.Label style={{ fontSize: "18px", textAlign: "right" }}>Quantity:</Form.Label>
                            <Form.Control size="sm" type="number" value={currentQty} style={{ width: "50px", display: "inline-block", marginLeft: "10px" }} onChange={(e) => { handleQtyChange(parseInt(e.target.value)) }} />
                        </Form.Group>
                    ) : (
                        <Card.Text style={{ fontSize: "18px" }}>Quantity: {currentQty}</Card.Text>
                    )}
                    <Card.Text style={{ fontSize: "18px" }}>Item Total: ${currTotal}</Card.Text>
                </Col>
                <Col sm={2}>
                    {isEditing ? (
                        <Form.Group>
                            <Button variant="danger" type="button" className="cartButton" onClick={() => { handleItemUpdate(0) }}>REMOVE ITEM</Button>
                            <Button variant="dark" type="button" className="cartButton" onClick={() => { handleItemUpdate(currentQty) }}>SAVE CHANGES</Button>
                        </Form.Group>
                    ) : (
                        <Button variant="secondary" type="button" className="cartButton" onClick={() => { setIsEditing(true) }}>EDIT ITEM</Button>
                    )}
                </Col>
            </Card.Body>
        </Card>
    );
}

export default CartItem;