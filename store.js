import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

const initialState = {
  stuff: [],
	lookup: [],
	userLists: []
	
};

export const actionTypes = {
  FETCH_STUFF: "FETCH_STUFF",
  RECEIVE_STUFF: "RECEIVE_STUFF",
  UPDATE_STUFF: "UPDATE_STUFF",
  FETCH_LOOKUP: "FETCH_LOOKUP",
  RECEIVE_LOOKUP: "RECEIVE_LOOKUP",
	UPDATE_LOOKUP: "UPDATE_LOOKUP",
	RECEIVE_LISTS_STUFF: "RECEIVE_LISTS_STUFF"
};

// REDUCERS
export const reducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case actionTypes.FETCH_STUFF:
      return action;
    case actionTypes.RECEIVE_STUFF:
      newState = action;
      // console.log("RECEIVE_STUFF Action ", newState);
      return newState;
    case actionTypes.UPDATE_STUFF:
      newState = action;
      return newState;
    case actionTypes.FETCH_LOOKUP:
      return action;
    case actionTypes.RECEIVE_LOOKUP:
      newState = action;
      return newState;
    case actionTypes.UPDATE_LOOKUP:
      newState = action;
			return newState;
			case actionTypes.RECEIVE_LISTS_STUFF:
      newState = action;
      return newState;
    default:
      return state;
  }
};

export const reducerLookup = (state = initialState.lookup, action) => {
  let newState;
  switch (action.type) {
    case actionTypes.FETCH_LOOKUP:
      return action;
    case actionTypes.RECEIVE_LOOKUP:
      newState = action;
      return newState;
    case actionTypes.UPDATE_LOOKUP:
      newState = action;
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

export const receiveListsStuff = json => {
	return {
		type: actionTypes.RECEIVE_LISTS_STUFF,
		userLists: json,
		stuff: initialState.stuff,
		lookup: initialState.lookup
	}
}

export const receiveupdateListStuff = (json, userListProps) => {
  return { 
		type: actionTypes.RECEIVE_LOOKUP, 
		lookup: json,
		userLists: userListProps,
		stuff: initialState.stuff

	};
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
    const searchResAm = await fetch(
      `http://localhost:3030/api/am-item-search-multipage/?searchTerm=${termino}`
    );
    const searchJsonAm = await searchResAm.json();
    const searchResult = await dispatch(
      receiveSearchStuff(searchJsonAm, lookupProps)
    );
  };
};

export const fetchLists = (userId) => {
	return async dispatch => {
		const getLists = await fetch(
			`http://localhost:3030/api/get-list/?usrId=${userId}`
		);
		const listsJson = await getLists.json();
		await dispatch(
			receiveListsStuff(listsJson)
		);
	}
}

export const updateListStuff = (termino, userListProps) => {
  return async dispatch => {
    console.log("termino ", termino);
    const updateResAm = await fetch(
      `http://localhost:3030/api/am-item-lookup-asin?itemId=${termino}`
    );
    const updateJsonAm = await updateResAm.json();

    await dispatch(
			receiveupdateListStuff([updateJsonAm], userListProps));
  };
};

export function initializeStore(initialState = initialState) {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
}
