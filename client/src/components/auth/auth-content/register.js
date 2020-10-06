import React, {useState, useEffect, useContext} from 'react';
import {Form, Button} from 'react-bootstrap';
import {AuthNavigation} from './Navigation';
import {useHttp} from '../../../hooks/http.hook';
import {isValidEmail} from '../../../helpers/auth/auth-helpers';
import leftArrowIcon from '../../../assets/images/left-arrow.svg';
import {AuthContext} from '../../../context/AuthContext';

export const RegisterContent = () => {
    const auth = useContext(AuthContext);
    const {error, request, clearError} = useHttp();
    const [step, setStep] = useState('first-step');
    const [form, setForm] = useState({
        email: '', password: ''
    })

    const updateForm = event => {
        setForm({
            ...form, [event.target.name]: event.target.value
        })
    }

    useEffect(()=>{
        if(error){
            alert(error);
            clearError();
        }
    }, [error, clearError])

    // Node elements 

    const emailsContainer = document.querySelector('.register-emails');
    const passwordsContainer = document.querySelector('.register-passwords');
    const buttonsContainer = document.querySelector('.form-buttons');
    const submitFormButton = document.querySelector('.submit-form-btn');

    // Steps handlers 

    const firstStepHandler = () => {
        emailsContainer.classList.add('mb-3');
        passwordsContainer.classList.remove('hide-first-step');
        buttonsContainer.classList.remove('hide-first-step');
        submitFormButton.innerHTML = `Register me!`;
        emailsContainer.querySelector('input').classList.add('input-filled');
        emailsContainer.querySelector('input').setAttribute('disabled', 'disabled');
        checkSubmitButton();
        setStep('second-step');
    }

    const backToFirstStepHandler = () => {
        emailsContainer.classList.remove('mb-3');
        passwordsContainer.classList.add('hide-first-step');
        buttonsContainer.classList.add('hide-first-step');
        emailsContainer.querySelector('input').classList.remove('input-filled');
        emailsContainer.querySelector('input').removeAttribute('disabled', 'disabled');
        submitFormButton.innerHTML = `Continue`;
        submitFormButton.removeAttribute('disabled', 'disabled');
        setStep('first-step');
    }

    const checkSubmitButton = () => {
        if(document.querySelector('.capital-and-number').classList.contains('done') &&
        document.querySelector('.min-char').classList.contains('done') &&
        document.querySelector('.pass-equal').classList.contains('done')){
            submitFormButton.removeAttribute('disabled', 'disabled');
        } else {
            submitFormButton.setAttribute('disabled', 'disabled');
        }
        submitFormButton.removeAttribute('disabled', 'disabled');
    }

    const registerHandler = async (e) => {
        e.preventDefault(e);
        if(isValidEmail(form.email) && step === 'first-step'){
            firstStepHandler();
            document.querySelector('.register-password').addEventListener('input', (e)=>{
                if(e.target.value !== ''){
                    if((e.target.value).match(/[A-Z]/) && (e.target.value).match(/[0-9]/)){
                        document.querySelector('.capital-and-number').classList.add('done');
                    }
                    else{
                        document.querySelector('.capital-and-number').classList.remove('done');
                    }
    
                    if((e.target.value).length >= 6 ){
                        document.querySelector('.min-char').classList.add('done');
                    }
                    else{
                        document.querySelector('.min-char').classList.remove('done');
                    }

                    if(e.target.value === document.querySelector('.register-repeat-password').value){
                        document.querySelector('.pass-equal').classList.add('done');
                    }
                    else{
                        document.querySelector('.pass-equal').classList.remove('done');
                    }
                    checkSubmitButton();
                }
            })
            document.querySelector('.register-repeat-password').addEventListener('input', (e)=>{
                if(e.target.value !== ''){
                    if(e.target.value === document.querySelector('.register-password').value){
                        document.querySelector('.pass-equal').classList.add('done');
                    }
                    else{
                        document.querySelector('.pass-equal').classList.remove('done');
                    }
                    checkSubmitButton();
                }
            })
        }
        if (isValidEmail(form.email) && step === 'second-step') {
            const data = await request('/register', 'POST', {...form });
            if(data){
                const data = await request('/login', 'POST', {...form});
                if(data){
                    auth.login(data.token, data.userId);
                }
            }
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
                    <ul className="register-password__validation">
                        <li className='min-char'>
                            Minimum characters 6
                        </li>
                        <li className='capital-and-number'>    
                            At least one capital letter and number
                        </li>
                        <li className='pass-equal'>    
                            Passwords equal
                        </li>
                    </ul>
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