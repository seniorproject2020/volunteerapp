/* Constants that are shared between server and client */

export const VerificationStatus = {
  PENDING: 1,
  ACCEPTED: 2,
  REJECTED: 3,

  getMessage(status) {
    switch (status) {
      case this.PENDING: return 'Pending';
      case this.ACCEPTED: return 'Accepted';
      case this.REJECTED: return 'Rejected';
      default: return '';
    }
  },
};

export const Errors = {
  INVALID_PASSWORD: 1000,
  USED_EMAIL: 1001,
  EMAIL_NOT_FOUND: 1002,
  USER_NOT_FOUND: 1003,
  MISSING_HOURS: 1004,
  NOT_ADMIN: 1005
};
