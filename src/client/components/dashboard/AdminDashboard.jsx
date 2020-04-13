import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Alert, Table, Button
} from 'react-bootstrap';
import { ExclamationTriangleFill } from 'react-bootstrap-icons'
import { logoutUser } from '../../actions/authActions';
import ServerApi from '../../utils/ServerApi';
import './Dashboard'

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
      for (let i = 0; i < rows.length; i += 1) {
        if (rows[i].key === key) {
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
          <div className="name">{`${pendingHour.eventName}\n`}</div>
          <div className="description">{`${pendingHour.eventDescription}`}</div>
        </td>
        <td>{(new Date(pendingHour.startTime)).toString()}</td>
        <td>{(new Date(pendingHour.endTime)).toString()}</td>
        <td>
          <Button variant="success" onClick={() => this.acceptPendingHour(pendingHour._id, callback)}>Accept</Button>
        </td>
        <td>
          <Button variant="danger" onClick={() => this.rejectPendingHours(pendingHour._id, callback)}>Reject</Button>
        </td>
      </tr>
    );
  }

  render() {
    const { rows } = this.state;
    return (
      <div>
        {rows.length == 0 &&
          <Alert className="alert" variant="success">
            No new submissions
        </Alert>
        }
        {rows.length == 1 &&
          <Alert className="alert" variant="danger">
            <ExclamationTriangleFill color="#800000" size="25" />   {rows.length} submission needs attention
        </Alert>
        }
        {rows.length > 1 &&
          <Alert className="alert" variant="danger">
            <ExclamationTriangleFill color="#800000" size="25" />   {rows.length} submissions need attention
        </Alert>
        }
        <div>
          <Table responsive hover className="table">
            <thead>
              <tr>
                <th>User</th>
                <th>Event</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Actions</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                rows
              }
            </tbody>
          </Table>
        </div>
      </div>
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
