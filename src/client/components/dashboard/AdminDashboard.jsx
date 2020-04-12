import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container, Table, Button
} from 'react-bootstrap';
import { logoutUser } from '../../actions/authActions';
import ServerApi from '../../utils/ServerApi';


class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
    };
  }

  async componentDidMount() {
    const pendingHours = await ServerApi.getPendingHours();
    if (pendingHours.length === 0) {
      this.setState({ rows: [] });
      return;
    }
    const rows = [];
    for (let i = 0; i < pendingHours.length; i += 1) {
      const pendingHour = pendingHours[i];
      const row = this.createRow(pendingHour, () => this.removeRow(pendingHour._id));
      rows.push(row);
    }

    this.setState({ rows });
  }

  acceptPendingHour = (hourId, callback) => {
    ServerApi.acceptPendingHour(hourId, callback);
  }

  rejectPendingHours = (hourId, callback) => {
    ServerApi.rejectPendingHour(hourId, callback);
  }

  removeRow = (key) => {
    this.setState((state) => {
      const rows = [...state.rows];
      for (let i = 0; i < rows; i += 1) {
        if (rows[i]._id === key) {
          rows.splice(i, 1);
        }
      }
      return { rows };
    });
  }

  createRow(pendingHour, callback) {
    return (
      <tr key={pendingHour._id}>
        <td>{pendingHour.user}</td>
        <td>
          <b>{`${pendingHour.eventName}\n`}</b>
          {`${pendingHour.eventDescription}`}
        </td>
        <td>{(new Date(pendingHour.startTime)).toString()}</td>
        <td>{(new Date(pendingHour.endTime)).toString()}</td>
        <td>
          <Button variant="primary" onClick={() => this.acceptPendingHour(pendingHour._id, callback)}>Accept</Button>
        </td>
        <td>
          <Button variant="primary" onClick={() => this.rejectPendingHours(pendingHour._id, callback)}>Reject</Button>
        </td>
      </tr>
    );
  }

  render() {
    const { rows } = this.state;
    return (
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>User Name</th>
              <th>Event</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Accept</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {
              rows
            }
          </tbody>
        </Table>
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
)(AdminDashboard);
