import React from 'react';
import {AuthSidebar} from '../components/auth/auth-sidebar/sidebar';
import {AuthContent} from '../components/auth/auth-content/content';
import {Row, Col, Container} from 'react-bootstrap';
import '../styles/auth/auth.css';

export const AuthPage = (props) => {
    return(
        <Container fluid>
            <Row>
                <Col sm={4} className='no-padding'>
                    <AuthSidebar/>
                </Col>
                <Col sm={8} className='no-padding'>
                    <AuthContent step={props.step}/>
                </Col>
            </Row>
        </Container>
    )
}