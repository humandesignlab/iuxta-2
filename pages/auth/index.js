import React from "react";
import Router from "next/router";
import Link from "next/link";
import { NextAuth } from "next-auth/client";
import {
  Container,
  Segment,
  Card,
  Form,
  Button,
  Grid,
	Divider,
	Icon
} from "semantic-ui-react";

export default class extends React.Component {
  static async getInitialProps({ req }) {
    return {
      session: await NextAuth.init({ req }),
      linkedAccounts: await NextAuth.linked({ req }),
      providers: await NextAuth.providers({ req })
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      session: this.props.session
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSignInSubmit = this.handleSignInSubmit.bind(this);
  }

  handleEmailChange(event) {
    this.setState({
      email: event.target.value
    });
  }

  handleSignInSubmit(event) {
    event.preventDefault();

    if (!this.state.email) return;

    NextAuth.signin(this.state.email)
      .then(() => {
        Router.push(`/auth/check-email?email=${this.state.email}`);
      })
      .catch(() => {
        Router.push(
          `/auth/error?action=signin&type=email&email=${this.state.email}`
        );
      });
  }

  render() {
    if (this.props.session.user) {
      return (
        <div>
          <Container>
            <Segment>
              <div className="text-center">
                <h1 className="display-4 mt-3">NextAuth Example</h1>
                <p className="lead mt-3 mb-1">
                  You are signed in as{" "}
                  <span className="font-weight-bold">
                    {this.props.session.user.email}
                  </span>.
                </p>
              </div>
              <div className="row">
                <div className="col-sm-5 mr-auto ml-auto">
                  <LinkAccounts
                    session={this.props.session}
                    linkedAccounts={this.props.linkedAccounts}
                  />
                </div>
              </div>
              <p className="text-center">
                <Link href="/">
                  <a>Home</a>
                </Link>
              </p>
            </Segment>
          </Container>
        </div>
      );
    } else {
      return (
        <div style={{ marginTop: "40px" }}>
          <Grid centered columns={3}>
            <Grid.Column>
              <Card className="centered">
                <Card.Header textAlign="center">Sign In</Card.Header>
                <Card.Content textAlign='center'>
                  <SignInButtons providers={this.props.providers} />
                  {/* <Form
                    id="signin"
                    method="post"
                    action="/auth/email/signin"
                    onSubmit={this.handleSignInSubmit}
                  >
                    <input
                      name="_csrf"
                      type="hidden"
                      value={this.state.session.csrfToken}
                    />
                    <Form.Field>
                      <label htmlFor="email">Email address</label>
                      <input
                        name="email"
                        type="text"
                        placeholder="j.smith@example.com"
                        id="email"
                        className="form-control"
                        value={this.state.email}
                        onChange={this.handleEmailChange}
                      />
                    </Form.Field>
                    <Button
                      id="submitButton"
                      type="submit"
                      className="btn btn-outline-primary"
                    >
                      Sign in with email
                    </Button>
                  </Form> */}
                </Card.Content>
              </Card>
              {/* <Container textAlign="center">
                <Link href="/auth/credentials">
                  <a>Sign in with credentials</a>
                </Link>
              </Container> */}
              <Divider />
              <Container textAlign="center">
                <Link href="/">
                  <a>Home</a>
                </Link>
              </Container>
            </Grid.Column>
          </Grid>
        </div>
      );
    }
  }
}

export class LinkAccounts extends React.Component {
  render() {
    return (
      <div className="card mt-3 mb-3">
        <h4 className="card-header">Link Accounts</h4>
        <div className="card-body pb-0">
          {Object.keys(this.props.linkedAccounts).map((provider, i) => {
            return (
              <LinkAccount
                key={i}
                provider={provider}
                session={this.props.session}
                linked={this.props.linkedAccounts[provider]}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export class LinkAccount extends React.Component {
  render() {
    if (this.props.linked === true) {
      return (
        <form
          method="post"
          action={`/auth/oauth/${this.props.provider.toLowerCase()}/unlink`}
        >
          <input
            name="_csrf"
            type="hidden"
            value={this.props.session.csrfToken}
          />
          <p>
            <button className="btn btn-block btn-outline-danger" type="submit">
              Unlink from {this.props.provider}
            </button>
          </p>
        </form>
      );
    } else {
      return (
        <p>
          <a
            className="btn btn-block btn-outline-primary"
            href={`/auth/oauth/${this.props.provider.toLowerCase()}`}
          >
            Link with {this.props.provider}
          </a>
        </p>
      );
    }
  }
}

export class SignInButtons extends React.Component {
  render() {
    return (
      <React.Fragment>
        {Object.keys(this.props.providers).map((provider, i) => {
          return (
            <Button basic color='blue' icon labelPosition='left' key={i}>
						<Icon name='google' />
              <a
                className="btn btn-block btn-outline-secondary"
                href={this.props.providers[provider].signin}
              >
                Sign in with {provider}
              </a>
            </Button>
          );
        })}
      </React.Fragment>
    );
  }
}
