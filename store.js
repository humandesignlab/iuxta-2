import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import { OperationHelper } from "apac";

const initialState = {
  stuff: [],
  lookup: []
};

export const actionTypes = {
  FETCH_STUFF: "FETCH_STUFF",
  RECEIVE_STUFF: "RECEIVE_STUFF",
  UPDATE_STUFF: "UPDATE_STUFF",
  FETCH_LOOKUP: "FETCH_LOOKUP",
  RECEIVE_LOOKUP: "RECEIVE_LOOKUP",
  UPDATE_LOOKUP: "UPDATE_LOOKUP"
};

// REDUCERS
export const reducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case actionTypes.FETCH_STUFF:
      console.log("FETCH_STUFF Action");
      return action;
    case actionTypes.RECEIVE_STUFF:
      newState = action;
      console.log("RECEIVE_STUFF Action ", newState);
      return newState;
    case actionTypes.UPDATE_STUFF:
      newState = action;
      console.log("UPDATE_STUFF Action ", newState);
      return newState;
    case actionTypes.FETCH_LOOKUP:
      console.log("FETCH_LOOKUP Action");
      return action;
    case actionTypes.RECEIVE_LOOKUP:
      newState = action;
      console.log("RECEIVE_LOOKUP Action ", newState);
      return newState;
    case actionTypes.UPDATE_LOOKUP:
      newState = action;
      console.log("UPDATE_LOOKUP Action ", newState);
      return newState;
    default:
      return state;
  }
};

export const reducerLookup = (state = initialState.lookup, action) => {
  let newState;
  switch (action.type) {
    case actionTypes.FETCH_LOOKUP:
      console.log("FETCH_LOOKUP Action");
      return action;
    case actionTypes.RECEIVE_LOOKUP:
      newState = action;
      console.log("RECEIVE_LOOKUP Action ", newState);
      return newState;
    case actionTypes.UPDATE_LOOKUP:
      newState = action;
      console.log("UPDATE_LOOKUP Action ", newState);
      return newState;
    default:
      return state;
  }
};

// ACTIONS
export const receiveSearchStuff = (jsonStuff, jsonLookup) => {
  return {
    type: actionTypes.RECEIVE_STUFF,
    stuff: jsonStuff,
    lookup: jsonLookup
  };
};

export const receiveLookupStuff = json => {
  return { type: actionTypes.RECEIVE_LOOKUP, lookup: json };
};

export const updateLookup = (lookupProps, stuffProps) => {
  return {
    type: actionTypes.UPDATE_LOOKUP,
    lookup: lookupProps,
    stuff: stuffProps
  };
};

export const updateLookupProps = (lookupProps, stuffProps) => {
  return async dispatch => {
    await dispatch(updateLookup(lookupProps, stuffProps));
  };
};

export const fetchStuff = (termino, lookupProps) => {
  return async dispatch => {
    console.log("termino ", termino);
    const searchResAm = await fetch(
      `http://localhost:3030/api/am-item-search/?searchTerm=${termino}`
    );
    const searchJsonAm = await searchResAm.json();
    // const resWm = await fetch(`http://localhost:3030/wm?term=${termino}`);
    // const jsonWm = await resWm.json();
    const searchResult = await dispatch(
      receiveSearchStuff(searchJsonAm, lookupProps)
    );
  };
};

export const fetchSimilarityLookupStuff = (termino, lookupProps) => {
  return async dispatch => {
    console.log("termino ", termino);
    const searchResAm = await fetch(
      `http://localhost:3030/api/am-item-similarity-lookup/?itemId=${termino}`
    );
    const searchJsonAm = await searchResAm.json();

    const searchResult = await dispatch(
      receiveSearchStuff(searchJsonAm, lookupProps)
    );
  };
};

export const lookupStuff = termino => {
  return async dispatch => {
    console.log("termino ", termino);
    const lookupResAm = await fetch(
      `http://localhost:3030/api/am-item-lookup-csv?itemId=${termino}`
    );
    const lookupJsonAm = await lookupResAm.json();

    const lookupResult = await dispatch(receiveLookupStuff([lookupJsonAm]));
  };
};

export function initializeStore(initialState = initialState) {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
}
