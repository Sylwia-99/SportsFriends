import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';


import reducersFollowers from './reducers/followers';

let storeFollowers = createStore(reducersFollowers, applyMiddleware(thunk));

export default storeFollowers;