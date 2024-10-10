import React, { useEffect, useState, useContext } from 'react';
import { Container } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import ProductCatalog from './ProductCatalog';
import ShoppingCart from './ShoppingCart';
import Checkout from './Checkout';
import { AuthServiceContext } from '../services/auth.service';
import './ordersystem.css';

function OrderSystem({ displayComponent }) {
    const [component, setComponent] = useState(<ProductCatalog />);
    const [user, setUser] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [orderTotal, setOrderTotal] = useState(0.00);
    const navigate = useNavigate();
    const authService = useContext(AuthServiceContext);   

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUser(decodedToken);
        } else {
            navigate('/');
        }
    }, [navigate]);

    useEffect(() => {
        const selectComponent = () => {           
            const handleUpdateCart = (product, quantity, isUpdate) => {
                var tempArray = cartItems.map((x) => x);
                var index = tempArray.findIndex(x => x.product.id === product.id);
                if (index < 0) {
                    tempArray.push({product: product, quantity: quantity, totalPrice: (product.price * quantity).toFixed(2)});                    
                } else {
                    // If this is a cart update then replace the quantity value with the new quantity, otherwise add the new quantity to the existing quantity.
                    var newQty = isUpdate ? quantity : tempArray[index].quantity + quantity;
                    if (newQty > 0) {
                        tempArray[index] = {...tempArray[index], quantity: newQty, totalPrice: (product.price * newQty).toFixed(2)};
                    } else {
                        // Quantity is 0 so remove the item from the list
                        tempArray.splice(index, 1);
                    }
                }
                setCartItems(tempArray);
                var total = 0.00;
                tempArray.forEach(x => {total += parseFloat(x.totalPrice)});
                setOrderTotal(total.toFixed(2));
            };

            switch (displayComponent) {
                case 'catalog':
                    setComponent(<ProductCatalog handleAddToCart={(product, qty) => handleUpdateCart(product, qty, false)} />);
                    break;

                case 'cart':
                    setComponent(<ShoppingCart items={cartItems} orderTotal={orderTotal} handleUpdateCart={handleUpdateCart} />);
                    break;

                case 'checkout':
                    setComponent(<Checkout user={user} items={cartItems} itemTotal={orderTotal} clearOrderDetails={clearOrderDetails} />);
                    break;

                default:
                    setComponent(<ProductCatalog />);
                    break;
            }
        }
        selectComponent();
    }, [displayComponent, cartItems]);

    const clearOrderDetails = () => {
        setCartItems([]);
        setOrderTotal(0.00);
    }

    const handleLogout = () => {
        authService.logout();
        navigate('/');
    };

    return (
        <Container className="ordersystem-container">
            {user && <Header user={user} cartItemCount={cartItems.length} handleLogout={handleLogout} />}
            {component}
        </Container>
    );
}

export default OrderSystem;