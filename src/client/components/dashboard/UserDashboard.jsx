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
import { VerificationStatus } from '../../../common/constants';

// TODO: Add styling and padding for dashboard page
// TODO: Add dynamic table to pull from database

class Dashboard extends Component {
  static createRow(hour) {
    return (
      <tr key={hour._id}>
        <td>{hour.eventName}</td>
        <td>{hour.eventDescription}</td>
        <td>{(new Date(hour.startTime)).toString()}</td>
        <td>{(new Date(hour.endTime)).toString()}</td>
        <td>{VerificationStatus.getMessage(hour.verifiedStatus)}</td>
      </tr>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      hours: [],
    };
  }

  async componentDidMount() {
    const hours = await ServerApi.getHours();
    if (hours.length === 0) {
      this.setState({ rows: [], hours: [] });
      return;
    }
    const rows = hours.map(hour => Dashboard.createRow(hour));
    this.setState({ rows, hours });
  }

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  }


  addHourToTable = (hour) => {
    this.setState((state) => {
      const { rows, hours } = state;
      hours.push(hour);
      rows.push(Dashboard.createRow(hour));
      return { rows, hours };
    });
  }


  render() {
    const { rows, hours } = this.state;
    return (
      <Container>
        <Row>
          <Calendar hours={hours} />
        </Row>
        <Row>
          <div>
            <LogHoursForm addHourToTable={this.addHourToTable} />
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
                <th>Verified Status</th>
              </tr>
            </thead>
            <tbody>
              {
                rows
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
