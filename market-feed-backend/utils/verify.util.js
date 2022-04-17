module.exports = {
  verifyPhone: (phone) => {
    const phoneNo = [...(phone + "".split(""))];
    // console.log(phoneNo.length);
    return new Promise((resolve, reject) => {
      if (phoneNo.length === 10) {
        resolve({ status: true, phone: null });
        console.log(" correct");
      } else {
        reject({ status: false, statusCode: 400, error: "invalid phone no" });
        // console.log(" not correct");
      }
    });
  },
};
