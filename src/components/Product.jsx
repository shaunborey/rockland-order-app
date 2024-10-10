import React, { useState } from 'react';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';

function Product({ product, addToCart }) {
    const [quantity, setQuantity] = useState(1);

    return (
        <Card style={{ width: "18rem", marginTop: "15px" }}>
            <Card.Img variant="top" src={`data:image/png;base64, ${product.image}`} />
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                    {product.description}
                </Card.Text>
                <Card.Text>
                    ${product.price}
                </Card.Text>
                <Row>
                    <Col xs={5}>
                        <Form.Group controlId={`ProductQty_${product.id}`} as={Row}>
                            <Form.Label style={{fontSize: "18px", textAlign: "right" }} column xs={7}>Qty:</Form.Label>
                            <Col xs={5} style={{padding: "0px" }}>
                                <Form.Control size="sm" type="number" value={quantity} style={{ width: "50px" }} onChange={(e) => { setQuantity(parseInt(e.target.value)) }} />
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col xs={7}>
                        <Button variant="secondary" type="button" style={{float: "right" }} onClick={() => { addToCart(product, quantity) }}>ADD TO CART</Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default Product;