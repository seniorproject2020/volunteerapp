// @ts-nocheck
import Axios from 'axios'; // https://github.com/axios/axios

const ServerApi = {
  async postHours(startTime, endTime, eventName, eventDescription, addHourToTable) {
    Axios.post('/api/hours/loghours',
      {
        eventName,
        startTime,
        endTime,
        eventDescription,
      })
      .then((response) => {
        // handle success
        addHourToTable(response.data);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  },

  async getHours() {
    const result = await Axios.get('/api/hours/gethours');
    const { data } = result;
    if (data) {
      return data;
    }
    return [];
  },

  async getPendingHours() {
    const result = await Axios
      .get('/api/hours/pendinghours')
      .catch((err) => {
        console.log(err);
      });

    const { data } = result;
    if (data) {
      return data;
    }
    return [];
  },

  async acceptPendingHour(id, callback) {
    Axios.put(`/api/hours/accept/${id}`)
      .then(callback)
      .catch((err) => {
        console.log(err);
      });
  },

  async rejectPendingHour(id, callback) {
    Axios.put(`/api/hours/reject/${id}`)
      .then(callback)
      .catch((err) => {
        console.log(err);
      });
  }
};

export default ServerApi;
