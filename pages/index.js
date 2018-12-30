import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import React from "react";
import { connect } from "react-redux";
import { NextAuth } from "next-auth/client";
import { Container } from "semantic-ui-react";
import Homemenu from "../components/Menu";
import UserLists from "../components/UserLists";
import * as stuffActions from "../store";

 class Index extends React.Component {
  static async getInitialProps({ req }) {
    return {
      session: await NextAuth.init({ req })
    };
	}
	
	
  render() {
		console.log("this.props ", this.props);
		let { session } = this.props;
    if (session.user) {
      return (
        <Container fluid>
          <Homemenu
            profileInfo={
              session.user.name || session.user.email
            }
          />
					<Container style={{marginTop:'60px'}}>
						<UserLists userId={session.user.id} />
					</Container>
        </Container>
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
	Index.propTypes = {
		stuffActions: PropTypes.object,
		userLists: PropTypes.array,
		stuff: PropTypes.array,
		lookup: PropTypes.array
	};
	
	function mapStateToProps(state) {
		return {
			userLists: state.userLists,
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

