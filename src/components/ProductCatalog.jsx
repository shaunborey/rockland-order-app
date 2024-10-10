import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Product from './Product';
import { OrderServiceContext } from '../services/order.service';

function ProductCatalog({ handleAddToCart }) {
    const orderService = useContext(OrderServiceContext);
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        const fetchProductList = async () => {
            const response = await orderService.getProductList();
            if (response) {
                setProductList(response);
            }
        };
        fetchProductList();
    }, []);

    return (
        <div>
            <h1>PRODUCT CATALOG</h1>
            <Container className="productContainer">
                <Row s={1} md={2} xl={3} xxl={4} style={{paddingBottom: "10px"}}>
                    {productList.map((product) => (
                        <Col key={product.id}>
                            <Product product={product} addToCart={handleAddToCart} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}

export default ProductCatalog;