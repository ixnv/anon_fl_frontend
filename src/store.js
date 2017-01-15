import { createStore, applyMiddleware, compose } from "redux";
import { browserHistory } from "react-router";
import { syncHistoryWithStore, routerMiddleware } from "react-router-redux";
import freeze from "redux-freeze";
import { reducers } from "./reducers/index";
import { promiseMiddleware } from './api/client';


let middlewareChain = (() => {
  let middlewares = [];

  // add the router middleware
  middlewares.push(routerMiddleware(browserHistory));
  // add the promise middleware
  middlewares.push(promiseMiddleware);

  // add the freeze dev middleware
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(freeze);
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
