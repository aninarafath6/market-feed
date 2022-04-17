const mongoClient = require("mongodb").MongoClient;
const state = {
  db: null,
};
module.exports.connect = (done) => {
  const url =
    "mongodb+srv://marketfeed:nSMhwyYwAZlE1fIb@cluster0.rhpgb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  const dbname = "marketfeed";
  mongoClient.connect(url, { useUnifiedTopology: true }, (err, data) => {
    if (err) return done(err);
    state.db = data.db(dbname);
    done();
  });
};
module.exports.get = () => {
  return state.db;
};
