import React, { Component } from 'react';
import { Link } from "react-router-dom";

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
  };

  render() {
    const { errors } = this.state;
    return (
<div>
        <div>
          Login Page
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
        
        <form noValidate onSubmit={this.onSubmit}>
          <div>
            <input
              onChange={this.onChange} required
              value={this.state.email}
              id="email"
              type="email"
            />
            <label htmlFor="email">Email</label>
          </div>
          <div>
            <input
              onChange={this.onChange} required
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
export default Login;