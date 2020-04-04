import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { CardContext } from './contexts.js';

function Card(props) {
  const { theme } = useSelector(state => state);

  const [values, setValues] = useState(props.values);
  const [info, setInfo] = useState(false);
  const [over, setOver] = useState(false);
  const [flipping, setFlipping] = useState(false);
  const [play, setPlay] = useState(false);
  const [activated, setActivated] = useState(0);
  const [context, setContext] = useContext(CardContext);

  if(!flipping && context.activated && info && activated==1){
    setFlipping(true);
    setPlay(false);
  }

  var videoRender="";
  var states = {info: info, over: over, flipping: flipping, theme: theme, id: props.id};
  var videoStates = {user: values.user.id, id: values._id}

  if(play){
    videoRender =
      <Video states={states}>
        <video id={values._id} autoPlay muted>
          <source type="video/mp4" src={`../../videos/${values.user.id}/${values._id}/360.mp4`}></source>
        </video>
      </Video>
  }else{
    videoRender =""
  }

  useEffect(() => {
    setValues(props.values);
  }, [props.values])
 
  return (
    <Container video={videoStates} states={states} onMouseEnter={()=>{ if(flipping){setOver(false)}else{setOver(true); setPlay(true)} }} 
    onMouseLeave={()=>{ setOver(false); if(!flipping)setPlay(false) ;if(info){setFlipping(true); } }}
    onAnimationEnd={()=>{setFlipping(false)}}>
      {videoRender}
      <Likes states={states}>
        <LikesIcon states={states} viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.8653 0C14.6202 0 12.5147 1.79355 11.5 2.8086C10.4853 1.79355 8.37978 0 6.13474 0C2.29577 0 0 2.27527 0 6.08602C0 9.2086 2.82426 11.8194 2.92574 11.9097L10.832 19.686C11.204 20.0516 11.796 20.0516 12.168 19.686L20.0616 11.9355C20.1757 11.8194 23 9.2043 23 6.08602C23 2.27527 20.7042 0 16.8653 0Z"/>
        </LikesIcon>
        <LikesNumber states={states}>{values.likes}</LikesNumber>
      </Likes>
      <Info states={states}>
        <Title states={states} className="title">
          <span id={`title-${props.id}`}>{values.title}</span>
        </Title>
        <InfoIcon states={states} height="24" width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
        onClick={()=>{setFlipping(true);setPlay(true);setContext({activated:true}); setActivated(2)}}>
          <path d="M11 7H13V9H11V7Z" />
          <path d="M11 11H13V17H11V11Z" />
          <path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 6.48 6.47998 2 12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.47998 22 2 17.52 2 12ZM4 12C4 16.41 7.58997 20 12 20C16.41 20 20 16.41 20 12C20 7.59 16.41 4 12 4C7.58997 4 4 7.59 4 12Z" />
        </InfoIcon>
      </Info>
      <Details states={states} onAnimationEnd={()=>{setInfo(!info); if(activated==2){ setActivated(1) ; setContext({activated:false})}else{ setActivated(0)}}}>
        <Title states={states}><h3>{values.title}</h3></Title>
        <Description states={states}> {values.description} </Description>
        <Name states={states}> Name: {values.user.name} </Name>
        <Age states={states}> Age: {values.age} </Age>
      </Details>
    </Container>
  )
}

const initialWidth = 300;
const resizedWidth = 500;

const Video = styled.div `
  background-color: black;
  position:absolute;
  width: 100%;
  height: 100%;
  overflow:hidden;
  text-align:center;
  video{
    width:100%;
    height:100%;
  }

  ${props => {
    if(props.states.flipping && !props.states.info){
      return "animation: darken 2s;"
    }
  }}

  @keyframes darken {
    0%{
      filter: brightness(100%);
    }
    100%{
      filter: brightness(60%);
    }
  }

  ${props => {
    if(props.states.info){
      return "filter: brightness(60%);"
    }
  }}
`

const Container = styled.div `
  cursor: pointer;
  background: url("./videos/${props=>props.video.user+"/"+props.video.id}/thumb.jpg") center;
  background-repeat: no-repeat;
  background-size: cover;
  position:relative;
  width: ${props => (!props.states.info) ? initialWidth : resizedWidth}px;
  height: ${props => (!props.states.info) ? `calc(3px * ${initialWidth} / 4)` : `calc(3px * ${resizedWidth} / 4)`};
  background-color: ${props => props.states.theme.lightGray};
  border-radius: 10px;
  margin-top: 10px;
  margin-right:10px;
  transform: ${props => (props.states.info) ? "rotateY(-180deg)" : ""};
  animation: ${props =>{if(props.states.flipping){if(props.states.info){return 'rotateReverse 2s'}else{return "rotate 2s"}}}};
  @keyframes rotate {
    0% {
      transform: rotateY(0deg);
      width: ${initialWidth}px;
      height: ${`calc(3px * ${initialWidth} / 4)`};
    }
    100% {
      transform: rotateY(-180deg);
      width: ${resizedWidth}px;
      height: ${`calc(3px * ${resizedWidth} / 4)`};
    }
  }
  @keyframes rotateReverse {
    0% {
      transform: rotateY(-180deg);
      width: ${resizedWidth}px;
      height: ${`calc(3px * ${resizedWidth} / 4)`};
    }
    100% {
      transform: rotateY(0deg);
      width: ${initialWidth}px;
      height: ${`calc(3px * ${initialWidth} / 4)`};
    }
  }
`
const Likes = styled.div `
  position:absolute;
  top:4%;
  right: 7%;
`

const LikesIcon = styled.svg `
  float:right;
  width: 19px;
  height: auto;
  margin-right:10%;

  path{
    fill: ${props => props.states.theme.pink};
  }
`

const LikesNumber = styled.div `
  font-size: 14px;
  margin-top:80%;
  transform: ${props => (props.states.info) ? "rotateY(-180deg)" : ""};

  animation: ${props =>{if(props.states.flipping){if(!props.states.info){return 'rotateLikes 2s'}else{return "rotateLikesReverse 2s"}}}};

  @keyframes rotateLikes {
    49%{
      transform:rotateY(0deg);
    }
    50% {
      transform: rotateY(-180deg);
    }
    100% {
      transform: rotateY(-180deg);
    }
  }

  @keyframes rotateLikesReverse {
    49%{
      transform:rotateY(-180deg);
    }
    50% {
      transform: rotateY(0deg);
    }
    100% {
      transform: rotateY(0deg);
    }
  }
`

const Info = styled.div `
  display: ${props => (props.states.flipping || !props.states.info ) ? "block" : "none"};
  position:absolute;
  width:93%;
  bottom: 4%;
  left: 7%;

  animation: ${props =>{if(props.states.flipping){if(props.states.info){return 'rotateInfoReverse 2s'}else{return "rotateInfo 2s"}}}};

  @keyframes rotateInfo {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }

  @keyframes rotateInfoReverse {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`

const Title = styled.div `
  display: inline-block;
  width: ${props => (props.states.info) ? "80%" : "77%"};
  white-space: nowrap;
  overflow: hidden;
  box-sizing: border-box;

  span {
    display: inline-block;
    animation: ${ props => {
      try{
        var width = document.getElementById(`title-${props.states.id}`).clientWidth;
      }catch{
        width = 10;
      }
      if(props.states.over && width>document.getElementsByClassName('title')[0].clientWidth)
      {
        const marqueeTime = (width*3)/100;
        return `marquee ${marqueeTime}s linear infinite`;
      }
    }
    }
  }

  @keyframes marquee {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-100%, 0);
  }
}
`

const InfoIcon = styled.svg `
  cursor: pointer;
  transition: 0.3s;
  float: right;
  margin-right:7%;
  margin-top:1%;
  transform: scale(1.1);

  :hover {
    transform: scale(1.2);
  }

  path {
    fill: ${props => props.states.theme.offWhite};
  }
`
const Details = styled.div `
  display: ${props => (props.states.flipping || props.states.info ) ? "block" : "none"};
  width:100%;
  height:100%;
  margin-top:12%;
  margin-left: -7%;
  transform: rotateY(-180deg);
  animation: ${ props => (props.states.flipping) ? 'rotateDetails 2s' : ""};
  animation: ${props =>{if(props.states.flipping){if(!props.states.info){return 'rotateInfoReverse 2s'}else{return "rotateInfo 2s"}}}};
`

const Description = styled.div `
  width:85%;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 6;
`
const Name = styled.div `
  position: absolute;
  bottom: 25%;
`

const Age = styled.div `
  position: absolute;
  bottom: 20%;
`
export default Card;