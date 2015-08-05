var mongoose = require("mongoose");

var ReceipeHistorySchema = new mongoose.Schema({
	_id: String,
	recId: String,
	name: String,
    description: String,
    date: { type: Date, default: Date.now },
    image: String
});

var ReceipeHistory = mongoose.model('ReceipeHistory', ReceipeHistorySchema);
module.exports = {
  ReceipeHistory: ReceipeHistory
}