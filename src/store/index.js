import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import subscribe from './subscriptions';
import globalReducer from './reducers/global';
import homePageReducer from './reducers/home-page';

const rootReducer = combineReducers({
  global: globalReducer,
  homePage: homePageReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware()),
);

if (window !== undefined && process.env.NODE_ENV === 'development') {
  window['store'] = store;
}

subscribe(store);

export default store;
