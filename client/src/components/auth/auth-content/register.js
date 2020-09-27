import React, {useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import {AuthNavigation} from './Navigation';
import {useHttp} from '../../../hooks/http.hook';
import leftArrowIcon from '../../../assets/images/left-arrow.svg';

export const RegisterContent = () => {
    const {loading, error, request} = useHttp();
    const [form, setForm] = useState({
        email: '', password: ''
    })

    // Node elements 

    const emailsContainer = document.querySelector('.register-emails');
    const passwordsContainer = document.querySelector('.register-passwords');
    const buttonsContainer = document.querySelector('.form-buttons');

    const updateForm = event => {
        setForm({
            ...form, [event.target.name]: event.target.value
        })
    }

    const registerHandler = async (e) => {
        e.preventDefault(e);
        // const data = await request('/register', 'POST', {...form});
        // console.log('Data' + data);
        if(isValidEmail(form.email)){
            emailsContainer.classList.add('second-step');
            passwordsContainer.classList.remove('first-step');
            buttonsContainer.classList.remove('first-step');
        }
    }

    const isValidEmail = (email) => {
        if(email.match((/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i))){
            console.log('Email valid');
            return true;
        } else {
            console.log('Email invalid')
            return false;
        }
    }

    const backToFirstStep = (e) => {
        e.preventDefault();
        emailsContainer.classList.remove('second-step');
        passwordsContainer.classList.add('first-step');
        buttonsContainer.classList.add('first-step');
    }

    return( 
        <React.Fragment>
            <h1 className="auth-content__title">
                Register
            </h1>
            <Form action="/register" method="POST" className='auth-form'>
                <div className='register-emails'>
                    <Form.Group className="register-email mb-0">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name="email" placeholder="example@gmail.com" onChange={updateForm}/>
                    </Form.Group>
                </div>
                <div className="register-passwords first-step">
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" className="register-password" onChange={updateForm}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Repeat password</Form.Label>
                        <Form.Control type="password" name="repeat-password" className="register-repeat-password" onChange={updateForm}/>
                    </Form.Group>
                </div>
                <div className='form-buttons align-items-center d-flex first-step'>
                    <a href="/" className='back-to-btn' onClick={backToFirstStep}>
                        <img src={leftArrowIcon} alt="Left Arrow Icon"/>
                        Back to email
                    </a>
                    <Button type="submit" variant="primary" onClick={registerHandler}>
                        Continue
                    </Button>
                </div>
            </Form>
            <AuthNavigation links={{
               "login": "Log In",
               "reset-password": "Forget password ?"
            }} />
        </React.Fragment>
    )
}