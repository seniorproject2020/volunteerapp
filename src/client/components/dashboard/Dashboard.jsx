// @ts-nocheck
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container, Row, Table
} from 'react-bootstrap';
import { logoutUser } from '../../actions/authActions';

import Calendar from './Calendar';
import LogHoursForm from '../hours/LogHoursForm';
import ServerApi from '../../utils/ServerApi';

// TODO: Add styling and padding for dashboard page
// TODO: Add dynamic table to pull from database

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedHours: [],
    };
  }

  async componentDidMount() {
    const hours = await ServerApi.getHours();
    if (hours.length === 0) {
      this.setState({ loggedHours: [] });
      return;
    }
    const tmp = hours.map(hour => (
      <tr key={hour._id}>
        <td>{hour.eventName}</td>
        <td>{hour.eventDescription}</td>
        <td>{hour.startTime}</td>
        <td>{hour.endTime}</td>
        <td>{hour.verified ? 'y' : 'n'}</td>
      </tr>
    ));
    this.setState({ loggedHours: tmp });
  }

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { loggedHours } = this.state;
    return (
      <Container>
        <Row>
          <Calendar />
        </Row>
        <Row>
          <div>
            <LogHoursForm />
          </div>
        </Row>
        <Row>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Event Description</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Verified?</th>
              </tr>
            </thead>
            <tbody>
              {
                loggedHours
              }
            </tbody>
          </Table>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
