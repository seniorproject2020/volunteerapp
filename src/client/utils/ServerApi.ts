import axios from "axios"; // https://github.com/axios/axios

const ServerApi = {
  async postHours(startTime: string, endTime: string, eventName: string, eventDescription: string): void {
    axios.post('/api/hours/loghours',
    {
      eventName: eventName,
      startTime: startTime,
      endTime: endTime,
    }
    )
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error.response.data);
    });
  }
}

export default ServerApi;