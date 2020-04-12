// @ts-nocheck
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';

class Login extends Component {
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
    const { auth } = this.props;
    if (auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard'); // push user to dashboard when they login
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = (e) => {
    const { state } = this;
    state[e.target.id] = e.target.value;
    this.setState(state);
  };

  onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);
  };

  render() {
    return (
      <div>
        <div>
          Login Page
          <p>
            Don't have an account?
            {' '}
            <Link to="/register">Register</Link>
          </p>
        </div>

        <form noValidate onSubmit={this.onSubmit}>
          <div>
            <input
              onChange={this.onChange}
              required
              value={this.state.email}
              id="email"
              type="email"
            />
            <label htmlFor="email">Email</label>
          </div>
          <div>
            <input
              onChange={this.onChange}
              required
              value={this.state.password}
              id="password"
              type="password"
            />
            <label htmlFor="password">Password</label>
          </div>
          <div>
            <button type="submit">
              Log in
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
