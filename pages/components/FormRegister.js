import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';

import { useDispatch } from 'react-redux';


const FormRegister = props =>{
  const [fade, setFade] = useState(undefined);
  const [errors, setErrors] = useState({ user: undefined, password: undefined, birthday: undefined, name: undefined });
  const [submission, setSubmission] = useState({});
  const { general, theme } = useSelector(state => state);

    useEffect(() => {
        setFade(false);
        return () => {
        }
    }, [])

  function handleSubmit(e){
    e.preventDefault();

    Object.keys(errors).map(key => {
        if(errors[key]==undefined){
            setErrors(prevState => {return {... prevState, [key]: "Required field" }});
        }
    })

    if(!Object.keys(errors).some(k => errors[k]!=false)){
        (async() => {
            try{
                const response = await axios({
                    url: `${general.baseURL}/api/register`,
                    method: `POST`,
                    data: submission,
                });
            } catch(err){
                throw err;
            }
        })();
    }
}

  function checkPassword(e){
        const fieldValue = e.target.value;
        if(!fieldValue){
            setErrors(prevState => {
                return {... prevState, password: undefined};
            })
        }else if(fieldValue.length<8){
            setErrors(prevState => {
                return {... prevState, password: "Must have at least 8 characters"};
            })
        }else if(/\s/.test(fieldValue)){
            setErrors(prevState => {
                return {... prevState, password: "Can't contain blank spaces"};
            })
        }else if(!/\d/.test(fieldValue)){
            setErrors(prevState => {
                return {... prevState, password: "Must contain at least one number"};
            })
        }else{
            setErrors(prevState => {
                return {... prevState, password: false};
            })
            setSubmission(prevState => {
                return {... prevState, password: fieldValue};
            })
        }
    }

    function checkUser(e){
        const fieldValue = e.target.value;
        if(!fieldValue){
            e.target.value="";
            setErrors(prevState => {
                return {... prevState, user: undefined};
            })
        }else if(fieldValue.length<8){
            setErrors(prevState => {
                return {... prevState, user: "Must have at least 8 characters"};
            })
        }else{
            setErrors(prevState => {
                return {... prevState, user: false};
            })
            setSubmission(prevState => {
                return {... prevState, user: fieldValue};
            })
        }
    }

    function checkName(e){
        const fieldValue = e.target.value;
        if(fieldValue.replace(/\s/g, '').length == 0){
            e.target.value="";
            setErrors(prevState => {
                return {... prevState, name: undefined};
            })
        }else if (fieldValue.trim().replace(/ {2,}/g, ' ').split(" ").length < 2)
        {
            setErrors(prevState => {
                return {... prevState, name: "Must provide at least 1 name and 1 lastname"};
            })
        } else {
            setErrors(prevState => {
                return {... prevState, name: false};
            })
            setSubmission(prevState => {
                return {... prevState, name: fieldValue};
            })
        }
    }

    function checkBirthday(e, calendar=false){

        var year, month, day = null;
        if(calendar==true){
            [year, month, day] = document.forms["register"]["calendar"].value.split("-");
            document.forms["register"]["day"].value = day;
            document.forms["register"]["month"].value = month;
            document.forms["register"]["year"].value = year;
        }else{
            day = document.forms["register"]["day"].value;
            month = document.forms["register"]["month"].value;
            year = document.forms["register"]["year"].value;
            document.forms["register"]["calendar"].value = year+"-"+month+"-"+day;
        }

        var birthday = {
            day: day,
            month: month,
            year: year
        }

        if(!birthday.day || !birthday.month || !birthday.year){
            return;
        }else if(birthday.day>31 || birthday.day<1){
            setErrors(prevState => {
                return {... prevState, birthday: "Pick a valid day"};
            })
        }else if(birthday.month>12 || birthday.month<1){
            setErrors(prevState => {
                return {... prevState, birthday: "Pick a valid month"};
            })        
        }else if(birthday.year.length<4 || /^0.*/.test(birthday.year)){
            setErrors(prevState => {
                return {... prevState, birthday: "Pick a year in the format YYYY"};
            })
        }else{
            const bd = new Date(birthday.year,birthday.month-1,birthday.day,0,0,0);
            const ageDate = new Date(new Date() - bd);
            const age = ageDate.getFullYear()-1970;
            if(age<18 && age>=0){
                setErrors(prevState => {
                    return {... prevState, birthday: "Must be at least 18 years old"};
                })
            }else if(age>119 || age<0){
                setErrors(prevState => {
                    return {... prevState, birthday: "Impossible birthday"};
                }) 
            }else{
                setErrors(prevState => {
                    return {... prevState, birthday: false};
                })
                setSubmission(prevState => {
                    return {... prevState, birthday: new Date(Date.UTC(birthday.year,birthday.month-1,birthday.day,0,0,0))};
                })
            }
        }
    }

    function purgeDate(e,chars){
        e.target.value=e.target.value.replace(/[^0-9]/g, '');
        if(e.target.value.length > chars){
            e.target.value = e.target.value.substring(0,chars);
        }
    }

  return(
    <Form name="register" onSubmit={handleSubmit} fade={fade} onTransitionEnd={()=>(fade) ? props.setAction(0) : null}>
      <Title theme = {theme}> Register </Title>
      <User error={errors.user} theme={theme} placeholder="USERNAME" onChange={e => {e.target.value = e.target.value.replace(/[ ,/?¿`¡{}[\]]/g,'')}} onBlur={checkUser}/>
      <Password type="password" error={errors.password} theme={theme} placeholder="PASSWORD" onBlur={checkPassword}/>
      <UserError className="error" theme={theme}>{errors.user}</UserError>
      <PasswordError className="error" theme={theme}>{errors.password}</PasswordError>
      <Birthday>
          <Day error={errors.birthday} name="day" theme={theme} id="day" placeholder="DD" onChange={e => {purgeDate(e, 2); if(e.target.value.length==2){document.getElementById("month").focus()}}} onBlur={checkBirthday} />
          <Month name="month" theme={theme} id="month" placeholder="MM" onChange={e => {purgeDate(e, 2);if(e.target.value.length==2){document.getElementById("year").focus()}}} onBlur={checkBirthday} />
          <Year name="year" theme={theme} id="year" placeholder="YYYY" onChange={e => {purgeDate(e, 4); if(e.target.value.length==4){checkBirthday()}}} onBlur={checkBirthday} onKeyDown={e => {if(e.key=="Tab"){e.preventDefault(); document.forms['register']["name"].focus()}}} />
          <label>
              <input onChange={e => checkBirthday(e, true)} min="1900-01-01" name="calendar" type="date" style={{width:"0", height: "0vh",padding:"0"}}>   
              </input>
              <IconDiv>
                  <CalendarIcon error={errors.birthday} theme={theme} height="100%" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M30 6.66667H31.6667C33.5 6.66667 35 8.16667 35 10V33.3333C35 35.1667 33.5 36.6667 31.6667 36.6667H8.33333C6.48333 36.6667 5 35.1667 5 33.3333L5.01667 10C5.01667 8.16667 6.48333 6.66667 8.33333 6.66667H10V3.33333H13.3333V6.66667H26.6667V3.33333H30V6.66667ZM8.33333 33.3333H31.6667V16.6667H8.33333V33.3333ZM31.6667 13.3333H8.33333V10H31.6667V13.3333ZM20 21.6667H28.3333V30H20V21.6667Z" />
                  </CalendarIcon>
              </IconDiv>  
          </label>
          <BirthdayError className="error"> {errors.birthday} </BirthdayError>
      </Birthday>
      <Name id="name" error={errors.name} theme={theme} placeholder="FULL NAME" onBlur={checkName} />
      <NameError className="error" theme={theme}>{errors.name}</NameError>
      <Login theme={theme} onClick={()=>setFade(true)}>LOGIN</Login>
      <Next theme={theme}> NEXT </Next>
    </Form>
  )
}

const Login = styled.div `
    display:inline-block;
    cursor: pointer;
    margin-left: 10%;
    margin-top: 15vh;
    font-size: 25px;
    color: ${props => props.theme.primary};
    width: 25%;
    text-align:center;

    :hover{
         filter: brightness(0.9);
    }
`

const Next = styled.button `
    display:inline-block;
    cursor: pointer;
    width: 25%;
    margin-left: 30%;
    min-height: 60px;
    height: 9vh;
    font-size: 30px;
    background-color: ${props => props.theme.pink};
    color: ${props => props.theme.darkGray};
    border: none;
    border-radius: 10px;

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
    input {
        height: 4.5vh;
        min-height: 30px;
    }
`

const BirthdayError = styled.div `
    display: inline-block;
    width: 35%;
    margin-left: 2%;
`

const UserError = styled.div `
    display: inline-block;
    width: 35%;
    margin-left: 11%;
`

const PasswordError = styled.div `
    display:inline-block;
    margin-left: 10%;
    width: 35%;
`

const NameError = styled.div `
    display:block;
    margin-left: 10%;
    width: 35%;
`

const User = styled.input `
    width: 35%;
    margin-right: 10%;
    margin-left:10%;
    box-shadow: ${props => (props.error) ? "-10px 0px 2px 0px" + props.theme.primary : "none"};
`

const Password = styled.input `
    width: 35%;
    box-shadow: ${props => (props.error) ? "-10px 0px 2px 0px" + props.theme.primary : "none"};
`

const IconDiv = styled.div `
    min-height: 30px;
    height: 4.5vh;
    display: inline-block;
    vertical-align: middle;
    margin-bottom: 0.5%;
`

const Birthday = styled.div `
    margin:0;
    padding:0;
    margin-left: 10%;
    margin-top: 5vh;
`

const Day = styled.input `
    margin-right: 2%;
    min-width: 45px;
    width: 4.3%;
`

const Month = styled.input `
    margin-right: 2%;
    min-width: 45px;
    width: 4.3%;
`

const Year = styled.input `
    margin-right: 3%;
    min-width:58px;
    width: 5.5%;
`

const CalendarIcon = styled.svg `
    cursor: pointer;
    transform: scale(1.2);
    display: inline-block;
    path {
        ${props => {
            if(props.error){
                return `fill: ${props.theme.primary}; filter: drop-shadow(0px 0px 3px ${props.theme.primary})`;
            }else{
                return "fill: "+props.theme.midGray;
            }
        }};
        
    }
`

const Name = styled.input `
    display:block;
    width: 80%;
    margin-left: 10%;
    margin-top: 5vh;
    box-shadow: ${props => (props.error) ? "-10px 0px 2px 0px" + props.theme.primary : "none"};
`

const Title = styled.p `
    text-align: center;
    font-size: 48px;
    margin-bottom: 8vh;
    margin-top: 8vh;
`

export default FormRegister;