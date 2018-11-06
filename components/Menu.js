import React, { Component } from "react";
import {
  Responsive,
  Menu,
  Input,
  Button,
  Header,
  Icon
} from "semantic-ui-react";
import Link from "next/link";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as stuffActions from "../store";

class Homemenu extends Component {
  renderMenu = () => {
    if (this.props.profileInfo !== "You are not logged in.") {
      return (
        <Menu stackable className="fixed">
          <Menu.Item className="item">Iuxta</Menu.Item>
          <Menu.Item>
            <Link href="/">
              <a>Home</a>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link href="/search-am">
              <a>Am List Maker</a>
            </Link>
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>{this.props.profileInfo}</Menu.Item>
          </Menu.Menu>
        </Menu>
      );
    } else {
      return (
        <Menu stackable className="fixed">
          <Menu.Item className="item">Iuxta</Menu.Item>
          <Menu.Item>
            <Link href="/auth">
              <a>Log In</a>
            </Link>
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>{this.props.profileInfo}</Menu.Item>
          </Menu.Menu>
        </Menu>
      );
    }
  };
  render() {
    return this.renderMenu();
  }
}

Homemenu.propTypes = {
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
)(Homemenu);
