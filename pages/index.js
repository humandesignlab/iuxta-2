import React from "react";
import { NextAuth } from "next-auth/client";
import Homemenu from "../components/Menu";

export default class extends React.Component {
  static async getInitialProps({ req }) {
    return {
      session: await NextAuth.init({ req })
    };
  }
  render() {
    console.log("this.props ", this.props);
    if (this.props.session.user) {
      return (
        <div>
          <Homemenu
            profileInfo={
              this.props.session.user.name || this.props.session.user.email
            }
          />
        </div>
      );
    } else {
      return (
        <div>
          <Homemenu profileInfo="You are not logged in." />
          <p>You are not logged in.</p>
        </div>
      );
    }
  }
}
