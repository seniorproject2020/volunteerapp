import Hours from '../../models/hours';
import PendingHours from '../../models/pendinghours';
import User from './user';
import { VerificationStatus } from '../../../common/constants';

// TODO Update error messages
// TODO Better Error Handling
// TODO: better admin authorization to remove duplicate code
const Controller = {
  async logHours(user, startDate, endDate, eventName, eventDescription) {
    if (!user) { throw new Error('User was not found.'); }

    if (!startDate) { throw new Error('Empty start time.'); }

    if (!endDate) { throw new Error('Empty end time.'); }

    const hourCount = Math.floor(Math.abs(startDate.getTime() - endDate.getTime()) / 36e5);
    const hoursInfo = {
      userId: user._id,
      startTime: startDate,
      endTime: endDate,
      totalHours: hourCount,
      verifiedStatus: VerificationStatus.PENDING,
      eventName,
      eventDescription,
    };
    const hour = await (new Hours(hoursInfo)).save();

    await this.createPendingHour(user, hour);
    return hour;
  },

  async getHours(user) {
    if (!user) { throw new Error('User was not found.'); }

    const userHours = await Hours.find({ userId: user.id });

    if (!userHours) { throw new Error('Hours for user were not found.'); }

    return userHours;
  },

  async createPendingHour(user, hour) {
    if (!hour._id) {
      throw new Error('Id was not found on hour.');
    }

    const pendingHour = new PendingHours({
      _id: hour._id,
      volunteerName: `${user.firstName} ${user.lastName}`,
      eventName: hour.eventName,
      eventDescription: hour.eventDescription,
      startTime: hour.startTime,
      endTime: hour.endTime,
    });

    await pendingHour.save();
  },

  async handleAccept(user, id) {
    if (!user) { throw new Error('User was not found.'); }

    if (!user.isAdmin) { throw new Error('User is not authroized for this function.'); }

    const update = {
      verifiedStatus: VerificationStatus.ACCEPTED,
      verifiedBy: `${user.firstName} ${user.lastName}`,
    };
    const hour = await Hours.findByIdAndUpdate(id, update);
    console.log(hour.totalHours);
    User.addApprovedHours(hour.userId, hour.totalHours);
    await PendingHours.findByIdAndDelete(id);
  },

  async handleReject(user, id) {
    if (!user) { throw new Error('User was not found.'); }

    if (!user.isAdmin) { throw new Error('User is not authroized for this function.'); }

    const update = {
      verifiedStatus: VerificationStatus.REJECTED,
      verifiedBy: `${user.firstName} ${user.lastName}`,
    };
    await Hours.findByIdAndUpdate(id, update);
    await PendingHours.findByIdAndDelete(id);
  },

  async getPendingHours(user) {
    if (!user) { throw new Error('User was not found.'); }

    if (!user.isAdmin) { throw new Error('User is not authroized for this function.'); }

    return PendingHours.find();
  }
};

export default Controller;
