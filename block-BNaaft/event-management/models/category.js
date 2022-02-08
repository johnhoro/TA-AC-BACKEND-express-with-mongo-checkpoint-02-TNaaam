var mongoose = require(`mongoose`);
var Schema = mongoose.Schema;

var categorySchema = new Schema({
  name: { type: String, required: true },
  eventId: { type: Schema.Types.ObjectId, ref: "Event" },
});

var Category = mongoose.model(`Category`, categorySchema);

module.exports = Category;
