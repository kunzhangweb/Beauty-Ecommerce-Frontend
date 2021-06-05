import React from 'react';
import {Col, Row, } from 'react-bootstrap';

export default function CheckoutSteps(props) {
    return (
        <div>
            {/* steps banner */}
            <Row className="checkout-steps">
                <Col className={props.step1 ? 'active' : ''}>Log In</Col>
                <Col className={props.step2 ? 'active' : ''}>Shipping</Col>
                <Col className={props.step3 ? 'active' : ''}>Payment</Col>
                <Col className={props.step4 ? 'active' : ''}>Place Order</Col>               
            </Row>
        </div>
    )
}
