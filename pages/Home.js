import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Cards from "./components/Cards.js";
import Header from "./components/Header.js";

import { SearchProvider } from "./components/contexts.js";

function Home(props) {
    const { general, theme } = useSelector(state => state);

    return (
        <Container collapse={general.collapse} theme={theme}>
            <SearchProvider>
                <Header />
                <Cards />
            </SearchProvider>
        </Container>
    )
}

const Container = styled.div`
    position:absolute;
    right:0px;
    ${props => (props.collapse) ? "width: 100%" : "width: 90%;"};
    height:100vh;
    background: ${props => props.theme.darkGray};
    overflow: auto;
    font-family: ${props => props.theme.fontPrimary};
    color: ${props => props.theme.offWhite};
`

export default Home;