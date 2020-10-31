const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  text: String,
  postedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  votes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  repliedTo: { type: Schema.Types.ObjectId },
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
