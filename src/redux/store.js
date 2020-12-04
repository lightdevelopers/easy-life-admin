import {createStore,applyMiddleware} from 'redux';
import reduxthunk from 'redux-thunk';
import reducers from './reducers';
const store = createStore(reducers,applyMiddleware(reduxthunk));

export default store;