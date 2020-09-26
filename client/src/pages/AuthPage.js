import React from 'react';
import {AuthSidebar} from '../components/auth/auth-sidebar/Sidebar';
import {AuthContent} from '../components/auth/auth-content/Content';
import {Row, Col, Container} from 'react-bootstrap';
import '../styles/auth/auth.css';
import '../styles/base/base.css';

export const AuthPage = (props) => {
    return(
        <Container fluid className="auth-container">
            <Row className="auth-row">
                <Col xs={4} className='p-0 auth-col'>
                    <AuthSidebar/>
                </Col>
                <Col xs={8} className='p-0 auth-col'>
                    <AuthContent step={props.step}/>
                </Col>
            </Row>
        </Container>
    )
}