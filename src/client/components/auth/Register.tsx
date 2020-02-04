import React, { Component } from 'react';
import { Link } from "react-router-dom";

export interface RegisterState {
  email: string;
  password: string;
}

class Register extends Component<{}, RegisterState> {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  onChange = e => {
    const state = this.state
    state[e.target.id] = e.target.value;
    this.setState(state);
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      email: this.state.email,
      password: this.state.password,
    };

    console.log(newUser);
  };

  render() {
    return (
      <div>
        <div>
          Register Page
          <p>
            Already have an account? <Link to="/login">Log in</Link>
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
              Sign up
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default Register;