import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

render() {
  const { user } = (this.props.auth.user);
  console.log(this.props)
    return (
      <div>
        <div>
          Dashboard Page
          <ul>
            <li>Name: { user.first_name } { user.last_name }</li>
            <li>Email: { user.email }</li>
            <li>Phone: { user.phone }</li>
            <li>Total Logged Hours: { user.total_logged_hours }</li>
            <li>Admin: { user.isAdmin ? "True" : "False" }</li>
          </ul>
        </div>
        <div>
          <button
            onClick={this.onLogoutClick}
          >
            Logout
          </button>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);