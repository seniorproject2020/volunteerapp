import Hours from '../../models/users';
import Pending from '../../models/pendinghours';

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

    const newHours = new Hours(hoursInfo);
    const resHours = await newHours.save();
    // this.toBeVerified(resHours);
    return { success: true, res: resHours, err: undefined };
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

    const pendingVerification = {
      hoursPendingVerification: resHours.id,
    };

    const hoursToVerify = new Pending(pendingVerification);
    const pendingRes = await hoursToVerify.save();
    return {
      success: true,
      res: pendingRes,
      err: undefined
    };
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
