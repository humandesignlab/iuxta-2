import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import React from "react";
import { connect } from "react-redux";
import { receiveStuff, fetchStuff, lookupStuff } from "../store";
import Content from "../components/Content";
import * as stuffActions from "../store";

class Index extends React.Component {
  static getInitialProps({ reduxStore, req }) {
    // reduxStore.dispatch(fetchStuff("papel"));
    // reduxStore.dispatch(lookupStuff("B002K9KVH6"));

    return {};
  }

  componentDidMount() {
    console.log("this.props Index", this.props);
  }

  render() {
    return <Content />;
  }
}

Index.propTypes = {
  stuffActions: PropTypes.object,
  stuff: PropTypes.array,
  lookup: PropTypes.array
};

function mapStateToProps(state) {
  return {
    stuff: state.stuff,
    lookup: state.lookup
  };
}

function mapDispatchToProps(dispatch) {
  return {
    stuffActions: bindActionCreators(stuffActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
