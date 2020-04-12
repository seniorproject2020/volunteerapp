import React, { Component } from 'react';
import { Chart } from 'react-google-charts';

// TODO: Incorporate real information into chart react-google-charts: https://www.npmjs.com/package/react-google-charts
class Calendar extends Component {
  static createDates(hours) {
    const dates = hours.map(hour => [new Date(hour.startTime), hour.totalHours]);
    return dates;
  }

  render() {
    const data = [
      [{ type: 'date', id: 'Date' }, { type: 'number', id: 'Won/Loss' }],
      ...Calendar.createDates(this.props.hours)
    ];
    return (
      <Chart
        width="100%"
        height="200px"
        chartType="Calendar"
        loader={<div>Loading Chart</div>}
        data={data}
        options={{
          title: 'Hours Logged',
        }}
        rootProps={{ 'data-testid': '1' }}
      />
    );
  }
}

export default Calendar;
