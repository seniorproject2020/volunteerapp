import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import "../css/Login.css"

export interface LoginState {
  email: string;
  password: string;
  errors: {}
}
class Login extends Component<{}, LoginState> {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard"); // push user to dashboard when they login
    }
    
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    const state = this.state
    state[e.target.id] = e.target.value;
    this.setState(state);
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    console.log(userData);
    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="wrapper">
        <div className="inner-wrapper">
          <form noValidate onSubmit={this.onSubmit}>
            <h3 className="text-center">Sign in</h3>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                onChange={this.onChange} required
                value={this.state.email}
                id="email"
                type="email"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                onChange={this.onChange} required
                value={this.state.password}
                id="password"
                type="password"
                className="form-control"
              />
            </div>
            <div>
              <button type="submit" className="btn btn-primary btn-block">
                Log in
              </button>
            </div>
            <p className="links">
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);