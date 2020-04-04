import React, { useState } from 'react';

export const CardContext = React.createContext({});

export const CardProvider = props => {
  const [context, setContext] = useState({
    activated: false
  })

  return(
    <CardContext.Provider value={[context, setContext]}>
      {props.children}
    </CardContext.Provider>
  )
};

export const SearchContext = React.createContext({});

export const SearchProvider = props => {
  const [context, setContext] = useState({
    query: "",
    data: []
  })

  return(
    <SearchContext.Provider value={[context, setContext]}>
      {props.children}
    </SearchContext.Provider>
  )
};