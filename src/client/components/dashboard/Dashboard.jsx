import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';

// eslint-disable-next-line react/prefer-stateless-function
class Dashboard extends Component {
  render() {
    if (this.props.auth.user.isAdmin) {
      return <AdminDashboard />;
    }
    return <UserDashboard />;
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
)(Dashboard);
