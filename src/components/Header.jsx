import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Badge } from 'react-bootstrap';
import './header.css';

function Header({ user, cartItemCount, handleLogout }) {
    const navigate = useNavigate();

    return (
        <div className="header">
            <h3>Welcome, {user.given_name}!</h3>
            <div>
                <Button variant="outline-secondary" className="cartNavButton" onClick={() => { navigate('/cart') }}>
                    <Badge bg="dark" pill={true}>{cartItemCount}</Badge>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-cart3" viewBox="0 0 16 16">
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                    </svg>
                </Button>
                <Button variant="primary" onClick={handleLogout}>
                    Log Out
                </Button>
            </div>
        </div>
    );
}

export default Header;