import React, {useState, useEffect, useContext} from 'react';
import {Form, Button} from 'react-bootstrap';
import {AuthNavigation} from './Navigation';
import {isValidEmail} from '../../../helpers/auth/auth-helpers';
import leftArrowIcon from '../../../assets/images/left-arrow.svg';
import {AuthContext} from '../../../context/AuthContext';
import {useHttp} from '../../../hooks/http.hook';

export const LoginContent = () => {
    const auth = useContext(AuthContext);
    const {error, request, clearError} = useHttp();
    const [step, setStep] = useState('first-step');
    const [form, setForm] = useState({
        email: '', password: ''
    })

    const updateForm = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    useEffect(()=>{
        if(error){
            alert(error);
            clearError();
        }
    }, [error, clearError])

    // Node Elements

    const emailContainer = document.querySelector('.login-email');
    const passwordContainer = document.querySelector('.login-password');
    const buttonsContainer  = document.querySelector('.form-buttons');

    // Steps handlers 
    
    const firstStepHandler = () => {
        passwordContainer.classList.remove('hide-first-step');
        buttonsContainer.classList.remove('hide-first-step');
        emailContainer.classList.add('hide-second-step');
        emailContainer.querySelector('input').classList.add('input-filled');
        emailContainer.querySelector('input').setAttribute('disabled', 'disabled');
        setStep('second-step');
    }

    const backToFirstStepHandler = () => {
        passwordContainer.classList.add('hide-first-step');
        buttonsContainer.classList.add('hide-first-step');
        emailContainer.classList.remove('hide-second-step');
        emailContainer.querySelector('input').classList.remove('input-filled');
        emailContainer.querySelector('input').removeAttribute('disabled');
        setStep('first-step');
    }

    const loginHandler = async (e) => {
        e.preventDefault(e);
        // const data = await request('/register', 'POST', {...form});
        // console.log('Data' + data);
        if(isValidEmail(form.email) && step === 'first-step'){
            firstStepHandler();
        }
        if(isValidEmail(form.email) && step === 'second-step'){
            const data = await request('/login', 'POST', {...form });
            auth.login(data.token, data.userId);
            console.log("Data from the server: " + data);
        }
    }

    const backToFirstStep = (e) => {
        e.preventDefault();
        if(step === 'second-step'){
            backToFirstStepHandler();
        }
    }
    
    return(
        <React.Fragment>
            <h1 className="auth-content__title">
                Login
            </h1>
            <Form action="/login" method="POST" className='auth-form'>
                <div className="login-email">
                    <Form.Group className="login-email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name="email" placeholder="example@gmail.com" onChange={updateForm}/>
                    </Form.Group>
                </div>
                <div className="login-password hide-first-step mb-1">
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" className="login-password" onChange={updateForm}/>
                    </Form.Group>
                </div>
                <div className="form-buttons align-items-center d-flex hide-first-step">
                    <a href="/" className='back-to-btn' onClick={backToFirstStep}>
                        <img src={leftArrowIcon} alt="Left Arrow Icon"/>
                        Change email
                    </a>
                    <Button type="submit" variant="primary" onClick={loginHandler}>
                        Continue
                    </Button>
                </div>
            </Form>
            <AuthNavigation links={{
               "register": "Register ->",
            //    "reset-password": "Forget password ?"
            }} />
        </React.Fragment>
    )
}