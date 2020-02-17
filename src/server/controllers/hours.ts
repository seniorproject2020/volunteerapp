import passport from 'passport';
import User from '../models/users.schema';
import Hours from '../models/hours.schema';
import Pending from '../models/pending.schema'

const HoursController = {
  async logHours(user: any, startDate: Date, endDate: Date, event: String):Promise<{success: boolean, res: any, err: any}> {
    console.log(user);

    if (!user) {
      return {success: false, res: undefined, err: {
        user: 'user not found',
      }};
    } 
    if(!startDate) {
      return {success: false, res: undefined, err: {
        startDate: 'start time not entered',
      }};
    }
    if(!endDate) {
      return {success: false, res: undefined, err: {
        endDate: 'end time not entered',
      }};
    }
    const hourCount = startDate.getHours() - endDate.getHours();
    console.log(hourCount);
    const hoursInfo = {
      userId: user._id,
      startTime: startDate,
      endTime: endDate,
      totalHours: hourCount,
      verified: false,
      eventName: event,
    }
    const newHours = new Hours(hoursInfo);
    const resHours = await newHours.save();
    console.log(resHours);
    //this.toBeVerified(resHours);
    return {success: true, res: resHours, err: undefined};
  },

  async toBeVerified(resHours: any):Promise<{success: boolean, res: any, err: any}> {
    if(!resHours._id) {
      return {success: false, res: undefined, err: {
        resHours: 'no ID found for logged hours',
      }};
    }

    const pendingVerification = {
      hoursPendingVerification: resHours.id,
    }

    const hoursToVerify = new Pending(pendingVerification);
    const pendingRes = await hoursToVerify.save();
    return {success: true, res: pendingRes, err: undefined};
  },
}

export default HoursController;