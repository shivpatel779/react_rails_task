import { createStore , compose , applyMiddleware } from "redux";
import thunk from "redux-thunk";
// import { compose } from 'react-apollo';


import rootReducer from "./Reducer";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(rootReducer,composeEnhancer(applyMiddleware(thunk)));
// const store = createStore(rootReducer, applyMiddleware(thunk))
// composeEnhancer(applyMiddleware(thunk))


export default store;