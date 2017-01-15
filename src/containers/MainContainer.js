import React from "react";
import MainPage from "../components/Main/MainPage";
import OrderListContainer from './OrderListContainer';
import CategoriesListContainer from './CategoriesListContainer';


export default class MainContainer extends React.Component {
  render() {
    return (
      <div>
        <MainPage/>
        <section className="container">
          <div className="row">
            <div className="col-md-9 col-sm-12">
              <OrderListContainer/>
            </div>
            <div className="col-md-3">
              <CategoriesListContainer/>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
