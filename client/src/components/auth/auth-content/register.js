import React, {useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import {AuthNavigation} from './Navigation';
import {useHttp} from '../../../hooks/http.hook';
import {isValidEmail} from '../../../helpers/auth/auth-helpers';
import leftArrowIcon from '../../../assets/images/left-arrow.svg';

export const RegisterContent = () => {
    const {loading, error, request} = useHttp();
    const [step, setStep] = useState('first-step');
    const [form, setForm] = useState({
        email: '', password: ''
    })

    // Node elements 

    const emailsContainer = document.querySelector('.register-emails');
    const passwordsContainer = document.querySelector('.register-passwords');
    const buttonsContainer = document.querySelector('.form-buttons');
    const submitFormButton = document.querySelector('.submit-form-btn');

    const updateForm = event => {
        setForm({
            ...form, [event.target.name]: event.target.value
        })
    }

    // Steps handlers 

    const firstStepHandler = () => {
        emailsContainer.classList.add('mb-3');
        passwordsContainer.classList.remove('hide-first-step');
        buttonsContainer.classList.remove('hide-first-step');
        submitFormButton.innerHTML = `Register me!`;
        emailsContainer.querySelector('input').setAttribute('disabled', 'disabled');
        emailsContainer.querySelector('input').classList.add('input-filled');
        setStep('second-step');
    }

    const secondStepHandler = () => {
        emailsContainer.classList.remove('mb-3');
        passwordsContainer.classList.add('hide-first-step');
        buttonsContainer.classList.add('hide-first-step');
        emailsContainer.querySelector('input').removeAttribute('disabled', 'disabled');
        emailsContainer.querySelector('input').classList.remove('input-filled');
        submitFormButton.innerHTML = `Continue`;
        setStep('first-step');
    }

    const registerHandler = async (e) => {
        e.preventDefault(e);
        // const data = await request('/register', 'POST', {...form});
        // console.log('Data' + data);
        if(isValidEmail(form.email) && step == 'first-step'){
            firstStepHandler();
        }
    }

    const backToFirstStep = (e) => {
        e.preventDefault();
        if(step == 'second-step'){
            secondStepHandler()
        }
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
                <div className="register-passwords hide-first-step">
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" className="register-password" onChange={updateForm}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Repeat password</Form.Label>
                        <Form.Control type="password" name="repeat-password" className="register-repeat-password" onChange={updateForm}/>
                    </Form.Group>
                </div>
                <div className='form-buttons align-items-center d-flex hide-first-step'>
                    <a href="/" className='back-to-btn' onClick={backToFirstStep}>
                        <img src={leftArrowIcon} alt="Left Arrow Icon"/>
                        Back to email
                    </a>
                    <Button type="submit" variant="primary" className='submit-form-btn' onClick={registerHandler}>
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