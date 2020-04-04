import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';

import { useDispatch } from 'react-redux';


const LoginForm = props =>{
    const [fade, setFade] = useState(undefined);
    const [error, setError] = useState(false);
    const { general, theme } = useSelector(state => state);

    useEffect(() => {
        setFade(false);
        return () => {
        }
    }, [])

    function handleSubmit(e){
        e.preventDefault();

        const user = document.forms['login']['user'].value;
        const password = document.forms['login']['password'].value;

        console.log(user,password);

        if(!user){
            setError("No user provided");
        }else if(!password){
            setError("No password provided");
        }else{
            (async() => {
                try{
                    const response = await axios({
                        url: `${general.baseURL}/api/login`,
                        method: `POST`,
                        data: {
                            user: user,
                            password: password
                        }
                    });
                    setError(false);
                } catch(err){
                    console.log(err);
                    setError(err.response.data.error)
                    throw err;
                }
            })();
        }
    }

    console.log(fade);

  return(
    <Form fade={fade} name="login" onSubmit={handleSubmit} onTransitionEnd={()=>(fade) ? props.setAction(1) : null}>
      <LoginError className="error" theme={theme}>{error}</LoginError>
      <User name='user' heme={theme} placeholder="USERNAME / E-MAIL" onChange={e => {e.target.value = e.target.value.replace(/[ ,/?¿`¡{}[\]]/g,'')}} />
      <Password name='password' type="password" theme={theme} placeholder="PASSWORD" />
      <Login theme={theme}> Login </Login>
      <Register theme={theme} onClick={()=>setFade(true)}>REGISTER</Register>
    </Form>
  )
}

const Register = styled.div `
    display:block;
    text-align: center;
    cursor: pointer;
    width: 25%;
    margin-top: 1vh;
    margin-left:37.5%;
    font-size: 25px;
    color: ${props => props.theme.primary};

    :hover{
         filter: brightness(0.9);
    }
`

const Form = styled.form `
    opacity: ${props=>{
        if(props.fade==undefined || props.fade){
            return "0"
        }
        else{
            return "1";
        }
    }};
    transition: opacity 0.1s;
    transition-delay: ${props=>(props.fade==false) ? "0.1s" : null};
    input{
        text-align:center;
        font-size:2vh;
        display: block;
        height: 6vh;
        min-height: 50px;
        width: 50%;
        margin-left: 25%;
    }
`

const LoginError = styled.div `
    margin-top: 11vh;
    display:block;
    text-align:center;
    min-height: 30px;
`

const Login = styled.button `
    display:block;
    cursor: pointer;
    width: 25%;
    min-height: 60px;
    height: 9vh;
    margin-top:7vh;
    margin-left:37.5%;
    font-size: 30px;
    background-color: ${props => props.theme.pink};
    color: ${props => props.theme.darkGray};
    border: none;
    border-radius: 10px;

    :hover{
         filter: brightness(0.9);
    }
`

const User = styled.input `
    margin: 1vh;
    box-shadow: ${props => (props.error) ? "-10px 0px 2px 0px" + props.theme.primary : "none"};
`

const Password = styled.input `
    margin-top:2vh;
    box-shadow: ${props => (props.error) ? "-10px 0px 2px 0px" + props.theme.primary : "none"};
`

export default LoginForm;