import { createStore, applyMiddleware, compose } from "redux";
import { browserHistory } from "react-router";
import { syncHistoryWithStore, routerMiddleware } from "react-router-redux";
import { reducers } from "./reducers/index";
import { promiseMiddleware, localStorageMiddleware } from './api/client';
import createLogger from 'redux-logger';


const middlewareChain = (() => {
  let middlewares = [routerMiddleware(browserHistory), promiseMiddleware, localStorageMiddleware];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger({collapsed: true, duration: true}));
  }

  // apply the middleware
  let middleware = applyMiddleware(...middlewares);

  // add the redux dev tools
  if (process.env.NODE_ENV !== 'production' && window.devToolsExtension) {
    middleware = compose(middleware, window.devToolsExtension());
  }

  return middleware;
})();

// create the store
const store = createStore(reducers, middlewareChain);
const history = syncHistoryWithStore(browserHistory, store);

// export
export { store, history };
