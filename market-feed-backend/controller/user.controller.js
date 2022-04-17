const otp = require("../utils/otp.util");
const userAuth = require("../helpers/auth/user.auth.js");
const jwt = require("../utils/jwt.util");
const verify = require("../utils/verify.util");
module.exports = {
  sendOtp: async (req, res) => {
    console.log("-> send otp route");
    try {
      await verify.verifyPhone(req.body.phone);
      otp
        .sendOtp(req.body.phone, req.body.channel)
        .then((response) => {
          res.json(response);
        })
        .catch((error) => {
          res.json(error);
        });
    } catch (error) {
      res.json(error);
    }
  },
  verifyOtp: async (req, res) => {
    console.log("-> verify otp route");
    try {
      await verify.verifyPhone(req.body.phone);
      otp
        .verifyOtp(req.body.phone, req.body.otp)
        .then((response) => {
          userAuth
            .checkUser(req.body.phone)
            .then(async (data) => {
              // res.json(response);
              if (response.status) {
                if (data.status) {
                  const token = await jwt.generate({ id: data._id });
                  res.json({
                    status: true,
                    login: true,
                    toke: token,
                    valid: true,
                  });
                } else {
                  res.json({
                    status: false,
                    toke: null,
                    valid: true,
                  });
                }
              } else {
                res.json({
                  status: false,
                  toke: null,
                  valid: false,
                });
              }
            })
            .catch((error) => res.json(error));
        })
        .catch((error) => {
          res.json({ error: error, status: false, token: null });
        });
    } catch (error) {
      res.json(error);
    }
  },
  createUser: async (req, res) => {
    console.log("-> create user route");
    try {
      // verify phone number is okay
      await verify.verifyPhone(req.body.user.phone);
      userAuth
        .createUser(req.body.user)
        .then(async (response) => {
          const token = await jwt.generate({ id: response._id });
          if (response.status) {
            res.json({
              status: true,
              login: true,
              toke: token,
            });
          } else {
            res.json({
              status: false,
              login: false,
              toke: null,
            });
          }
        })
        .catch((data) => {
          res.json(data);
        });
    } catch (error) {
      res.json(error);
    }
  },
};
