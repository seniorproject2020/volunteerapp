// @ts-nocheck
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Table
} from 'react-bootstrap';
import { logoutUser } from '../../actions/authActions';

import { Check, X, Stopwatch } from 'react-bootstrap-icons'
import Calendar from './Calendar';
import LogHoursForm from '../hours/LogHoursForm';
import ServerApi from '../../utils/ServerApi';
import { VerificationStatus } from '../../../common/constants';
import './Dashboard.css'
// TODO: Add styling and padding for dashboard page
// TODO: Add dynamic table to pull from database

class Dashboard extends Component {
  static createRow(hour) {
    return (
      <tr key={hour._id}>
        <td>
          <div className="name">{hour.eventName}</div>
          <div className="description">{hour.eventDescription}</div>
        </td>
        <td>{(new Date(hour.startTime)).toString()}</td>
        <td>{(new Date(hour.endTime)).toString()}</td>
        <td>
          {VerificationStatus.getMessage(hour.verifiedStatus) == "Accepted" &&
            <div className="buttons"><Check color="green" size="25" /> Accepted </div>
          }
          {VerificationStatus.getMessage(hour.verifiedStatus) == "Rejected" &&
            <div className="buttons"><X color="red" size="25" /> Rejected</div>
          }
          {VerificationStatus.getMessage(hour.verifiedStatus) == "Pending" &&
            <div className="buttons"><Stopwatch color="orange" size="25" /> Pending</div>
          }
        </td>
        {/* <td>{VerificationStatus.getMessage(hour.verifiedStatus)}</td> */}
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
      <div className="body">

        <Calendar hours={hours} />

        <Table responsive hover className="table">
          <thead>
            <tr>
              <th>Event</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {
              rows
            }
          </tbody>
        </Table>
        <p className="hourcount">
          TOTAL APPROVED HOURS:
        </p>
        <div>
          <LogHoursForm addHourToTable={this.addHourToTable} />
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
)(Dashboard);
