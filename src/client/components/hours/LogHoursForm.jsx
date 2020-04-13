// @ts-nocheck
import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers'; // https://material-ui-pickers.dev/
import MomentUtils from '@date-io/moment'; // https://momentjs.com/
import ServerApi from '../../utils/ServerApi';


export default class LogHoursForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      startTime: null,
      endTime: null,
      eventName: '',
      eventDescription: '',
    };
  }

  handleShow = () => this.setState({ show: true });

  handleClose = () => this.setState({ show: false });

  // handleDateChange = (value): void =>this.setState({selectedDate: value});
  handleStartTimeChange = startTime => this.setState({ startTime });

  handleEndTimeChange = endTime => this.setState({ endTime });

  // React passes Synthetic Events rather than the raw value, string in this case.
  // To get the string from the event, we need to grab it from event.target.value. https://reactjs.org/docs/forms.html
  handleEventNameChange = eventNameEvent => this.setState({
    eventName: eventNameEvent.target.value
  });

  handleEventDescriptionChange = eventDescriptionEvent => this.setState({
    eventDescription: eventDescriptionEvent.target.value
  });

  handleSubmit = () => {
    const {
      startTime, endTime, eventName, eventDescription
    } = this.state;
    const { addHourToTable } = this.props;
    ServerApi.postHours(
      startTime.toString(),
      endTime.toString(),
      eventName,
      eventDescription,
      addHourToTable
    );

    this.handleClose();
  }

  render() {
    const {
      show, startTime, endTime, eventName, eventDescription
    } = this.state;
    return (
      <div>
        <Button variant="primary" onClick={this.handleShow}>Log Hours</Button>
        <Modal show={show} onHide={this.handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Log Hours</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                {/* <Form.Group controlId="date">
                <Form.Label>Date </Form.Label>
                  <DatePicker value={selectedDate} onChange={this.handleDateChange} />
              </Form.Group> */}
                <Form.Group controlId="eventName">
                  <Form.Label>Event Name </Form.Label>
                  <Form.Control value={eventName} type="text" onChange={this.handleEventNameChange} />
                </Form.Group>

                <Form.Group controlId="eventDescription">
                  <Form.Label>Event Description </Form.Label>
                  <Form.Control
                    value={eventDescription}
                    onChange={this.handleEventDescriptionChange}
                  />
                </Form.Group>

                <Form.Group controlId="startTime">
                  <Form.Label>Start Time </Form.Label>
                  <DateTimePicker value={startTime} onChange={this.handleStartTimeChange} />
                </Form.Group>

                <Form.Group controlId="endTime">
                  <Form.Label>End Time </Form.Label>
                  <DateTimePicker value={endTime} onChange={this.handleEndTimeChange} />
                </Form.Group>

              </MuiPickersUtilsProvider>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleSubmit}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
