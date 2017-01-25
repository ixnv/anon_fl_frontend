import React from "react";
import {connect} from "react-redux";


const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});


class <%= name %> extends React.Component {
  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div {...this.props}/>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(<%= name %>);
export { <%= name %> as <%= name %>};
