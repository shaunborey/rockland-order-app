import React from 'react';
import { Row, Col, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem';
import './shoppingcart.css';

function ShoppingCart({ items, orderTotal, handleUpdateCart }) {
    const navigate = useNavigate();

    return (
        <div>
            <h1>SHOPPING CART</h1>
            <Container fluid>
                <Row>
                    {items.map((item) => (
                        <CartItem key={item.product.id} product={item.product} quantity={item.quantity} itemTotal={item.totalPrice} updateCart={handleUpdateCart} />
                    ))}
                </Row>
                <Row>
                    <Col sm={7}>
                        <div className="orderTotal">ORDER TOTAL: ${orderTotal}</div>
                    </Col>
                    <Col sm={5}>
                        <Button variant="info" type="button" className="cartButton" onClick={() => { navigate('/catalog') }}>CANCEL</Button>
                        <Button variant="dark" type="button" className="cartButton" onClick={() => { navigate('/checkout') }}>CHECKOUT</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default ShoppingCart;