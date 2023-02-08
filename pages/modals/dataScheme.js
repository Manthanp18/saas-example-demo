const mongoose = require('mongoose');

// mongoose.set('strictQuery', false);
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
// var Schema = mongoose.Schema;
const DataSchema = new mongoose.Schema({
  id: String,
  userId: String,
  name: String,
  tag: String,
  src: String,
});

// export const SavePost = mongoose.model('SaveData', DataSchema);
export const SavePost = mongoose.models['Section'] || mongoose.model('Section', DataSchema);
