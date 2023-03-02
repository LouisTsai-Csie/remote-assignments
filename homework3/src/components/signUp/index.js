import React, { useState } from 'react';
import axios from 'axios';
import {
    Container, 
    SignUpWrapper,
    NameInputWrapper,
    EmailInputWrapper,
    PasswordInputWrapper,
    SignUpButtonWrapper,
    DataDisplayWrapper,
} from './style';


const SignUp = () => {
    const [name, setName]  = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayText, setDisplayText] = useState('o');

    async function UserSignUp() {
        try {
            const response = await axios({
                method: 'post',
                url: 'http://35.73.169.207:4000/users',
                headers: {
                    'Content-Type': 'application/json',
                    'Request-Date': `${new Date().toUTCString()}`
                },
                data: {
                    name: name,
                    email: email,
                    password: password
                }
            });
            setDisplayText(JSON.stringify(response.data.data.user));
        }
        catch (error) {
            setDisplayText(error.response.data);
        }
        return;
    }

    return (
        <div>
            <Container>
                <SignUpWrapper>
                    <NameInputWrapper>
                        <p className="name">name: </p>
                        <input className="nameInput" onChange={(e)=>{setName(e.target.value)}}/>
                    </NameInputWrapper>
                    <EmailInputWrapper>
                        <p className="email">email: </p>
                        <input className="emailInput" type="email" onChange={(e)=>{setEmail(e.target.value)}}/>
                    </EmailInputWrapper>
                    <PasswordInputWrapper>
                        <p className="password">password: </p>
                        <input className="passwordInput" type="password" onChange={(e)=>{setPassword(e.target.value)}}/>
                    </PasswordInputWrapper>    
                    <SignUpButtonWrapper>
                        <button className="signup" onClick={()=>{UserSignUp()}}>Sign Up</button>
                    </SignUpButtonWrapper>
                    <DataDisplayWrapper>
                        <p className="responseData">{displayText}</p>
                    </DataDisplayWrapper>
                </SignUpWrapper>
            </Container>
        </div>
    )
}

export default SignUp;