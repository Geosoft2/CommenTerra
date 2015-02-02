/* Database schema for comments*/

var mongoose = require('mongoose');
var Comment = require('../models/comment');
// define the schema for our user model
var commentSchema = mongoose.Schema({
  title: { type: String },
  dataset: { type: mongoose.Schema.Types.ObjectId, ref: 'Dataset' }, 
  datasetRating: { type: Number, default: 0 },
  url: String,
  text: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  authorName: String,
  date: { type: Date, default: Date.now },
  comment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }, 
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  markerCoords: [{ type: Number }],
  markerX: Number,
  markerY: Number,
  boundingBox: [{ type: Number}],
  bbLowRight: Number,
  bbUpLeft: Number,
  startdate: Date,
  enddate: Date,
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },

})

// show date in following fromat: 01. January 2015
commentSchema.virtual('dateString').get(function () {
  var d = this.date;
  var m_names = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", 
"October", "November", "December");
  var curr_date = d.getDate();
  var curr_month = d.getMonth();
  var curr_year = d.getFullYear();
  var h = d.getHours();
  var m = d.getMinutes();
  if (m.toString().length==1) {
    var result = curr_date + " " + m_names[curr_month]  + " " + curr_year + "  " + h + ":" + "0" + m;
  } else {
    var result = curr_date + " " + m_names[curr_month]  + " " + curr_year + "  " + h + ":" + m;
  }
  return result;
})

commentSchema.virtual('x').get(function () {
  return this.markerCoords[0]
})

commentSchema.virtual('y').get(function () {
  return this.markerCoords[1]
})

commentSchema.set('toJSON', { virtuals: true });
commentSchema.set('toObject', { virtuals: true });
// create the model for comments and expose it to the app
module.exports = mongoose.model('Comment', commentSchema);
