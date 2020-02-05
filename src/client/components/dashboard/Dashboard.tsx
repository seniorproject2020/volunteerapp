import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

/* TODO: Return user in a usable format to display. 
It currently needs to be parsed with JSON.parse().
The structure is also nested within auth.user.user which is not very friendly.
*/
render() {
  const { user } = (this.props.auth.user);
  console.log(JSON.parse(user))
    return (
      <div>
        <div>
          Dashboard Page
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