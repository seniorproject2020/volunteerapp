import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

import Calendar from "./Calendar";
import { Container, Row, Col, Table } from "react-bootstrap";

// TODO: Add styling and padding for dashboard page
// TODO: Add dynamic table to pull from database
class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

render() {
  const { user } = (this.props.auth.user);
  console.log(this.props)
    return (
      <Container>
        <Row>
          <Col sm={4}>
            <div>
              <li>Name: { user.first_name } { user.last_name }</li>
              <li>Email: { user.email }</li>
              <li>Phone: { user.phone }</li>
              <li>Total Logged Hours: { user.total_logged_hours }</li>
              <li>Admin: { user.isAdmin ? "True" : "False" }</li>
            </div>
            <div>
              <button onClick={this.onLogoutClick}>Logout</button>
            </div>
          </Col>
          <Col sm={8}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Total Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>9/12/2019</td>
                <td>12 PM</td>
                <td>1 PM</td>
                <td>1 hours</td>
                <td>Approved</td>
              </tr>
              <tr>
                <td>10/12/2019</td>
                <td>12 PM</td>
                <td>1 PM</td>
                <td>1 hours</td>
                <td>Approved</td>
              </tr>
              <tr>
                <td>11/12/2019</td>
                <td>12 PM</td>
                <td>1 PM</td>
                <td>1 hours</td>
                <td>Approved</td>
              </tr>
            </tbody>
          </Table>
          </Col>
        </Row>
        <Row>
          <Col>
            <div>
              <Calendar></Calendar>
            </div>
          </Col>
        </Row>
      </Container>
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