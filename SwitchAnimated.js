import React from "react";
import styled from "styled-components";
import { Switch, Route, withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Home from './pages/Home';
import About from './pages/About';
import Auth from './pages/Auth'

function SwitchAnimated({location}){
  return(
    <Wrapper style={{position: "relative", zIndex: "0"}}>
      <TransitionGroup className="transition-group">
        <CSSTransition
        key={location.key}
        timeout={1000}
        classNames="slide"
        >
          <Switch location={location}>
            <Route path="/" component={Home} exact />
            <Route path="/about/" component={About} />
            <Route path="/auth/" component={Auth} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </Wrapper>
  )
}

const Wrapper = styled.div `
  float:right;
  width:100%;
  height: 100vh;
  overflow-x: hidden;

  .slide-enter {
    transform: translate(100%);
    transition: 1s;
  }

  .slide-enter-active {
    transform: translate(0%);
    transition: 1s;
  }

  .slide-exit {
    transform: translate(0%);
    transition: 1s;
  }

  .slide-exit-active {
    transform: translate(-100%);
    transition: 1s;
  }
`

export default withRouter(SwitchAnimated);