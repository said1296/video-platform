import React, { useState } from 'react' 
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const Navigation = () => {
   const { theme, general } = useSelector(state => state);
   const dispatch = useDispatch();
   const [collapse, setCollapse] = useState(false);

   
   return (
      <Container collapse={general.collapse} theme={theme}>
            <Collapse collapse={general.collapse} theme={theme} width="24" height="24" viewBox="0 0 24 24" onClick={() => dispatch({type: 'TOGGLE_COLLAPSE'})}>
               <path d="M15.705 16.59L11.125 12L15.705 7.41L14.295 6L8.29498 12L14.295 18L15.705 16.59Z"/>
            </Collapse>
            <Login to='/auth' onClick={() => {dispatch({type: 'TOGGLE_COLLAPSE'});}} theme={theme}>Login</Login>
            <Button className="home" to='/' theme={theme}> Home </Button>
            <Button className="about" to='/about' theme={theme}> About </Button>
            <Logotype height="7vh" viewBox="0 0 50 58" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M1.24 12.68V3.032L5.416 0.619998H13.804L17.98 3.032V6.74H14.38V3.86H4.84V11.492H13.804L17.98 13.904V23.768L13.804 26.18H5.056L0.88 23.768V20.06H4.48V22.94H14.38V15.092H5.416L1.24 12.68Z" fill="#F78AFA"/>
                  <path d="M31.6431 14.66V26H28.0431V0.799998H31.6431V11.42H43.7031V0.799998H47.3031V26H43.7031V14.66H31.6431ZM43.8859 58V52.6H49.2859V58H43.8859ZM45.1459 48.352L44.2099 31.72H48.9619L48.0259 48.352H45.1459Z" fill="#00FFCC"/>
               <path d="M4.84 46.66V58H1.24V32.8H4.84V43.42H16.9V32.8H20.5V58H16.9V46.66H4.84Z" fill="#A1BDFF"/>
            </Logotype>
      </Container>
   );
}

const Button = styled(Link)`
   display: flex;
   align-items: center;
   justify-content: center;

   width:100%;
   height: 100%;
   text-decoration: none;
   font-family: ${props => props.theme.fontPrimary};
   font-size: 17px;
   color: ${props => props.theme.offWhite};
   min-height: 50px;
   -webkit-transition:  background-color 0.5s;
   -moz-transition:    background-color 0.5s;
   -ms-transition:     background-color 0.5s;
   -o-transition:      background-color 0.5s;
   transition:         background-color 0.5s;
`

const Collapse = styled.svg `
   transition: 0.5s;
   cursor: pointer;
   position:absolute;
   bottom:10px;
   ${props => (props.collapse) ? "right: -30px; transform: rotate(180deg)" : "right: 2px"};
   path{
      fill: ${props => props.theme.offWhite}
   }
`

const Container = styled.div`
   z-index: 1;
   transition: 0.5s;
   position:fixed;
   float:left;
   top:0px;
   left:0p;
   min-width: 150px;
   min-height: 700px;
   width: ${props => (props.collapse) ? "10%" : "10%"};
   height: 100%;
   background-color: ${props => props.theme.lightGray};
   letter-spacing: 1em;

   display: grid;
   grid-auto-flow: column;
   grid-template-rows: repeat(20, 1fr);
   justify-items: center;
   align-items: center;

   ${props => {
      if(props.collapse){
         console.log(props.collapse);
         return "transform: translate(-100%);"
      }
   }}

   .home{
      grid-row: 9;
      :hover{
         background-color: ${props => props.theme.primary};
      }
   }

   .about{
      :hover{
         background-color: ${props => props.theme.secondary};
      }
   }
`

const Logotype = styled.svg   `
   grid-row: 19;
`
const Login = styled(Link)`
   grid-row: span 2;
   min-height:30px;
   min-width: 80px;
   height: 40%;
   width: 50%;

   margin-top:40px;
   font-family: ${props => props.theme.fontPrimary};
   font-size: 15px;
   @media (min-width: 1140px) {
         font-size: 18px;
   }
   letter-spacing: 0.2em;
   cursor: pointer;
   background-color: ${props => props.theme.pink};
   text-decoration: none;
   color:${props => props.theme.lightGray};
   border: none;
   border-radius: 6px;

   display: flex;
   align-items: center;
   justify-content: center;

   :hover{
      filter: brightness(0.9);
   }
`
 
export default Navigation;