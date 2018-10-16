import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import { OperationHelper } from "apac";
import "isomorphic-fetch";

const initialState = {
  stuff: [],
  lookup: []
};

export const actionTypes = {
  FETCH_STUFF: "FETCH_STUFF",
  RECEIVE_STUFF: "RECEIVE_STUFF",
  UPDATE_STUFF: "UPDATE_STUFF"
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
    default:
      return state;
  }
};

// ACTIONS
export const receiveStuff = json => {
  return { type: actionTypes.RECEIVE_STUFF, stuff: json, lookup: [] };
};

export const updateLookup = (stuffProps, lookupProps) => {
  return {
    type: actionTypes.UPDATE_STUFF,
    stuff: stuffProps,
    lookup: lookupProps
  };
};

export const updateProps = (stuffProps, lookupProps) => {
  return async dispatch => {
    await dispatch(updateLookup(stuffProps, lookupProps));
  };
};

export const fetchStuff = termino => {
  return async dispatch => {
    console.log("termino ", termino);
    const searchResAm = await fetch(
      `http://localhost:3030/api/am-item-search/?searchTerm=${termino}`
    );
    const searchJsonAm = await searchResAm.json();
    // const resWm = await fetch(`http://localhost:3030/wm?term=${termino}`);
    // const jsonWm = await resWm.json();
    const searchResult = await dispatch(receiveStuff(searchJsonAm));
  };
};

export const lookupStuff = termino => {
  return async dispatch => {
    console.log("termino ", termino);
    const lookupResAm = await fetch(
      `http://localhost:3030/api/am-item-lookup?itemId=${termino}`
    );
    const lookupJsonAm = await lookupResAm.json();
    // const resWm = await fetch(`http://localhost:3030/wm?term=${termino}`);
    // const jsonWm = await resWm.json();
    const lookupResult = await dispatch(receiveStuff([lookupJsonAm]));
  };
};

export function initializeStore(initialState = initialState) {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
}
