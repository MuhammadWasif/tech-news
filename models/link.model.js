const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LinkSchema = new Schema({
  url: String,
  description: String,
  createdAt: Date,
  postedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  votes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

const Link = mongoose.model('Link', LinkSchema);

module.exports = Link;
