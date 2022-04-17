require("dotenv").config();
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const serviceSid = process.env.SERVICE_SID;
const client = require("twilio")(accountSid, authToken);

module.exports = {
  sendOtp: (phoneNo, channel = "sms") => {
    return new Promise((resolve, reject) => {
      // send otp functionality.
      client.verify
        .services(serviceSid)
        .verifications.create({ to: `+91${phoneNo}`, channel: channel })
        .then((verification) => {
          if (verification.sendCodeAttempts.length > 3) {
            reject({ status: false, error: "bulk attempts", statusCode: 400 });
          } else {
            resolve({ status: verification.status, statusCode: 200 });
          }
        })
        .catch((error) => {
          reject({ status: false, error: error.status, statusCode: 500 });
        });
    });
  },
  // check verify otp
  verifyOtp: (phoneNo, otp) => {
    return new Promise((resolve, reject) => {
      client.verify
        .services(serviceSid)
        .verificationChecks.create({ to: `+91${phoneNo}`, code: otp })
        .then((verification_check) => {
          // console.log(verification_check);
          if (
            verification_check.valid &&
            verification_check.status == "approved"
          ) {
            resolve({
              status: true,
              valid: verification_check.valid,
              statusCode: 200,
            });
          } else if (verification_check.status == "pending") {
            reject({ status: false, error: "invalid otp", statusCode: 404 });
          } else {
            reject({
              status: false,
              error: "something went wrong",
              statusCode: 400,
            });
          }
        })
        .catch((err) => {
          resolve({ status: false, error: err.status });
        });
    });
  },
};
