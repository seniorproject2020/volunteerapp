import React, { Component } from 'react';
import { Chart } from 'react-google-charts';

// TODO: Incorporate real information into chart react-google-charts: https://www.npmjs.com/package/react-google-charts
class Calendar extends Component {
  render() {
    return (
      <Chart
        width="100%"
        height="200px"
        chartType="Calendar"
        loader={<div>Loading Chart</div>}
        data={[
          [{ type: 'date', id: 'Date' }, { type: 'number', id: 'Won/Loss' }],
          [new Date(2019, 8, 12), 1],
          [new Date(2019, 9, 12), 1],
          [new Date(2019, 10, 12), 1]
        ]}
        options={{
          title: 'Hours Logged',
        }}
        rootProps={{ 'data-testid': '2' }}
      />
    )
  }
}

export default Calendar