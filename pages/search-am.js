import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import React from "react";
import { connect } from "react-redux";
import { receiveStuff, fetchStuff, lookupStuff } from "../store";
import Content from "../components/Content";
import Homemenu from "../components/Menu";
import * as stuffActions from "../store";
import { NextAuth } from "next-auth/client";

class SearchAm extends React.Component {
  static async getInitialProps({ reduxStore, req }) {
    return { session: await NextAuth.init({ req }) };
  }

  render() {
    if (this.props.session.user) {
      return <Content userId={this.props.session.user} />;
    } else {
      return <Homemenu profileInfo="You are not logged in." />;
    }
  }
}

SearchAm.propTypes = {
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
)(SearchAm);
