import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';

import { useDispatch } from 'react-redux';
import FormRegister from './components/FormRegister';
import FormLogin from './components/FormLogin';

function Auth(props) {
    const { general, theme } = useSelector(state => state);
    const [action, setAction] = useState(0);

    function switchAuthType(){
        switch(action){
            case 0:
                return <FormLogin setAction={setAction}/>
            case 1:
                return <FormRegister setAction={setAction}/>
        }
    }

    function switchCssAuthType(){
        switch(action){
            case 0:
                return "width: 50%; height: 60%;"
            case 1:
                return "width: 70%; height: 80%;"
        }
    }

    return (
        <Container collapse={general.collapse} theme={theme}>
            <Card theme={theme} CssAuthType={switchCssAuthType}>
                {switchAuthType()}
            </Card>
        </Container>
    )
}

const Container = styled.div`
    position:absolute;
    right:0px;
    float:right;
    display:flex;
    transition: 300ms;
    width: ${props => (props.collapse) ? "100%" : "90%;"};
    height:100vh;
    background: ${props => props.theme.darkGray};
    background: url("./static/imgs/bgRegister.jpg");
    background-size: cover;
    overflow: auto;
    font-family: ${props => props.theme.fontPrimary};
    color: ${props => props.theme.offWhite};

    input {
        background-color: ${props => props.theme.offWhite};
        border: none;
        border-radius: 10px;
        color: ${props => props.theme.darkGray};
        padding-left: 10px;
        padding-right: 10px;
    }

    .error {
        padding:0;
        color: ${props => props.theme.primary};
        font-size: 16.5px;
    }
`

const Card = styled.div `
    transition: 0.1s;
    opacity: 0.90;
    position: relative;
    margin: auto;
    ${props => props.CssAuthType}
    min-height: 450px;
    border: 1px solid ${props => props.theme.offWhite};
    border-radius: 29px;
    background-color: ${props => props.theme.lightGray};
    box-shadow: 5px 15px 4px ${props => props.theme.teal};
`

export default Auth;