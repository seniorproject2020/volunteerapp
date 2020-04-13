// @ts-nocheck
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
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

    const newUser = {
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName
    };

    console.log(newUser);
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    return (
      <div className="wrapper">
        <div className="inner-wrapper">
          <form noValidate onSubmit={this.onSubmit}>
            <h3 className="text-center">Register</h3>
            <div className="form-group">
              <label htmlFor="text">First Name</label>
              <input
                onChange={this.onChange} required
                value={this.state.firstName}
                id="firstName"
                type="text"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="text">Last Name</label>
              <input
                onChange={this.onChange} required
                value={this.state.lastName}
                id="lastName"
                type="text"
                className="form-control"
              />
            </div>
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
                Sign up
              </button>
              <p className="links">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
          </form>
        </div>
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
  { registerUser }
)(withRouter(Register));
