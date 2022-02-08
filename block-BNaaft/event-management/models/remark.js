var mongoose = require(`mongoose`);
var Schema = mongoose.Schema;

var remarkSchema = new Schema(
  {
    content: { type: String },
    likes: { type: Number, default: 0 },
    author: String,
    eventId: { type: Schema.Types.ObjectId, ref: "Event" },
  },
  { timestamps: true }
);

var Remark = mongoose.model(`Remark`, remarkSchema);
module.exports = Remark;
