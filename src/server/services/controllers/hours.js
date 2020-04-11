import Hours from '../../models/hours';
import Pending from '../../models/pendinghours';

// TODO Update error messages
// TODO Better Error Handling
const Controller = {
  async logHours(user, startDate, endDate, eventName, eventDescription) {
    if (!user) {
      return {
        success: false,
        res: undefined,
        err: {
          user: 'user not found',
        }
      };
    }

    if (!startDate) {
      return {
        success: false,
        res: undefined,
        err: {
          startDate: 'start time not entered',
        }
      };
    }

    if (!endDate) {
      return {
        success: false,
        res: undefined,
        err: {
          endDate: 'end time not entered',
        }
      };
    }

    const hourCount = Math.floor(Math.abs(startDate.getTime() - endDate.getTime()) / 36e5);
    const hoursInfo = {
      userId: user._id,
      startTime: startDate,
      endTime: endDate,
      totalHours: hourCount,
      verified: false,
      eventName,
      eventDescription,
    };
    console.log(user);
    const newHours = new Hours(hoursInfo);
    const resHours = await newHours.save();
    return this.toBeVerified(resHours);
  },

  async toBeVerified(resHours) {
    if (!resHours._id) {
      return {
        success: false,
        res: undefined,
        err: {
          resHours: 'no ID found for logged hours',
        }
      };
    }

    const pendingHours = new Pending({
      hours: resHours._id,
    });

    try {
      await pendingHours.save();
      return {
        success: true,
        res: resHours,
        err: undefined
      };
    } catch (e) {
      return {
        success: false,
        res: undefined,
        err: e
      };
    }
  },

  async getHours(user) {
    if (!user) {
      return {
        success: false,
        res: undefined,
        err: {
          resHours: 'user not found',
        }
      };
    }

    const userHours = await Hours.find({ userId: user.id });
    if (!userHours) {
      return {
        success: false,
        res: undefined,
        err: {
          resHours: 'no hours found for user',
        }
      };
    }

    return { success: true, res: userHours, err: undefined };
  }
};

export default Controller;
