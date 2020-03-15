// @ts-nocheck
import Axios from 'axios'; // https://github.com/axios/axios

const ServerApi = {
  async postHours(startTime, endTime, eventName, eventDescription) {
    Axios.post('/api/hours/loghours',
      {
        eventName,
        startTime,
        endTime,
        eventDescription,
      })
      .then((response) => {
        // handle success
        console.log(response);
      })
      .catch((error) => {
        // handle error
        console.log(error.response.data);
      });
  },

  async getHours() {
    const result = await Axios.get('/api/hours/gethours');
    const { data } = result;
    if (data.success) {
      return data.res;
    }
    return [];
  }
};

export default ServerApi;
