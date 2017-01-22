import React from "react";
import { Router, Route, IndexRoute } from "react-router";
import { history } from "./store.js";
import App from "./components/App";
import MainContainer from "./containers/MainContainer";
import OrderPageContainer from "./containers/OrderPageContainer";
import UserOrdersContainer from "./containers/UserOrdersContainer";


// build the router
const router = (
  <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={MainContainer}/>
      <Route path="orders/:id" component={OrderPageContainer}/>
      <Route path="orders/my" component={UserOrdersContainer}/>
    </Route>
  </Router>
);

// export
export { router };
