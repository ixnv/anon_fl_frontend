import React from "react";
import {connect} from "react-redux";
import {appLoaded} from '../actions/CommonActions';
import MainPage from "../components/Main/MainPage";
import OrderListContainer from './OrderListContainer';
import CategoriesListContainer from './CategoriesListContainer';


const mapDispatchToProps = dispatch => ({
  appLoaded: () => dispatch(appLoaded())
});

class MainContainer extends React.Component {
  componentWillMount() {
    this.props.appLoaded();
  }

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

export default connect(() => ({}), mapDispatchToProps)(MainContainer);
export { MainContainer as MainContainer };
