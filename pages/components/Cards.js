import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

import { CardProvider, SearchContext } from './contexts';

import Card from "./Card.js";

function Cards(props) {
  const [search] = useContext(SearchContext);
    
  return (
    <Container>
      <CardProvider>
      {search.data.map((item, index) => {
          return <Card values={item} key={index} id={index} />
      })}
      </CardProvider>
    </Container>
  )
}

const Container = styled.div `
  margin-left: 5%;
  margin-right: 5%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

export default Cards;