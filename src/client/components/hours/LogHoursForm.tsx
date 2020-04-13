import React, { Component } from "react";
import { Modal, Button, Form} from "react-bootstrap";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers'; // https://material-ui-pickers.dev/
import MomentUtils from '@date-io/moment'; // https://momentjs.com/
import * as moment from 'moment';
import ServerApi from '../../utils/ServerApi';

interface Props {}

interface State {
  show: boolean,
  startTime: moment,
  endTime: moment,
  eventDescription: string,
  eventName: string,
}
export default class LogHoursForm extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      startTime: null,
      endTime: null,
      eventName: "",
      eventDescription: "",
    };
  }

  handleShow = () : void => this.setState({ show: true });
  handleClose = () : void => this.setState({show:false});

  //handleDateChange = (value): void =>this.setState({selectedDate: value});
  handleStartTimeChange = (startTime): void => this.setState({startTime});
  handleEndTimeChange = (endTime): void => this.setState({endTime});

  // React passes Synthetic Events rather than the raw value, string in this case. To get the string from the event,
  // we need to grab it from event.target.value. https://reactjs.org/docs/forms.html
  handleEventNameChange = (eventNameEvent): void => this.setState({eventName: eventNameEvent.target.value});
  handleEventDescriptionChange = (eventDescriptionEvent): void => this.setState({eventDescription: eventDescriptionEvent.target.value});

  handleSubmit = (): void => {
    const {startTime, endTime, eventName, eventDescription} = this.state;
    ServerApi.postHours(startTime, endTime, eventName, eventDescription);
  }

  render(){
    const {show, startTime, endTime, eventName, eventDescription} = this.state;
    return (
      <div>
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

              <Form.Group controlId="startTime">
                <Form.Label>Start Time </Form.Label>
                <DateTimePicker value={startTime} onChange={this.handleStartTimeChange} />
              </Form.Group>

              <Form.Group controlId="endTime">
                <Form.Label>End Time </Form.Label>
                <DateTimePicker value={endTime} onChange={this.handleEndTimeChange} />
              </Form.Group>

              <Form.Group controlId="eventName">
                <Form.Label>Event Name </Form.Label>
                <Form.Control value={eventName} type="text" onChange={this.handleEventNameChange}/>
              </Form.Group>

              <Form.Group controlId="eventDescription">
                <Form.Label>Event Description </Form.Label>
                <Form.Control value={eventDescription} onChange={this.handleEventDescriptionChange} />
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
    )
  }
}